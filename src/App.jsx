import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Intro from "./components/intro";
import Question from "./components/question";

export default function App() {
  const [start, setStart] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [complete, setComplete] = useState(false);

  function onStart() {
    setStart(!start);
  }

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=4&category=31&difficulty=easy&type=multiple&encode=url3986"
      );
      const dataArray = await res.json();
      const dataObj = dataArray.results.map((item) => {
        return { ...item, selectedAns: "", id: nanoid()};
      });
      setQuiz(dataObj);
    }
    getQuiz();
  }, [start]);

  function onSelectAnswer(id, e) {
    setQuiz((ans) => {
      return ans.map((item) => {
        return item.id === id
          ? { ...item, selectedAns: e.target.textContent }
          : item;
      });
    });
  }

  const onSubmit = () => {
    const allSelected = quiz.every(item => item.selectedAns);
    setComplete(allSelected ? true : false);
  }

  function onNewGame() {

  }

  

  const quizEl = quiz.map((item) => {
    return (
      <Question
        key={item.id}
        title={item.question}
        correctAns={item.correct_answer}
        incorrectAns={item.incorrect_answers}
        selectedAns={item.selectedAns}
        isComplete={complete}
        handleClick={(e) => onSelectAnswer(item.id, e)}
      />
    );
  });
  console.log(quiz, complete)

  return (
    <div className="w-screen h-screen">
      <img
        src="src/assets/blob 5.png"
        alt="blob1"
        className="mt-auto ml-auto drop-shadow-md"
      />

      {!start && <Intro handleClick={onStart} />}
      {start && (
        <div className="flex flex-col divide-y-2 gap-6 m-2 px-2 items-center">
          {quizEl}
          {!complete && <button onClick={onSubmit} className="p-4 text-xl font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg">
            Submit!
          </button>}
          {complete && <button onClick={onNewGame} className="p-4 text-xl font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg">
            New Game
          </button>}
        </div>
      )}
      <img
        src="src/assets/blob 6.png"
        alt="blob2"
        className="mb-auto mr-auto drop-shadow-md"
      />
    </div>
  );
}
