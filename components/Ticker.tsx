const DEFAULT_ANNOUNCEMENTS = [
  "370+ verified students already on UniLife",
  "UniShop is free for the first 100 sellers",
  "Departmental leaderboards reset every semester",
  "AI Tutor now reads your lecture PDFs",
  "Open to students at any university, anywhere",
];

export default function Ticker({
  items = DEFAULT_ANNOUNCEMENTS,
}: {
  items?: string[];
}) {
  const looped = [...items, ...items];

  return (
    <div className="ticker" aria-label="Campus announcements">
      <div className="ticker__track">
        {looped.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
