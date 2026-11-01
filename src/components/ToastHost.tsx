import { useEffect, useState } from "react";
import { subscribeToasts, type McToast } from "@/lib/toast";

interface Live extends McToast {
  leaving?: boolean;
}

const LIFETIME = 4600;

/** Renders Minecraft-style "Advancement Made!" toasts in the top-right corner. */
const ToastHost = () => {
  const [toasts, setToasts] = useState<Live[]>([]);

  useEffect(() => {
    const timers: number[] = [];
    const unsubscribe = subscribeToasts((t) => {
      setToasts((prev) => [...prev.slice(-3), t]);
      timers.push(
        window.setTimeout(() => setToasts((prev) => prev.map((x) => (x.id === t.id ? { ...x, leaving: true } : x))), LIFETIME),
        window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), LIFETIME + 380),
      );
    });
    return () => {
      unsubscribe();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="mc-toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`mc-toast ${t.leaving ? "mc-toast--out" : ""}`}>
          <div className="mc-toast__icon">
            <img src={t.icon ?? "/icons/grass.png"} alt="" />
          </div>
          <div>
            <div className={`mc-toast__kicker ${t.kind === "error" ? "mc-toast__kicker--bad" : ""}`}>
              {t.kind === "error" ? "Uh oh!" : "Advancement Made!"}
            </div>
            <div className="mc-toast__title">{t.title}</div>
            {t.text && <div className="mc-toast__text">{t.text}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastHost;
