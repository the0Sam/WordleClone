import React from "react";
import Tile from "./Tile";

export default function Board ({ guesses, word, currentRow, evaluations }) {
    return (
        <div className="board">
            {guesses.map((row, rowIndex)    => (
                <div key={rowIndex} className="row">
                    {row.map((letter, colIndex) => (
                        <Tile
                            key={colIndex}
                            letter={letter}
                            status={evaluations[rowIndex]?.[colIndex]}
                            delay={colIndex * 300}
                        />
                    ))} 

                </div> 
            ))}
        </div>
    );
}