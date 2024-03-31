import React from "react";
import "./Overlay.css";
import { Spinner } from "react-bootstrap";

type OverlayProps = {
  isLoading: boolean;
  message: string;
};

export default function Overlay({ isLoading, message }: OverlayProps) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        {isLoading && (
          <Spinner animation="border" variant="secondary" className="spinner" />
        )}
        <div className="overlay-text">
          <b>{message}</b>
        </div>
      </div>
    </div>
  );
}
