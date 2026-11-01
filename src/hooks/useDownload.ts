import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "@/lib/toast";

export interface DownloadState {
  active: boolean;
  progress: number;
}

/**
 * Opens a download link immediately (so pop-up blockers see a real user gesture)
 * and plays a short XP-bar animation + an advancement toast alongside it.
 */
export const useDownload = (onOpened?: () => void) => {
  const [states, setStates] = useState<Record<string, DownloadState>>({});
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearInterval(t)), []);

  const start = useCallback(
    (url: string, key: string, label: string, icon = "/icons/diamond.png") => {
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      onOpened?.();
      toast({ title: "Download page opened", text: label, icon });

      let progress = 0;
      setStates((s) => ({ ...s, [key]: { active: true, progress: 0 } }));
      const id = window.setInterval(() => {
        progress = Math.min(100, progress + 6 + Math.random() * 12);
        setStates((s) => ({ ...s, [key]: { active: progress < 100, progress } }));
        if (progress >= 100) {
          window.clearInterval(id);
          window.setTimeout(() => setStates((s) => ({ ...s, [key]: { active: false, progress: 0 } })), 1200);
        }
      }, 110);
      timers.current.push(id);
    },
    [onOpened],
  );

  return { states, start };
};
