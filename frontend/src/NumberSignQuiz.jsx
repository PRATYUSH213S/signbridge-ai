import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./SignQuiz.css"; // You can reuse this

const numberQuizData = [
    {
      number: "1",
      detect: (lm) => lm[8].y < lm[6].y && [12, 16, 20].every(i => lm[i].y > lm[i - 2].y),
    },
    {
      number: "2",
      detect: (lm) =>
        lm[8].y < lm[6].y &&
        lm[12].y < lm[10].y &&
        [16, 20].every(i => lm[i].y > lm[i - 2].y),
    },
    {
      number: "3",
      detect: (lm) =>
        lm[4].x < lm[3].x &&
        lm[8].y < lm[6].y &&
        lm[12].y < lm[10].y &&
        [16, 20].every(i => lm[i].y > lm[i - 2].y),
    },
    {
      number: "4",
      detect: (lm) =>
        [8, 12, 16].every(i => lm[i].y < lm[i - 2].y) &&
        lm[20].y > lm[18].y &&
        lm[4].x > lm[3].x,
    },
    {
      number: "5",
      detect: (lm) => [8, 12, 16, 20].every(i => lm[i].y < lm[i - 2].y),
    },
    {
      number: "6",
      detect: (lm) =>
        Math.abs(lm[4].x - lm[12].x) < 0.05 &&
        Math.abs(lm[4].y - lm[12].y) < 0.05,
    },
    {
      number: "7",
      detect: (lm) =>
        Math.abs(lm[4].x - lm[16].x) < 0.05 &&
        Math.abs(lm[4].y - lm[16].y) < 0.05,
    },
    {
      number: "8",
      detect: (lm) =>
        Math.abs(lm[4].x - lm[20].x) < 0.05 &&
        Math.abs(lm[4].y - lm[20].y) < 0.05,
    },
    {
      number: "9",
      detect: (lm) =>
        Math.abs(lm[4].x - lm[8].x) < 0.05 &&
        Math.abs(lm[4].y - lm[8].y) < 0.05,
    },
    {
      number: "10",
      detect: (lm) => {
        const thumbUp = lm[4].y < lm[3].y && lm[8].y > lm[6].y;
        return thumbUp;
      },
    },
  ];
  

const NumberSignQuiz = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cooldown = useRef(false);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const nextQuestion = () => {
    if (index < numberQuizData.length - 1) {
      setIndex(prev => prev + 1);
      setFeedback("");
      setAnswered(false);
      setTimeLeft(60);
    } else {
      setCompleted(true);
    }
  };

  useEffect(() => {
    let timer;
    if (!answered && !completed) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setFeedback(`⏰ Time's up! The correct sign was '${numberQuizData[index].number}'`);
            setAnswered(true);
            cooldown.current = true;
            setTimeout(() => {
              cooldown.current = false;
              nextQuestion();
            }, 3000);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [answered, index, completed]);

  useEffect(() => {
    if (!window.Hands || !window.Camera) {
      console.warn("MediaPipe libraries not loaded yet");
      return;
    }

    let camera = null;
    let hands = null;

    const loadMediaPipe = async () => {
      try {
        hands = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          if (completed) return;

          const canvas = canvasRef.current;
          if (!canvas) return; // ✅ Check if canvas exists
          
          const ctx = canvas.getContext("2d");
          if (!ctx) return; // ✅ Check if context exists
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          if (results.multiHandLandmarks?.length) {
            const landmarks = results.multiHandLandmarks[0];

            window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 3 });
            window.drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 1 });

            if (!answered && !cooldown.current) {
              const isCorrect = numberQuizData[index]?.detect?.(landmarks);
              if (isCorrect) {
                setFeedback("✅ Correct!");
                setAnswered(true);
                cooldown.current = true;

                setTimeout(() => {
                  cooldown.current = false;
                  nextQuestion();
                }, 10000);
              } else {
                setFeedback("❌ Wrong!");
              }
            }
          }
        });

        if (webcamRef.current?.video) {
          const video = webcamRef.current.video;
          camera = new window.Camera(video, {
            onFrame: async () => {
              if (!completed && video && hands) {
                await hands.send({ image: video });
              }
            },
            width: 640,
            height: 480,
          });

          camera.start();
        }
      } catch (error) {
        console.error("Error loading MediaPipe:", error);
      }
    };

    loadMediaPipe();
    
    return () => {
      if (camera) {
        camera.stop();
      }
      if (hands) {
        hands.close();
      }
    };
  }, [answered, index, completed]);

  const speakQuestion = (num) => {
    const utterance = new SpeechSynthesisUtterance(`Show the sign for number ${num}`);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!completed) {
      speakQuestion(numberQuizData[index]?.number);
      const timeoutId = setTimeout(() => {
        speakQuestion(numberQuizData[index]?.number);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [index, completed]);

  return (
    <div className="signquiz-container">
      <h2>Number Sign Quiz</h2>
      {completed ? (
        <div className="completed">
          <h3>🎉 Quiz Completed!</h3>
          <p>Great job practicing number signs!</p>
        </div>
      ) : (
        <>
          <p className="question">
            Make the sign for number <strong>{numberQuizData[index]?.number}</strong>
          </p>
          <p className="timer">⏱️ Time Left: {timeLeft}s</p>
          <div className="video-container">
            <Webcam ref={webcamRef} style={{ display: "none" }} />
            <canvas ref={canvasRef} width="640" height="480" className="quiz-canvas" />
          </div>
          <p className={`feedback ${feedback.includes("Correct") ? "correct" : "wrong"}`}>
            {feedback}
          </p>
        </>
      )}
    </div>
  );
};

export default NumberSignQuiz;
