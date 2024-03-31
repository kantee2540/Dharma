import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./CompactButton.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type CompactButtonProps = {
  title: string;
  icon: IconProp;
  rightIcon?: IconProp;
  onClick: () => void;
  hoverColor?: string;
  justifyContent?: string;
  fontSize?: number;
  verticalPadding?: number;
};

function CompactButton({
  title,
  icon,
  rightIcon,
  onClick,
  hoverColor,
  justifyContent,
  fontSize,
  verticalPadding,
}: CompactButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="compact-button"
      onClick={onClick}
      style={{
        color: hover ? hoverColor : "black",
        justifyContent: justifyContent || "flex-start",
        fontSize: fontSize,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
      }}
    >
      {icon ? (
        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      ) : null}
      <div className="title">{title}</div>
      {rightIcon ? (
        <div className="icon">
          <FontAwesomeIcon icon={rightIcon} />
        </div>
      ) : null}
    </div>
  );
}

export default CompactButton;
