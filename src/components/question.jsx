import React, { useState, useEffect } from "react";

export default function Question(props) {
  const [isShuffled, setIsShuffled] = useState(false);
  const options = [props.correctAns, ...props.incorrectAns];
  const cleanData = options.map((item) => decodeURIComponent(item));
  const [questions, setQuestions] = useState(cleanData);
  const purple = "#e7a6f7";
  const green = "#2cf562";
  const lightGreen = "#d7fce1";
  const red = "#f75c75";

  useEffect(() => {
    console.log("effect shuffle run");
    function shuffle(a) {
      let j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
    setQuestions(shuffle(cleanData));
    setIsShuffled(true);
  }, [isShuffled]);

  function computeStyle(textContent, correctAns, selectedAns, isComplete) {
    correctAns = decodeURIComponent(correctAns);
    let styles;
    if (textContent === correctAns && isComplete) {
      styles = { backgroundColor: lightGreen };
    }

    if (selectedAns === textContent) {
      if (isComplete) {
        styles =
          textContent === correctAns
            ? { backgroundColor: green }
            : { backgroundColor: red };
      } else {
        styles = { backgroundColor: purple };
      }
    }

    return styles;
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6 px-2 py-6">
      <h1 className="text-3xl text-indigo-900 mx-2 px-2 font-semibold">
        {decodeURIComponent(props.title)}
      </h1>
      <div className="flex justify-center p-4 m-4 w-full">
        <div className="choices flex flex-wrap gap-4">
          <button
            style={computeStyle(
              questions[0],
              props.correctAns,
              props.selectedAns,
              props.isComplete
            )}
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1  bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {questions[0]}
          </button>
          <button
            style={computeStyle(
              questions[1],
              props.correctAns,
              props.selectedAns,
              props.isComplete
            )}
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {questions[1]}
          </button>
          <button
            style={computeStyle(
              questions[2],
              props.correctAns,
              props.selectedAns,
              props.isComplete
            )}
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {questions[2]}
          </button>
          <button
            style={computeStyle(
              questions[3],
              props.correctAns,
              props.selectedAns,
              props.isComplete
            )}
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {questions[3]}
          </button>
        </div>
      </div>
    </div>
  );
}
