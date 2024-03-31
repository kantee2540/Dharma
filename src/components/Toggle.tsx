import React, { CSSProperties } from "react";
import "./Toggle.css";

type ToggleProps = {
  isTurnon: boolean;
  onChange: () => void;
  style?: CSSProperties;
};

function Toggle({ isTurnon, onChange, style }: ToggleProps) {
  return (
    <label className="switch" style={style}>
      <input type="checkbox" checked={isTurnon} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
}

export default Toggle;
