import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Intro from "./components/intro";
import Question from "./components/question";

export default function App() {
  const [start, setStart] = useState(false);
  const [quiz, setQuiz] = useState([]);

  function onStart() {
    setStart(!start);
  }

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=4&category=31&difficulty=easy&type=multiple&encode=url3986"
      );
      const data = await res.json();
      setQuiz(data.results);
    }
    getQuiz();
    console.log(quiz);
  }, [start]);

  const quizEl = quiz.map((item) => {
    return (
      <Question
        Key={nanoid()}
        title={item.question}
        correctAns={item.correct_answer}
        incorrectAns={item.incorrect_answers}
      />
    );
  });

  return (
    <div className="w-screen h-screen">
      <img
        src="src/assets/blob 5.png"
        alt="blob1"
        className="absolute top-0 right-0 m-0 drop-shadow-md"
      />
      <img
        src="src/assets/blob 6.png"
        alt="blob2"
        className="absolute bottom-0 left-0  m-0 drop-shadow-md"
      />
      {!start && <Intro handleClick={onStart} />}
      <div className="flex flex-col divide-y-2 gap-4 m-2 p-2">
        {quizEl}
        <button className="p-4 text-xl font-semibold">Submit!</button>
      </div>
    </div>
  );
}
