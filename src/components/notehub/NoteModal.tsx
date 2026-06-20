import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import type { NoteModalProps } from "../../types/types";

export default function NoteModal({ children, onClose }: NoteModalProps) {
  useEffect(() => {
    const { overflow } = document.body.style;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="notehub-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="notehub-modal" aria-labelledby="note-modal-title">
        <button
          className="closeButton"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
