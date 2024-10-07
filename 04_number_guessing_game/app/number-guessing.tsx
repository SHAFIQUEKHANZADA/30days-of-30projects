"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberGuessingState {
    gameStarted: boolean;
    gameOver: boolean;
    paused: boolean;
    targetNumber: number;
    userGuess: number | string;
    attempt: number;
}

const NumberGuessing = (): JSX.Element => {

    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [userGuess, setUserGuess] = useState<number | string>("");
    const [attempt, setAttempt] = useState<number>(0);

    useEffect(() => {
        if (gameStarted && !paused) {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            setTargetNumber(randomNum);
        }
    }, [gameStarted, paused]);

    const handleStartGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setAttempt(0);
        setPaused(false);
        setUserGuess(""); // Clear guess when starting
    };

    const handlePauseGame = () => {
        setPaused(true);
    };

    const handleResumeGame = () => {
        setPaused(false);
    };

    const handleGuess = () => {
        const userGuessNumber = typeof userGuess === "string" ? parseInt(userGuess) : userGuess;
        if (userGuessNumber === targetNumber) {
            setGameOver(true);
        } else {
            setAttempt(attempt + 1);
        }
    };

    const handleTryAgain = () => {
        setGameStarted(false);
        setGameOver(false);
        setUserGuess("");
        setAttempt(0);
    };

    const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserGuess(e.target.value);
    };

    return (
        <div className="flex flex-col bg-zinc-900 h-screen justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-center font-bold text-3xl text-black mb-2">Number Guessing Game</h1>
                <p className="text-center mb-4">Try to guess the number between 1 and 10</p>

                {!gameStarted && (
                    <div className="flex justify-center">
                        <Button
                            onClick={handleStartGame}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Game
                        </Button>
                    </div>
                )}

                {gameStarted && !gameOver && (
                    <div>
                        <div className="flex justify-center mb-4">
                            {paused ? (
                                <Button
                                    onClick={handleResumeGame}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Resume
                                </Button>
                            ) : (
                                <Button
                                    onClick={handlePauseGame}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Pause
                                </Button>
                            )}
                        </div>

                        <div className="flex justify-center mb-4">
                            <Input
                                type="number"
                                value={userGuess}
                                onChange={handleUserGuessChange}
                                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                                placeholder="Enter your guess"
                            />
                            <Button
                                onClick={handleGuess}
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
                            >
                                Guess
                            </Button>
                        </div>
                    </div>
                )}

                {gameOver && (
                    <div>
                        <div className="text-center mb-4 text-black">
                            <h2 className="text-2xl font-bold">Game Over!</h2>
                            <p>You guessed the number in {attempt} attempts.</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={handleTryAgain}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberGuessing;
