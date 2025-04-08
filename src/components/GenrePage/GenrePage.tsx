import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useFilteredMovies } from "@/src/hooks/useFilteredMovies";
import { motion } from "framer-motion";
import capitalize from "@/src/utils/capitalize";
import Link from "next/link";
import Loader from "@/src/components/Loaders/Loader";
import Head from "next/head";
import GobackIcon from "@/src/icons/GoBackIcon";
import MovieList from "@/src/components/MovieList/MovieList";

const GenrePage = () => {
  const genre = useRouter().asPath.split("/")[2];
  const { ref, inView } = useInView();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useFilteredMovies(undefined, genre);

  useEffect(() => {
    if (inView && hasNextPage) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!data?.pages) {
    return <div>Не можем загрузить фильмы, попробуйте позже</div>;
  }

  return (
    <>
      <Head>
        <title>ВК Маруся - Фильмы по жанру {capitalize(genre)}</title>
      </Head>
      <div className="genre-page">
        <div className="genre-page__head">
          <Link href={"/genres"} className="genre-page__back">
            <GobackIcon className="genre-page__back-icon" />
          </Link>
          <h2 className="genre-page__title">
            {capitalize(genre) + genre.slice(1)}
          </h2>
        </div>
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {data.pages.map((movies, pageIndex) => (
              <motion.div
                key={`page-${pageIndex}`}
                layout
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <MovieList movies={movies} />
              </motion.div>
            ))}
          </motion.div>
        )}
        {isFetchingNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-4"
          >
            <Loader />
          </motion.div>
        )}
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default GenrePage;
