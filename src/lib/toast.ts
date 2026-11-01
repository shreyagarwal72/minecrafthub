/** Tiny event bus behind the Minecraft "advancement" toasts. */

export interface McToast {
  id: number;
  title: string;
  text?: string;
  /** public path of a pixel icon, e.g. "/icons/diamond.png" */
  icon?: string;
  kind?: "advancement" | "error";
}

type Listener = (toast: McToast) => void;

const listeners = new Set<Listener>();
let counter = 0;

export const toast = (t: Omit<McToast, "id">) => {
  const full: McToast = { kind: "advancement", ...t, id: ++counter };
  listeners.forEach((l) => l(full));
};

export const subscribeToasts = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
