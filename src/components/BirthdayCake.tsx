import { useEffect, useMemo, useState } from "react";
import McButton from "@/components/McButton";

const CONFETTI = ["#ff5555", "#55ffff", "#ffff55", "#55ff55", "#ff55ff", "#ffaa00"];

/** Birthday popup (August 19th), dressed up as a Minecraft "cake" screen. */
const BirthdayCake = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() !== 7 || today.getDate() !== 19) return;
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    try {
      if (localStorage.getItem("birthdayDismissed") === todayStr) return;
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        delay: `${(i % 9) * 0.35}s`,
        color: CONFETTI[i % CONFETTI.length],
        duration: `${3 + (i % 5) * 0.5}s`,
      })),
    [],
  );

  if (!visible) return null;

  const dismiss = () => {
    const today = new Date();
    try {
      localStorage.setItem("birthdayDismissed", `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div className="mc-modal" role="dialog" aria-modal="true" aria-label="Happy birthday" style={{ zIndex: 400 }}>
      <style>{`@keyframes mc-confetti { from { transform: translateY(-10vh) rotate(0); opacity: 1 } to { transform: translateY(110vh) rotate(540deg); opacity: .9 } }`}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: p.left,
            width: 10,
            height: 10,
            background: p.color,
            animation: `mc-confetti ${p.duration} linear ${p.delay} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
      <div className="mc-modal__panel mc-panel mc-center">
        <img src="/icons/sand.png" alt="" style={{ width: 96, margin: "0 auto 8px" }} className="mc-bob" />
        <h2 className="mc-modal__title" style={{ fontSize: 16 }}>HAPPY BIRTHDAY!</h2>
        <p className="mc-modal__text">
          Dear <b style={{ color: "#2c7a1d", fontWeight: 400 }}>Vanshu Agarwal</b>, wishing you an amazing day filled with joy, success and countless
          blessings!
        </p>
        <p className="mc-ink-muted">August 19th · Your special day</p>
        <div style={{ marginTop: 16 }}>
          <McButton variant="green" onClick={dismiss}>
            Thank You!
          </McButton>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCake;
