import type { TMovie } from "@/src/types";
import Link from "next/link";
import FavButton from "@/src/components/FavButton/FavButton";
import ChangeIcon from "@/src/icons/ChangeIcon";
import type { FC } from "react";

interface IMovieButtonsProps {
  movie: TMovie;
  isHomePage: boolean;
  onTrailerClick: () => void;
  onRefetch: () => void;
}

const MovieButtons: FC<IMovieButtonsProps> = ({
  movie,
  isHomePage,
  onTrailerClick,
  onRefetch,
}) => {
  return (
    <div className="movie-buttons">
      <button
        className="button button--trailer btn"
        disabled={!movie.trailerYouTubeId}
        onClick={onTrailerClick}
      >
        Трейлер
      </button>
      {isHomePage && (
        <Link href={`/${movie.id}`} className="button button--about btn">
          О фильме
        </Link>
      )}
      {movie.id && <FavButton id={movie.id?.toString()} isFavorite={true} />}
      {isHomePage && (
        <button className="button button--change btn" onClick={onRefetch}>
          {<ChangeIcon className="button__icon" />}
        </button>
      )}
    </div>
  );
};

export default MovieButtons;
