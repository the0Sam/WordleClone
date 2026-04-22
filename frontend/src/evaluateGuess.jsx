export function evaluateGuess(guess, solution) {
    const result = Array(guess.length).fill("gray");
    const solutionLetters = solution.split("");

    guess.split("").forEach((letter, i) => {
        if(solutionLetters[i] === letter) {
            result[i] ="green";
            solutionLetters[i] = null;
        }
    });

    guess.split("").forEach((letter, i) => {
        if (result[i] === "green") return;

        const index = solutionLetters.indexOf(letter);
        if(index !== -1) {
            result[i] = "yellow";
            solutionLetters[index] = null;
        }
    });
    
    return result;
}