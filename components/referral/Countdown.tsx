"use client";

import { useEffect, useState } from "react";

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  };
}

export default function Countdown({ target }: { target: string }) {
  const targetDate = new Date(target);
  const [time, setTime] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(targetDate)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (time.done) {
    return <p className="mono" style={{ color: "var(--r-green)", marginTop: 20 }}>Campaign is live.</p>;
  }

  return (
    <div className="countdown">
      <div className="unit">
        <div className="n">{time.days}</div>
        <div className="u">DAYS</div>
      </div>
      <div className="unit">
        <div className="n">{time.hours}</div>
        <div className="u">HOURS</div>
      </div>
      <div className="unit">
        <div className="n">{time.minutes}</div>
        <div className="u">MINS</div>
      </div>
      <div className="unit">
        <div className="n">{time.seconds}</div>
        <div className="u">SECS</div>
      </div>
    </div>
  );
}
