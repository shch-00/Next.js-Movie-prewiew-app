import { URL_API } from "../api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { MovieListSchema } from "../types"

/**
 *  Функция GET-запроса к API
 * @param url
 * @returns Promise<TMovie>
 */
async function fetchMovieList(url: string) {
  const response = await fetch(url)
  const data = await response.json()
  return MovieListSchema.parse(data)
}

/**
 * Хук предоставляющий данные по запросу
 * @param title Название или часть названия фильма
 * @param genre Название жанра
 * @param count Количество отображаемых на странице фильмов
 * @returns Список фильмов, отфильтрованный по заданным параметрам
 */
export function useFilteredMovies(
  title?: string,
  genre?: string,
  count: number = 15,
) {
  return useInfiniteQuery({
    queryKey: ["movie", title, genre],
    queryFn: ({ pageParam = 0 }) => {
      const url = new URL(`${URL_API}/movie`)

      if (title) {
        url.searchParams.append("title", title)
      }
      if (genre) {
        url.searchParams.append("genre", genre)
      }

      url.searchParams.append("page", pageParam.toString())
      url.searchParams.append("count", count.toString() || "10")

      return fetchMovieList(url.toString())
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return allPages.length + 1
    },
    initialPageParam: 0,
  })
}
