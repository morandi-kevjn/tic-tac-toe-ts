import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateWinner, type BoardState } from "../utils.ts";

export type GameHistory = {
    squares: BoardState;
    location: string | null;
}[];

interface GameState {
    // State
    history: GameHistory;
    currentMove: number;
    isAscending: boolean;
    isVsComputer: boolean;

    // Actions
    handlePlay: (nextSquares: BoardState, index: number) => void;
    jumpTo: (nextMove: number) => void;
    handleReset: () => void;
    setIsAscending: (isAscending: boolean) => void;
    setIsVsComputer: (isAscending: boolean) => void;
    makeComputerMove: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            // Initial State
            history: [{
                squares: Array(9).fill(null),
                location: null,
            }],
            currentMove: 0,
            isAscending: true,
            isVsComputer: false,

            // Actions
            handlePlay: (nextSquares, index) => {
                const { history, currentMove } = get();
                const row = Math.floor(index / 3) + 1;
                const col = (index % 3) + 1;
                const location = `(${row}, ${col})`;

                const nextHistory = [
                    ...history.slice(0, currentMove + 1),
                    { squares: nextSquares, location }
                ];

                // set() updates the state imutably
                set({
                    history: nextHistory,
                    currentMove: nextHistory.length - 1,
                });
            },

            jumpTo: (nextMove) => set({ currentMove: nextMove }),

            handleReset: () => set({
                history: [{
                    squares: Array(9).fill(null),
                    location: null,
                }],
                currentMove: 0,
            }),

            setIsAscending: (isAscending) => set({ isAscending }),

            setIsVsComputer: (isVsComputer) => set({ isVsComputer }),

            makeComputerMove: () => {
                const { currentMove, history, isVsComputer, handlePlay } = get();

                const currentSquares = history[currentMove].squares;
                const xIsNext = currentMove % 2 === 0;

                if (!isVsComputer || xIsNext) return;

                if (calculateWinner(currentSquares) ||
                    currentSquares.every(sq => sq !== null))
                    return;

                const emptySquares = currentSquares
                    .map((sq, idx) => sq === null ? idx : null)
                    .filter((val): val is number => val !== null);

                const randomIndex = emptySquares[
                    Math.floor(Math.random() * emptySquares.length)];

                const nextSquares = currentSquares.slice();
                nextSquares[randomIndex] = "O";

                handlePlay(nextSquares, randomIndex);
            }
        }),
        {
            name: "tic-tac-toe-storage", // key used in localStorage
        }
    )
)

