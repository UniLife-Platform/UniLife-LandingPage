/**
 * Local avatar placeholder. Replaces the DiceBear hotlinks so no visitor data goes to a
 * third party. Swap in real photos by putting files in /public and using next/image.
 */
export default function InitialsAvatar({
  name,
  className = "",
  shape = "circle",
}: {
  name: string;
  className?: string; // size + border classes, e.g. "w-14 h-14 border-2"
  shape?: "circle" | "rounded";
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex items-center justify-center shrink-0 font-display tracking-wide text-white select-none bg-gradient-to-br from-[#4f7fff] to-[#1c2c66] ${
        shape === "circle" ? "rounded-full" : "rounded-2xl"
      } ${className}`}
    >
      {initials}
    </span>
  );
}
