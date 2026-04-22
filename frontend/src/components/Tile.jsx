import React from "react";

export default function Tile({ letter, status, delay }) {

    return (
        <div 
            className={`tile ${status ? "flip" : ""}`}
            style={{ animationDelay: `${delay}ms`}}
        >
            <div className={`inner ${status}`}>
                <div className="front"> {letter} </div>
                <div className="back"> {letter} </div>
            </div>
        </div>
    );
}