import { URL_API } from "../api"
import { UserSchema } from "../types/User"
import { useQuery } from "@tanstack/react-query"

async function fetchMe() {
  const response = await fetch(`${URL_API}/profile`, {
    method: "GET",
    credentials: "include"
  })
  const data = await response.json()
  return UserSchema.parse(data)
}

function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe()
  })
}

export { useMe }
