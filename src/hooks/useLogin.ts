import { useMutation, useQueryClient } from "@tanstack/react-query"
import { URL_API } from "../api"

async function fetchLogin(userData: { email: string; password: string }) {
  const response = await fetch(`${URL_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Ошибка при входе")
  }
  const data = await response.json()
  console.log(data)

  return data
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      setTimeout(() => window.location.reload(), 250)
    },
  })
}
