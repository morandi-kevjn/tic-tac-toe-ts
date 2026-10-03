import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// The URL of your backend
const API_URL = "http://localhost:3001/api/leaderboard";

interface Leaderboard {
    X: number;
    O: number;
    Draw: number;
}

// API Calls (Pure functions)
const fetchLeaderboardApi = async (): Promise<Leaderboard> => {
    const { data } = await axios.get(API_URL);
    return data;
};

const updateLeaderboardApi = async (winner: "X" | "O" | "Draw"): Promise<Leaderboard> => {
    const { data } = await axios.post(API_URL, { winner });
    return data;
};

export function useLeaderboard() {
    const queryClient = useQueryClient();

    // useQuery handles ladiong, error and caching automatically
    const {
        data: leaderboard = { X: 0, O: 0, Draw: 0 },
        isLoading,
        error
    } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: fetchLeaderboardApi
    });

    // useMutation handles the POST request
    const mutation = useMutation({
        mutationFn: updateLeaderboardApi,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["leaderboard"]
            });
        }
    })

    return {
        leaderboard,
        loading: isLoading,
        error: error ? error.message : null,
        updateLeaderboard: mutation.mutate
    }
}