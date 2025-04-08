import type { TMovie } from "@/src/types";
import { useState } from "react";
import Link from "next/link";
import ImageLoader from "@/src/components/Loaders/ImageLoader";
import FavButton from "@/src/components/FavButton/FavButton";

interface MovieCardProps {
  movie: TMovie;
  index?: number;
  pageName: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index, pageName }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="movie-card">
      {pageName === "home" && index !== undefined && (
        <div className="movie-card__index">
          <span className="movie-card__index-text">{index + 1}</span>
        </div>
      )}
      {pageName === "favorites" && movie.id && (
        <FavButton id={movie.id?.toString()} isFavorite={false} />
      )}
      {isLoading && (
        <div className="movie-card__img">
          <ImageLoader />
        </div>
      )}
      <img
        src={
          movie.posterUrl
            ? movie.posterUrl
            : `https://placehold.co/400/692a78/FFFFFF/?font=raleway&text=Invalid+Poster+image+(${movie.title})`
        }
        alt={`Постер к фильму "${movie.title}"`}
        className="movie-card__img"
        style={{ display: isLoading ? "none" : "initial" }}
        onLoad={() => setIsLoading(false)}
      />
      <Link className="movie-card__link" href={`/${movie.id}`} />
    </div>
  );
};

export default MovieCard;
