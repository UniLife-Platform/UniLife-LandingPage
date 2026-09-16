"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F6F2E7] text-[#14151A] flex flex-col items-center justify-center min-h-screen p-6 font-sans">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-[#46473f] mb-6">An unexpected error occurred while loading this page.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[#14151A] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
