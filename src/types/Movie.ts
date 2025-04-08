import { string, z } from "zod"

export const MovieSchema = z.object({
  id: z.number().nullable(),
  title: z.string().nullable(),
  originalTitle: z.string().nullable(),
  language: z.string().nullable(),
  releaseYear: z.number().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(string()),
  plot: z.string().nullable(),
  runtime: z.number().nullable(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string().nullable(),
  status: z.string().nullable(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYouTubeId: z.string().nullable(),
  tmdbRating: z.number().nullable(),
  searchL: z.string().nullable(),
  keywords: z.array(string()),
  countriesOfOrigin: z.array(string()),
  languages: z.array(string()),
  cast: z.array(string()),
  director: z.string().nullable(),
  production: z.string().nullable().nullable(),
  awardsSummary: z.string().nullable(),
})

export type TMovie = z.infer<typeof MovieSchema>

export const MovieListSchema = z.array(MovieSchema)

export type TMovieList = z.infer<typeof MovieListSchema>
