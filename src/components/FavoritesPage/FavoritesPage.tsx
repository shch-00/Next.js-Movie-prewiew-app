import { useEffect, useState } from "react";
import { useFavourites } from "@/src/hooks";
import { motion, AnimatePresence } from "framer-motion";
import MovieList from "@/src/components/MovieList/MovieList";
import Loader from "@/src/components/Loaders/Loader";

const FavouritesPage = () => {
  const { data: movies, isError, refetch, fetchStatus } = useFavourites();

  const [prevMovies, reload] = useState(movies);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchStatus === "idle") {
      reload(movies);
    }
  }, [fetchStatus]);

  if (isError) {
    return (
      <div className="favorites">
        <span>Error</span>
      </div>
    );
  }

  return (
    <motion.div className="favorites">
      <AnimatePresence mode="wait">
        {fetchStatus === "fetching" ? (
          <motion.div
            key={prevMovies?.length.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            transition={{ type: "spring", damping: 25 }}
          >
            {prevMovies && <MovieList movies={prevMovies}></MovieList>}
          </motion.div>
        ) : (
          <motion.div
            key={movies?.length.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            transition={{ type: "spring", damping: 25 }}
          >
            {movies && <MovieList movies={movies}></MovieList>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FavouritesPage;
