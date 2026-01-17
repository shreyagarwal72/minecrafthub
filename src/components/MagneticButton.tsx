import { ReactNode, cloneElement, isValidElement } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

const MagneticButton = ({ children, className = "" }: MagneticButtonProps) => {
  if (isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ 'data-magnetic'?: boolean; className?: string }>, {
      'data-magnetic': true,
      className: `${(children.props as { className?: string }).className || ""} ${className}`.trim()
    });
  }

  return (
    <div data-magnetic className={className}>
      {children}
    </div>
  );
};

export default MagneticButton;
