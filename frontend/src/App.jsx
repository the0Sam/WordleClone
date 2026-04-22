// Code by Sam!!
// Enjoy!!

import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { evaluateGuess } from "./evaluateguess";
import "./style.css";
import { ANSWERS, VALID_WORDS } from "./components/wordList";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function App() {
  const [toast, setToast] = useState(null);

  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(
    Array(MAX_ATTEMPTS).fill("").map(() => Array(WORD_LENGTH).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [statuses, setStatuses] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [evaluations, setEvaluations] = useState(
    Array(MAX_ATTEMPTS).fill(null)
  );

  //Display message
  const showToast = (message, duration = 1600) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  // Random word from wordList.js
  const getRandomWord = () => {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  };

  // Initialize first word
  useEffect(() => {
    const newWord = getRandomWord();
    setWord(newWord);
  }, []);

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      if (e.key === "Enter") handleEnter();
      else if (e.key === "Backspace") handleBackspace();
      else if (/^[a-zA-z]$/.test(e.key)) {
        handleLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentCol, currentRow, guesses, gameOver]);


  // Add letter 
  const handleLetter = (letter) => {
    if (currentCol < WORD_LENGTH) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol] = letter;
      setGuesses(newGuesses);
      setCurrentCol(currentCol + 1);
    }
  };

  // Backspace, remove letter
  const handleBackspace = () => {
    if (currentCol > 0) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol -1] = "";
      setGuesses(newGuesses);
      setCurrentCol(currentCol -1);
    }
  };

  // Submit the guess
  const handleEnter = () => {
    if (currentCol !== WORD_LENGTH) return;

    const guess = guesses[currentRow].join("");

    // Validate the word
    if (!VALID_WORDS.includes(guess)) {
      showToast("Not a valid word");
      return;
    }


    const evalResult = evaluateGuess(guess, word);

    // Save evaluations
    const newEvaluations = [...evaluations];
    newEvaluations[currentRow] = evalResult;
    setEvaluations(newEvaluations);

    // Updating the Keyboard letter with color
    const newStatuses = {...statuses};
    const priority = { green: 3, yellow: 2, gray: 1 };

    guess.split("").forEach((letter, i) => {
      const newStatus = evalResult[i];
      const currentStatus = newStatuses[letter];

      if (
        !currentStatus || 
        priority[newStatus] > priority[currentStatus]
      ) {
        newStatuses[letter] = newStatus;
      }
    });

    setStatuses(newStatuses);

    // Correct guess status
    if (guess === word) {
      setGameOver(true);
      setTimeout(() => showToast("You win!"), 1600);
      return;
    }

    // Wrong guess status
    if (currentRow === MAX_ATTEMPTS -1) {
      setGameOver(true);
      setTimeout(() => showToast(`Word was ${word}`), 300);
      return;
    }

    // Change row
    setCurrentRow(currentRow +1);
    setCurrentCol(0);

  };

  // Restart the game
  const restartGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setGuesses(Array(MAX_ATTEMPTS).fill("").map(() => Array(WORD_LENGTH).fill("")));
    setEvaluations(Array(MAX_ATTEMPTS).fill(null));
    setStatuses({});
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
  };

  return (
    <div className="app">
      <h1>Wordle Clone</h1>

    {toast && <div className="toast">{toast}</div>}
      <Board 
        guesses={guesses}
        evaluations={evaluations}
      />

      {gameOver && (
      <button className="restart-btn floating" onClick={restartGame}>
        Next Word
      </button>
    )}

      <Keyboard
        onKey={handleLetter}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
        statuses={statuses} 
      />
    </div>
  );
}