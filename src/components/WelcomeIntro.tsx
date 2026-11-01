import { useEffect, useMemo, useRef, useState } from "react";
import McButton from "@/components/McButton";
import { intro } from "@/data/assets";

interface WelcomeIntroProps {
  isOpen: boolean;
  onClose: () => void;
  isManualOpen?: boolean;
}

const SLIDES = [
  {
    title: "Welcome to Nextup Studio",
    description: "Your ultimate destination for Minecraft Bedrock content: worlds, addons, shaders and the newest game builds.",
    image: intro.introWelcome,
  },
  {
    title: "Premium Worlds",
    description: "Jump into Techno Gamerz World, custom survival maps and stunning creative builds.",
    image: intro.introWorlds,
  },
  {
    title: "Powerful Addons",
    description: "Combat overhauls, dynamic lighting, offhand slots and quality-of-life tweaks for every playstyle.",
    image: intro.introAddons,
  },
  {
    title: "Beautiful Shaders",
    description: "Performance-friendly shader packs for every device, from budget phones to gaming rigs.",
    image: intro.introShaders,
  },
];

const TIPS = [
  "Back up your worlds before updating Minecraft.",
  "Tap a .mcpack or .mcaddon file and Minecraft imports it for you.",
  "Lighter shaders like Newb X run great on phones.",
  "Beta builds are fun, but they can corrupt stable worlds.",
  "Hold Esc... just kidding. Click the logo to replay this tour.",
];

const setSeen = () => {
  try {
    localStorage.setItem("hasSeenIntro", "true");
  } catch {
    /* storage unavailable – tour will simply show again */
  }
};

const WelcomeIntro = ({ isOpen, onClose, isManualOpen = false }: WelcomeIntroProps) => {
  const [phase, setPhase] = useState<"loading" | "tour">("tour");
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], [isOpen]);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Fresh open: loading screen first (first visit only), then the tour.
  useEffect(() => {
    if (!isOpen) return;
    setSlide(0);
    setProgress(0);
    setLeaving(false);
    if (isManualOpen) {
      setPhase("tour");
      return;
    }
    setPhase("loading");
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 4 + Math.random() * 9);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        setLeaving(true);
        window.setTimeout(() => {
          setPhase("tour");
          setLeaving(false);
        }, 350);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [isOpen, isManualOpen]);

  const finish = () => {
    if (!isManualOpen) setSeen();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (phase === "tour" && e.key === "ArrowRight") setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
      if (phase === "tour" && e.key === "ArrowLeft") setSlide((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, phase, isManualOpen]);

  useEffect(() => {
    if (isOpen && phase === "tour") nextRef.current?.focus();
  }, [isOpen, phase]);

  if (!isOpen) return null;

  if (phase === "loading") {
    return (
      <div className={`mc-loading mc-bg-dirt ${leaving ? "mc-loading--out" : ""}`} role="alertdialog" aria-label="Loading Nextup Studio">
        <div className="mc-loading__box">
          <img className="mc-loading__logo" src="/icons/grass.png" alt="" />
          <div className="mc-loading__title">LOADING NEXTUP STUDIO</div>
          <div className="mc-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="mc-bar__fill" style={{ width: `calc(${progress}% - 4px)` }} />
          </div>
          <div className="mc-loading__tip">
            <span className="t-yellow">Tip: </span>
            {tip}
          </div>
          <McButton variant="dark" size="sm" onClick={finish} className="mc-btn--skip">
            Skip
          </McButton>
        </div>
      </div>
    );
  }

  const current = SLIDES[slide];
  const last = slide === SLIDES.length - 1;

  return (
    <div className="mc-modal" role="dialog" aria-modal="true" aria-label="Nextup Studio tour" onClick={(e) => e.target === e.currentTarget && finish()}>
      <div className="mc-modal__panel mc-panel">
        <div className="mc-frame">
          <div className="mc-frame__inner">
            <img key={slide} className="mc-slide-img" src={current.image} alt="" />
          </div>
        </div>
        <div className="mc-slides" role="tablist" aria-label="Tour slides">
          {SLIDES.map((s, i) => (
            <button key={s.title} onClick={() => setSlide(i)} aria-current={i === slide} aria-label={`Slide ${i + 1}: ${s.title}`} />
          ))}
        </div>
        <h2 className="mc-modal__title" key={`t${slide}`}>
          {current.title}
        </h2>
        <p className="mc-modal__text" key={`d${slide}`}>
          {current.description}
        </p>
        <div className="mc-modal__actions">
          <div className="mc-row" style={{ gap: 8 }}>
            <McButton size="sm" variant="dark" disabled={slide === 0} onClick={() => setSlide((s) => s - 1)}>
              Back
            </McButton>
            <McButton size="sm" variant="dark" onClick={finish}>
              Skip
            </McButton>
          </div>
          <button
            ref={nextRef}
            className="mc-btn mc-btn--green"
            onClick={() => (last ? finish() : setSlide((s) => s + 1))}
          >
            {last ? "Let's Play!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro;
