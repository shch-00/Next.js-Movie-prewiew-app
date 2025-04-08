import { useQuery } from "@tanstack/react-query"
import { URL_API } from "../api"
import { z } from "zod"

const GeneresSchema = z.promise(z.array(z.string()))
type Generes = z.infer<typeof GeneresSchema>

async function fetchGenres() {
  const response = await fetch(`${URL_API}/movie/genres`)
  const data = response.json()
  return GeneresSchema.parse(data)
}

/**
 *
 * @returns Query Result
 */
export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchGenres(),
  })
}
