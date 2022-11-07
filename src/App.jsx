import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Intro from "./components/intro";
import Question from "./components/question";

export default function App() {
  const [start, setStart] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [complete, setComplete] = useState(false);

  const URL =
    "https://opentdb.com/api.php?amount=4&category=14&difficulty=easy&type=multiple&encode=url3986";

  function onStart() {
    setStart(!start);
  }

  useEffect(() => {
    if (start) {
      async function getQuiz() {
        const res = await fetch(URL);
        const dataArray = await res.json();
        const dataObj = dataArray.results.map((item) => {
          return { ...item, selectedAns: "", id: nanoid() };
        });
        setQuiz(dataObj);
      }
      getQuiz();
    }
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
    const allSelected = quiz.every((item) => item.selectedAns);
    setComplete(allSelected ? true : false);
  };

  function onNewGame() {
    setStart(false);
    setComplete(false);
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
  const finalScoreCount = (q) => {
    let selectedAns = q.selectedAns.split(" ");
    let correctAns = q.correct_answer.split("%");
    return selectedAns[0] == correctAns[0];
  };
  return (
    <div className="w-screen h-screen">
      {!start && <Intro handleClick={onStart} />}
      {start && (
        <div className="flex flex-col divide-y-2 gap-6 m-2 px-2 items-center">
          {quizEl}
          {!complete && (
            <button
              onClick={onSubmit}
              className="p-4 text-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg">
              Submit!
            </button>
          )}
          {complete && (
            <button
              onClick={onNewGame}
              className="p-4 text-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg">
              New Game
            </button>
          )}
        </div>
      )}
      {complete && (
        <div className="score text-center pb-4">{`Score: ${
          quiz.filter(finalScoreCount).length
        }/5`}</div>
      )}
    </div>
  );
}
