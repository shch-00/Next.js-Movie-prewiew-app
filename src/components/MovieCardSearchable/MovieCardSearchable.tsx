import Link from "next/link";
import type { TMovie } from "@/src/types";
import minutesToTimeString from "@/src/utils/minutesToTimeString";
import Rating from "@/src/components/Rating/Rating";

interface MovieCardSearchableProps {
  movie: TMovie;
}

const MovieCardSearchable: React.FC<MovieCardSearchableProps> = ({ movie }) => {
  let runtime;
  movie.runtime && (runtime = minutesToTimeString(movie.runtime));

  return (
    <div className="movie-search">
      {movie.posterUrl ? (
        <div className="movie-search__img-wrapper">
          <img
            src={movie.posterUrl}
            className="movie-search__img"
            alt={`Постер к фильму "${movie.title}"`}
          />
        </div>
      ) : (
        <div className="movie-search__img-wrapper">
          <img
            src={`https://placehold.co/55/692a78/FFFFFF/?font=raleway&text=${movie.title}`}
            className="movie-search__img"
            alt={`Постер к фильму "${movie.title}"`}
          />
        </div>
      )}
      <div className="movie-search__inner">
        <div className="movie-search__info">
          {movie.tmdbRating !== null && movie.tmdbRating >= 0 && (
            <Rating rate={movie.tmdbRating} />
          )}
          {movie.releaseYear && (
            <span className="movie-search__note">{movie.releaseYear}</span>
          )}
          {movie.genres && (
            <span className="movie-search__note">{movie.genres[0] || ""}</span>
          )}
          {runtime && <span className="movie-search__note">{runtime}</span>}
        </div>
        <h2 className="movie-search__head">{movie.title}</h2>
      </div>
      <Link href={`/${movie.id}`} className="movie-search__link" />
    </div>
  );
};

export default MovieCardSearchable;
