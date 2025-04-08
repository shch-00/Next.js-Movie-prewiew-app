import type { TMovieList } from "@/src/types";
import React, { useState, useEffect } from "react";
import { useFilteredMovies } from "@/src/hooks";
import Link from "next/link";
import MovieList from "@/src/components/MovieList/MovieList";
import Input from "@/src/components/Input/Input";
import Loader from "@/src/components/Loaders/Loader";
import SearchIcon from "@/src/icons/SearchIcon";

const SearchList = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);

  const {
    data: movieData,
    isLoading,
    isError,
    refetch,
  } = useFilteredMovies(title, undefined);

  useEffect(() => {
    if (title) {
      refetch();
    }
  }, [title, refetch]);

  function renderInputList(movies: TMovieList) {
    if (isLoading) {
      return (
        <div className="search-list">
          <Loader />
        </div>
      );
    }

    if (isError) {
      return <div className="search-list">Error</div>;
    }

    if (!title) {
      return null;
    }

    return (
      <div className="search-list">
        <MovieList movies={movies} searchable={true} />
        {movies.length >= 15 ? (
          <Link href={`/search/${title}`} className="search-list__link">
            Загрузить еще?
          </Link>
        ) : null}
      </div>
    );
  }
  return (
    <Input
      type="search"
      placeholder="Поиск"
      icon={<SearchIcon className="input-icon" />}
      setTitle={setTitle}
    >
      {movieData?.pages.map((movies, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {renderInputList(movies)}
        </React.Fragment>
      ))}
    </Input>
  );
};

export default SearchList;
