import { useEffect, useRef } from "react";

const PALETTE = ["#866043", "#6b4a31", "#9a7350", "#5d9d38", "#7d7d7d"];

/** Block-break style pixel burst wherever the player clicks. */
const ClickParticles = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onClick = (e: MouseEvent) => {
      const host = root.current;
      if (!host) return;
      const target = e.target as HTMLElement | null;
      const green = !!target?.closest?.(".mc-btn--green");
      for (let i = 0; i < 9; i++) {
        const p = document.createElement("span");
        p.className = "mc-particle";
        const angle = Math.random() * Math.PI * 2;
        const dist = 26 + Math.random() * 44;
        p.style.left = `${e.clientX - 4}px`;
        p.style.top = `${e.clientY - 4}px`;
        p.style.background = green ? (i % 2 ? "#55ff55" : "#3f8f2e") : PALETTE[Math.floor(Math.random() * PALETTE.length)];
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist + 18}px`);
        host.appendChild(p);
        window.setTimeout(() => p.remove(), 700);
      }
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return <div ref={root} className="mc-particles" aria-hidden="true" />;
};

export default ClickParticles;
