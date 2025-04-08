import type { FC } from "react";
import type { TMovieList } from "@/src/types";
import { useRouter } from "next/router";
import MovieCard from "@/src/components/MovieCard/MovieCard";
import MovieCardSearchable from "@/src/components/MovieCardSearchable/MovieCardSearchable";

interface MovieListProps {
  movies: TMovieList;
  searchable?: boolean;
}

const MovieList: FC<MovieListProps> = ({ movies, searchable }) => {
  const pageName = useRouter().asPath.split("/")[1];
  if (movies.length <= 0) {
    return <div>Список пуст.</div>;
  }
  return (
    <div className={`movie-list ${searchable ? "movie-list--searchable" : ""}`}>
      <ul className="movie-list__list">
        {movies
          .sort((a, b) => {
            if (a.tmdbRating !== null && b.tmdbRating !== null) {
              return b.tmdbRating - a.tmdbRating;
            }
            return 0;
          })
          .map((movie, index) => (
            <li key={movie.id} className="movie-list__item">
              {searchable ? (
                <MovieCardSearchable movie={movie} />
              ) : (
                <MovieCard movie={movie} index={index} pageName={pageName} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;
