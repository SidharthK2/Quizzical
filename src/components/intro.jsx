import React from "react";

export default function Intro(props) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 m-4 pb-24">
      <h1 className="text-5xl font-semibold text-indigo-700">Quizzical</h1>
      <span className="text-xl text-indigo-900">
        Guess all answers correctly to win!
      </span>
      <button
        onClick={props.handleClick}
        className="text-xl font-semibold text-gray-200 bg-indigo-700 hover:bg-indigo-800 rounded-md p-2">
        Start Quiz
      </button>
    </div>
  );
}
