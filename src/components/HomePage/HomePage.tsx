import MovieHero from "@/src/components/MovieHero/MovieHero";
import MovieList from "@/src/components/MovieList/MovieList";
import Loader from "@/src/components/Loaders/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { useTopMovies, useMovie } from "@/src/hooks";
import { useEffect, useState } from "react";
import { TMovie } from "@/src/types";

const HomePage = () => {
  const {
    data: movies,
    isError: isMovieListError,
    isLoading: isMovieListLoading,
  } = useTopMovies();

  const {
    data: randomMovie,
    isError: isMovieError,
    isLoading: isMovieLoading,
    refetch,
    isRefetching: isMovieRefetching,
    isSuccess: isMovieSucceed,
  } = useMovie();

  const [prevMovie, setNewMovie] = useState<TMovie | undefined>(randomMovie);

  useEffect(() => {
    isMovieSucceed ? setNewMovie(randomMovie) : null;
  }, [isMovieSucceed, randomMovie]);

  if (isMovieListLoading || isMovieListError) {
    if (isMovieLoading || isMovieError) {
      return (
        <div className="home">
          {isMovieError || isMovieListError ? "Ошибка" : <Loader />}
        </div>
      );
    }
  }

  return (
    <motion.div layout className="home">
      <AnimatePresence mode="wait">
        {isMovieRefetching ? (
          prevMovie ? (
            <motion.div
              key={`movie-${prevMovie.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MovieHero movie={prevMovie} refetch={refetch} />
            </motion.div>
          ) : null
        ) : randomMovie ? (
          <motion.div
            key={`movie-${randomMovie.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MovieHero movie={randomMovie} refetch={refetch} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="top-movies">
        <h2 className="top-movies__head">Топ 10 фильмов</h2>
        {movies && <MovieList movies={movies}></MovieList>}
      </div>
    </motion.div>
  );
};

export default HomePage;
