import type { ReactNode } from "react";
import type { IconName } from "@/data/content";

interface PageHeadProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  children?: ReactNode;
}

/** Big pixel page title with a bobbing block icon. */
const PageHead = ({ title, subtitle, icon = "grass", children }: PageHeadProps) => (
  <header className="mc-page-head mc-pop">
    <h1 className="mc-page-title">
      <img src={`/icons/${icon}.png`} alt="" />
      <span>{title}</span>
    </h1>
    {subtitle && <p className="mc-page-sub">{subtitle}</p>}
    {children}
  </header>
);

export default PageHead;
