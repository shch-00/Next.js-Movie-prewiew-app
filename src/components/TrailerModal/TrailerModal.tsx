import type { FC } from "react";
import CloseIcon from "@/src/icons/CloseIcon";

interface ITralerModalProps {
  isOpened: boolean;
  trailerId?: string | null;
  onClose: () => void;
}

const TrailerModal: FC<ITralerModalProps> = ({
  isOpened,
  trailerId,
  onClose,
}) => {
  if (!isOpened) {
    return null;
  }

  return (
    <div className="movie-trailer">
      <div
        className={`dark-bg ${isOpened ? "dark-bg--opened" : ""} animate-fadeIn`}
        onClick={onClose}
      ></div>
      <div className="movie-trailer__inner animate-scaleIn-modals">
        <div className="movie-trailer__window">
          <iframe
            className="trailer"
            src={
              trailerId
                ? `https://www.youtube.com/embed/${trailerId}`
                : "https://www.youtube.com"
            }
            loading="lazy"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon className="window-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;
