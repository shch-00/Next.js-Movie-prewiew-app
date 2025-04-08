import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { URL_API } from "@/src/api";
import { MovieSchema } from "@/src/types";

async function fetchRandomMovie() {
  const response = await fetch(`${URL_API}/movie/random`);
  const data = await response.json();
  return MovieSchema.parse(data);
}

async function fetchMovie(id: number) {
  const response = await fetch(`${URL_API}/movie/${id}`);
  const data = await response.json();
  return MovieSchema.parse(data);
}

export function useMovie(id?: number | undefined) {
  const [movieId, setMovieId] = useState<string | number>("");
  if (movieId === "") {
    id
      ? setMovieId(id)
      : setMovieId(Math.random().toString(36).substring(2, 12));
  }
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
      if (!id) {
        return fetchRandomMovie();
      }

      return fetchMovie(id);
    },
  });
}
