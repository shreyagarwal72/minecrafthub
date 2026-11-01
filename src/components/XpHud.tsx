import { useEffect, useRef } from "react";

/** Scroll progress shown as the in-game experience bar, with the "level" counting up as you read. */
const XpHud = () => {
  const fill = useRef<HTMLDivElement>(null);
  const level = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fill.current) fill.current.style.width = `${p * 100}%`;
      if (level.current) level.current.textContent = String(Math.round(p * 30));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mc-hud" aria-hidden="true">
      <div ref={level} className="mc-hud__level">0</div>
      <div className="mc-hud__bar">
        <div ref={fill} className="mc-hud__fill" />
        <div className="mc-hud__notches" />
      </div>
    </div>
  );
};

export default XpHud;
