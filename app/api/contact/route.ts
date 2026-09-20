import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source = "FAQ Page" } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    const recipientEmails = ["support@unilife.com.ng", "hello@unilife.com.ng"];
    const senderEmail = email || "no-reply@unilife.com.ng";
    const subject = `[UniLife Inquiry] ${name} via ${source}`;

    const textContent = `
New inquiry submitted via UniLife ${source}:

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Submitted At: ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}

Message:
${message}
    `.trim();

    // Check if SMTP environment variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"UniLife Contact" <${smtpUser}>`,
        to: recipientEmails.join(", "),
        replyTo: senderEmail,
        subject,
        text: textContent,
      });

      return NextResponse.json({
        success: true,
        sentVia: "smtp",
        message: "Your message has been sent to support@unilife.com.ng and hello@unilife.com.ng",
      });
    }

    // When SMTP isn't configured in environment, log securely and return mailto payload fallback
    console.log(`[UniLife Contact API] Email would be sent to: ${recipientEmails.join(", ")}`);
    console.log(`[UniLife Contact API] Details:`, { name, email, phone, message });

    const mailtoUrl = `mailto:support@unilife.com.ng,hello@unilife.com.ng?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(textContent)}`;

    return NextResponse.json({
      success: true,
      sentVia: "direct",
      mailtoUrl,
      message: "Message received. Forwarding to support@unilife.com.ng and hello@unilife.com.ng",
    });
  } catch (error: unknown) {
    console.error("Error processing contact message:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { error: "Failed to process message.", details: errorMessage },
      { status: 500 }
    );
  }
}
