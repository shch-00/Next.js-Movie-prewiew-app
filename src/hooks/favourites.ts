import { useMutation, useQuery } from "@tanstack/react-query"
import { URL_API } from "../api"
import { MovieListSchema } from "../types"

async function fetchFavourites() {
  const response = await fetch(`${URL_API}/favorites`, {
    method: "GET",
    credentials: "include",
  })
  const data = await response.json()
  return MovieListSchema.parse(data)
}

async function fetchChangeFavourites(id: string, purpose: "delete" | "add") {
  if (purpose === "add") {
    const response = await fetch(`${URL_API}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    })

    const data = await response.json()
    return data
  }

  const response = await fetch(`${URL_API}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const data = await response.json()
  console.log(id);
  return data
}

export function useFavourites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavourites,
  })
}

export function useChangeFavourites() {
  return useMutation({
    mutationFn: ({ id, purpose }: { id: string; purpose: "delete" | "add" }) =>
      fetchChangeFavourites(id, purpose),
  })
}
