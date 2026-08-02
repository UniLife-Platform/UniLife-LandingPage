"use client";

import { useEffect, useState } from "react";

type Bill = { id: number; left: number; duration: number; delay: number; rotate: number };

function useBills(count: number) {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomized decoration, must run client-side post-mount
    setBills(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 200,
        duration: 3 + Math.random() * 2.5,
        delay: Math.random() * 5,
        rotate: Math.random() * 40 - 20,
      }))
    );
  }, [count]);

  return bills;
}

export default function Pot({
  amountLabel,
  captionLabel,
  fillPct = 44,
  size = "default",
}: {
  amountLabel: string;
  captionLabel: string;
  fillPct?: number;
  size?: "default" | "large";
}) {
  const bills = useBills(size === "large" ? 20 : 16);

  return (
    <div className="pot-wrap">
      <div className="rain-field" style={size === "large" ? { width: "100%", maxWidth: 520, height: 70 } : undefined}>
        {bills.map((b) => (
          <div
            key={b.id}
            className="bill"
            style={{
              left: size === "large" ? `${b.left / 2.6}%` : `${b.left}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              transform: `rotate(${b.rotate}deg)`,
            }}
          />
        ))}
      </div>
      <div
        className="pot"
        style={size === "large" ? { width: 260, height: 300, marginTop: 10 } : undefined}
      >
        <div className="fill wob" style={{ height: `${fillPct}%` }} />
      </div>
      <div className="pot-readout">
        <div className="amt mono">{amountLabel}</div>
        <div className="cap">{captionLabel}</div>
      </div>
    </div>
  );
}
