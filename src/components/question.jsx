import React from "react";

export default function Question(props) {
  const options = [props.correctAns, ...props.incorrectAns];
  const cleanData = options.map((item) => decodeURIComponent(item));
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  const shuffledOptions = shuffle(cleanData);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">{decodeURIComponent(props.title)}</h1>
      <div className="choices flex gap-2 p-2">
        <button className="text-xl bg-indigo-100 border-indigo-800 text-indigo-800 p-2 m-2">
          {shuffledOptions[0]}
        </button>
        <button className="text-xl bg-indigo-100 border-indigo-800 text-indigo-800 p-2 m-2">
          {shuffledOptions[1]}
        </button>
        <button className="text-xl bg-indigo-100 border-indigo-800 text-indigo-800 p-2 m-2">
          {shuffledOptions[2]}
        </button>
        <button className="text-xl bg-indigo-100 border-indigo-800 text-indigo-800 p-2 m-2">
          {shuffledOptions[3]}
        </button>
      </div>
    </div>
  );
}
