// Quiz.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizList = [
  {
    title: "Sign Language - Alphabets A to Z",
    description: "Recognize hand signs from A to E with webcam detection.",
    duration: "5 minutes",
    page :"/give-quiz"
  },
  // {
  //   title: "Sign Language - Alphabets F to J",
  //   description: "Test your knowledge of signs F through J.",
  //   duration: "5 minutes",
  // },
  {
    title: "Numbers 1-10 in Sign Language",
    description: "Identify number signs with your fingers.",
    duration: "4 minutes",
    page:"/number-quiz"
  },
  // {
  //   title: "Daily Words in Sign Language",
  //   description: "Signs for common daily-use words like 'Hello', 'Thanks'.",
  //   duration: "6 minutes",
  // },
  // {
  //   title: "Emotion Signs",
  //   description: "Express feelings like happy, sad, angry using signs.",
  //   duration: "7 minutes",
  // },
];

const Quiz = () => {
  const navigate = useNavigate();

  const startQuiz = (url) => {
    navigate(url);
  };

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <h1>🧠 Sign Language Practice Hub</h1>
        <p>Learn, Recognize, and Master communication with signs!</p>
      </header>

      <section className="quiz-tags">
        <span className="tag">Alphabets</span>
        <span className="tag">Numbers</span>
        <span className="tag">Daily Words</span>
        <span className="tag">Emotions</span>
        <span className="tag">Practice</span>
      </section>

      <h2 className="section-title">📝 Available Quizzes</h2>

      <div className="quiz-list">
        {quizList.map((quiz, index) => (
          <div className="quiz-card" key={index}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <p><strong>⏱ Duration:</strong> {quiz.duration}</p>
            <button onClick={()=>startQuiz(quiz.page)}>Start Quiz</button>
          </div>
        ))}
      </div>

      <footer className="quiz-footer">
        <p>✨ Keep practicing. Sign language empowers communication!</p>
      </footer>
    </div>
  );
};

export default Quiz;
