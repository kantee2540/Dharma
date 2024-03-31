import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { Link } from "react-router-dom";
import "./NavButton.css";

type NavButtonProps = {
  to: string;
  title: string;
  lefticon?: IconProp;
  rightIcon?: IconProp;
};

function NavButton({ to, title, lefticon, rightIcon }: NavButtonProps) {
  return (
    <Link to={to} className="nav-btn">
      {lefticon ? <FontAwesomeIcon icon={lefticon} /> : null}
      <span className="title">{title}</span>
      {rightIcon ? <FontAwesomeIcon icon={rightIcon} /> : null}
    </Link>
  );
}

export default NavButton;
