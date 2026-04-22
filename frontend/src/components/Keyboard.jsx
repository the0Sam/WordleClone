import React from "react";

const KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

export default function Keyboard({ onKey, onEnter, onBackspace, statuses }) {
    const handleClick = (key) => {
        if (key === "ENTER") onEnter();
        else if (key === "⌫") onBackspace();
        else onKey(key);
    };

    return (
        <div className="keyboard">
            {KEYS.map((row, i) => (
                <div key ={i} className="key-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            className={`key ${statuses[key] || ""}`}
                            onClick={() => handleClick(key)} 
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}