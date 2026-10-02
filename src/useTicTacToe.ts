import { useState, useEffect, useCallback } from "react";
import {type BoardState, calculateWinner, type SquareValue} from "./utils.js";

export type GameHistory = {
    squares: BoardState;
    location: string | null;
}[];

export function useTicTacToe() {
    // create the history and currentMove and set to localStorage
    const [history, setHistory] = useState<GameHistory>(() => {
        const savedGame = localStorage.getItem("ticTacToeHistory");
        if (savedGame) {
            return JSON.parse(savedGame);
        }

        return [{ squares: Array(9).fill(null), location: null }];
    });

    const [currentMove, setCurrentMove] = useState<number>(() => {
        const savedMove = localStorage.getItem("ticTacToeMove");
        if (savedMove) {
            return JSON.parse(savedMove);
        }
        return 0;
    });

    // auto update the localStorage
    useEffect(() => {
        localStorage.setItem("ticTacToeHistory", JSON.stringify(history));
        localStorage.setItem("ticTacToeMove", JSON.stringify(currentMove));
    }, [history, currentMove]);

    const [isAscending, setIsAscending] = useState<boolean>(true);
    const xIsNext: boolean = currentMove % 2 === 0;
    const currentSquares: BoardState = history[currentMove].squares;

    const handlePlay = useCallback((nextSquares: BoardState, index: number): void => {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const location = `(${row}, ${col})`;
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            { squares: nextSquares, location: location }
        ];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }, [history, currentMove]);

    // add computer player
    const [isVsComputer, setIsVsComputer] = useState<boolean>(false);
    useEffect(() => {
        if (!isVsComputer || xIsNext)
            return;

        if (calculateWinner(currentSquares)
            || currentSquares.every((square: SquareValue) => square !== null))
            return;

        const emptySquares = currentSquares
            .map((square: SquareValue, index: number) => square === null ? index : null)
            .filter((val): val is number => val !== null);

        const randomIndex = emptySquares[Math.floor(
            Math.random() * emptySquares.length)];

        const timer = setTimeout(() => {
            const nextSquares = currentSquares.slice();
            nextSquares[randomIndex] = "O";
            handlePlay(nextSquares, randomIndex);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentSquares, xIsNext, isVsComputer, handlePlay]);

    function jumpTo(nextMove: number): void {
        setCurrentMove(nextMove);
    }

    function handleReset(): void {
        setHistory([{ squares: Array(9).fill(null), location: null }]);
        setCurrentMove(0);
        localStorage.removeItem("ticTacToeHistory");
        localStorage.removeItem("ticTacToeMove");
    }

    return {
        history, currentMove, xIsNext, currentSquares, isAscending,
        setIsAscending, isVsComputer, setIsVsComputer, handlePlay,
        jumpTo, handleReset
    };
}