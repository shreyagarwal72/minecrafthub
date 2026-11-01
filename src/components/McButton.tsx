import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface McButtonProps {
  children: ReactNode;
  /** internal route */
  to?: string;
  /** external link (opens in a new tab) */
  href?: string;
  variant?: "gray" | "green" | "dark" | "red";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  pulse?: boolean;
  className?: string;
  /** small second line under the label */
  sub?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}

/** The Minecraft GUI button – renders a router link, an external link or a real <button>. */
const McButton = ({
  children,
  to,
  href,
  variant = "gray",
  size = "md",
  block = false,
  pulse = false,
  className = "",
  sub,
  onClick,
  disabled,
  type = "button",
  ariaLabel,
}: McButtonProps) => {
  const cls = [
    "mc-btn",
    variant !== "gray" ? `mc-btn--${variant}` : "",
    size !== "md" ? `mc-btn--${size}` : "",
    block ? "mc-btn--block" : "",
    pulse ? "mc-btn--pulse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span>
      {children}
      {sub && <span className="mc-btn__sub">{sub}</span>}
    </span>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick as never}>
        {content}
      </Link>
    );
  }
  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel} onClick={onClick as never}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

export default McButton;
