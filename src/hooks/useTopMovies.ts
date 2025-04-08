import { useQuery } from "@tanstack/react-query";
import { URL_API } from "@/src/api";
import { MovieListSchema } from "@/src/types";

async function fetchTopMovieList() {
  const response = await fetch(`${URL_API}/movie/top10`);
  const data = await response.json();
  return MovieListSchema.parse(data);
}

export function useTopMovies() {
  return useQuery({
    queryKey: ["top"],
    queryFn: () => fetchTopMovieList(),
  });
}
