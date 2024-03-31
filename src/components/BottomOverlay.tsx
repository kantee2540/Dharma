import React from "react";
import "./Overlay.css";

type BottomOverlayProps = {
  show: boolean;
  message: string;
};

export default function BottomOverlay({ show, message }: BottomOverlayProps) {
  return (
    <div
      className="overlay-bottom"
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? 1 : 0,
      }}
    >
      <div className="overlay-content-bottom">{message}</div>
    </div>
  );
}
