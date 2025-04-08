import type { TMovie } from "@/src/types";
import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import MovieInfo from "@/src/components/MovieInfo/MovieInfo";
import MovieButtons from "@/src/components/MovieButtons/MovieButtons";
import MovieImage from "@/src/components/MovieImage/MovieImage";
import TrailerModal from "@/src/components/TrailerModal/TrailerModal";
import ImageLoader from "@/src/components/Loaders/ImageLoader";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";

interface MovieHeroProps {
  movie: TMovie;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TMovie, Error>>;
}

const MovieHero: FC<MovieHeroProps> = ({ movie, refetch }) => {
  const isHomePage = useRouter().asPath === "/home";
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpened, setIsTrailerOpened] = useState(false);

  if (!movie) {
    return <ImageLoader />;
  }

  isTrailerOpened
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const handleRefetch = () => {
    setIsLoading(true);
    refetch && refetch();
  };

  return (
    <>
      <div className="movie">
        <div className="movie__inner">
          <MovieInfo movie={movie} />
          <MovieButtons
            isHomePage={isHomePage}
            movie={movie}
            onTrailerClick={() => setIsTrailerOpened(true)}
            onRefetch={handleRefetch}
          />
        </div>
        <MovieImage
          backdropUrl={movie.backdropUrl}
          title={movie.title}
          isLoading={isLoading}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <TrailerModal
        isOpened={isTrailerOpened}
        trailerId={movie.trailerYouTubeId}
        onClose={() => setIsTrailerOpened(false)}
      />
    </>
  );
};

export default MovieHero;
