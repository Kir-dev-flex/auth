import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/authApi"

export function useProfile(userId) {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getProfile(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000 // Профиль редко меняется, 5 минут норм
    })
}