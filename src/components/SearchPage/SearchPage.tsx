import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useFilteredMovies } from "@/src/hooks";
import { motion } from "framer-motion";
import Head from "next/head";
import MovieList from "@/src/components/MovieList/MovieList";
import Loader from "@/src/components/Loaders/Loader";

const SearchPage = () => {
  const title = useRouter().asPath.split("/")[2];
  const { ref, inView } = useInView();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useFilteredMovies(title);

  useEffect(() => {
    if (inView && hasNextPage) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <>
        <Head>
          <title>Поиск: {title}</title>
        </Head>
        <div>Ошибка: {error.message}</div>
      </>
    );
  }

  if (!data?.pages) {
    return (
      <>
        <Head>
          <title>Поиск: {title}</title>
        </Head>
        <div>Не можем загрузить фильмы, попробуйте позже</div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Поиск: {title}</title>
      </Head>
      <div className="search-page">
        <h2 className="search-page__head">Результаты поиска для "{title}"</h2>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader />
          </motion.div>
        )}
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default SearchPage;
