import { useMutation } from "@tanstack/react-query"
import { URL_API } from "../api"
import { TUser } from "../types"

async function fetchRegister(userData: TUser) {
  const response = await fetch(`${URL_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Ошибка при создании пользователя")
  }

  return response.json()
}

export function useRegister() {
  return useMutation({
    mutationFn: fetchRegister,
  })
}
