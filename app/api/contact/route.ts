import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENTS = ["support@unilife.com.ng", "hello@unilife.com.ng"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, email: 200, phone: 30, message: 4000, source: 60 };

// Best-effort, in-memory rate limit (per server instance). Use Redis/Upstash or
// Cloudflare Turnstile if you need something stronger across instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/** Strip control characters and collapse newlines so values are safe in a subject line. */
function oneLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: real users never fill this hidden field. Pretend success so bots move on.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true, sentVia: "smtp", message: "Message sent." });
    }

    const name = oneLine(str(body.name, LIMITS.name));
    const message = str(body.message, LIMITS.message);
    const cleanEmail = oneLine(str(body.email, LIMITS.email));
    const phone = oneLine(str(body.phone, LIMITS.phone));
    const source = oneLine(str(body.source, LIMITS.source)) || "Website";

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }
    if (cleanEmail && !EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const subject = `[UniLife Inquiry] ${name} via ${source}`;
    const textContent = `
New inquiry submitted via UniLife ${source}:

Name: ${name}
Email: ${cleanEmail || "Not provided"}
Phone: ${phone || "Not provided"}
Submitted At: ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}

Message:
${message}
    `.trim();

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"UniLife Contact" <${smtpUser}>`,
        to: RECIPIENTS.join(", "),
        replyTo: cleanEmail || undefined,
        subject,
        text: textContent,
      });

      return NextResponse.json({
        success: true,
        sentVia: "smtp",
        message: "Your message has been sent to our support team.",
      });
    }

    // SMTP is not configured. Never claim success in production: the message was NOT delivered.
    console.error("[UniLife Contact API] SMTP is not configured; inquiry was not emailed.");

    const mailtoUrl = `mailto:${RECIPIENTS.join(",")}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(textContent)}`;

    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error:
            "We couldn't send your message right now. Please email support@unilife.com.ng directly.",
          mailtoUrl,
        },
        { status: 503 }
      );
    }

    // Local development: keep the mailto fallback so the form is still testable.
    return NextResponse.json({
      success: true,
      sentVia: "direct",
      mailtoUrl,
      message: "Dev mode: SMTP not configured, opening your email app instead.",
    });
  } catch (error: unknown) {
    console.error("Error processing contact message:", error);
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
  }
}
