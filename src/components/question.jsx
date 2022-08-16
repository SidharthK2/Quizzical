import React, {useState} from "react";

export default function Question(props) {
  const [isShuffled, setIsShuffled] = useState(false);
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
    setIsShuffled(!isShuffled);
    return a;
  }
  const shuffledOptions = isShuffled ? cleanData : shuffle(cleanData);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6 px-2 py-6">
      <h1 className="text-3xl text-indigo-900 mx-2 px-2 font-semibold">
        {decodeURIComponent(props.title)}
      </h1>
      <div className="flex justify-center p-4 m-4 w-full">
        <div className="choices flex flex-wrap gap-4">
          <button
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1  bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {shuffledOptions[0]}
          </button>
          <button
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {shuffledOptions[1]}
          </button>
          <button
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {shuffledOptions[2]}
          </button>
          <button
            onClick={(e) => {
              props.handleClick(e);
            }}
            className="text-xl rounded-md w-fit h-fit p-1 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
            {shuffledOptions[3]}
          </button>
        </div>
      </div>
    </div>
  );
}
