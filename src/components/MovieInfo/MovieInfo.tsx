import type { TMovie } from "@/src/types";
import Rating from "@/src/components/Rating/Rating";
import minutesToTimeString from "@/src/utils/minutesToTimeString";
import type { FC } from "react";

interface IMovieInfoProps {
  movie: TMovie;
}

const MovieInfo: FC<IMovieInfoProps> = ({ movie }) => {
  let runtime;
  movie?.runtime ? (runtime = minutesToTimeString(movie.runtime)) : undefined;
  return (
    <div className="movie-info">
      <div className="movie-info__wrapper">
        {movie.tmdbRating !== null && movie.tmdbRating >= 0 && (
          <Rating rate={movie.tmdbRating} />
        )}
        {movie.releaseYear && (
          <span className="movie-info__note">{movie.releaseYear}</span>
        )}
        {movie.genres && (
          <span className="movie-info__note">{movie.genres[0] || ""}</span>
        )}
        {runtime && <span className="movie-info__note">{runtime}</span>}
      </div>
      <h2 className="movie-info__head">{movie.title}</h2>
      <p className="movie-info__description">{movie.plot}</p>
    </div>
  );
};

export default MovieInfo;
