import { useState, useCallback, useEffect } from "react";

// The URL of your backend
const API_URL = "http://localhost:3001/api/leaderboard";

interface Leaderboard {
    X: number;
    O: number;
    Draw: number;
}

export function useLeaderboard() {
    const [leaderboard, setLeaderboard] = useState<Leaderboard>({
        X: 0, O: 0, Draw: 0
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the current leaderboard
    const fetchLeaderboard = useCallback(async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                setError("Failed to fetch leaderboard");
                return;
            }

            const data = await response.json();
            setLeaderboard(data);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message :
                "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Update the leaderboard with a new win
    const updateLeaderboard = useCallback(async (winner: "X" | "O" | "Draw") => {
       try {
           const response = await fetch(API_URL, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ winner })
           });

           if (!response.ok) throw new Error("Failed to update leaderboard");

           const data = await response.json();
           setLeaderboard(data);

       } catch (err: any) {
           setError(err.message);
       }
    }, []);

    // Fetch once when the component mounts
    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    return { leaderboard, loading, error, updateLeaderboard, fetchLeaderboard };
}