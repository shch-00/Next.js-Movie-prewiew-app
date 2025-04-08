import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_API } from "../api";

async function fetchLogout() {
  const response = await fetch(`${URL_API}/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setTimeout(() => window.location.reload(), 250);
    },
  });
}

export { useLogout };
