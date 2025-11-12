import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./SignQuiz.css";

const quizData = [
//   { letter: "A", detect: (lm) => [8,12,16,20].every(i => lm[i].y > lm[i-2].y) && lm[4].x < lm[3].x },
{
    letter: "A",
    detect: (lm) => {
      const foldedFingers = [8, 12, 16, 20].every((i) =>
        Math.abs(lm[i].y - lm[i - 2].y) < 0.05 && 
        Math.abs(lm[i].x - lm[i - 2].x) < 0.05
      );
  
      const thumbExtended = lm[4].x < lm[3].x && Math.abs(lm[4].y - lm[3].y) < 0.1;
  
      const fingersCompact = Math.abs(lm[8].x - lm[20].x) < 0.08;
  
      return foldedFingers && thumbExtended && fingersCompact;
    },
  }
  ,
  
//   { letter: "B", detect: (lm) => [8,12,16,20].every(i => lm[i].y < lm[i-2].y) },
{
    letter: "B",
    detect: (lm) => {
      const fingersExtended = [8, 12, 16, 20].every((i) =>
        lm[i].y < lm[i - 2].y && 
        Math.abs(lm[i].x - lm[i - 2].x) < 0.05
      );
  
      const thumbAcrossPalm = lm[4].x > lm[3].x && lm[4].y > lm[3].y;
  
      const fingersTogether = Math.abs(lm[8].x - lm[20].x) < 0.12;
  
      return fingersExtended && thumbAcrossPalm && fingersTogether;
    },
  }
  ,
  {
    letter: "C",
    detect: (lm) => {
      if (!lm || lm.length < 9) return false; // ✅ Prevent crash
      return Math.abs(lm[4].x - lm[8].x) > 0.1 && lm[8].y < lm[6].y;
    },
  },
  {
    letter: "D",
    detect: (lm) => {
      if (!lm || lm.length < 21) return false;
      return lm[8].y < lm[6].y && [12, 16, 20].every(i => lm[i].y > lm[i - 2].y);
    },
  },
  {
    letter: "E",
    detect: (lm) => {
      if (!lm || lm.length < 21) return false;
      return [8, 12, 16, 20].every(i => lm[i].y > lm[5].y) && lm[4].x > lm[3].x;
    },
  }
  
  // { letter: "C", detect: (lm) => Math.abs(lm[4].x - lm[8].x) > 0.1 && lm[8].y < lm[6].y },
  // { letter: "D", detect: (lm) => lm[8].y < lm[6].y && [12,16,20].every(i => lm[i].y > lm[i-2].y) },
  // { letter: "E", detect: (lm) => [8,12,16,20].every(i => lm[i].y > lm[5].y) && lm[4].x > lm[3].x },
];

const SignQuiz = () => {
  const numwebcamRef = useRef(null);
  const canvasnumRef = useRef(null);
  const cooldown = useRef(false); // ⬅️ Now using useRef to persist between renders
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const nextQuestion = () => {
    if (index < quizData.length - 1) {
      setIndex(prev => prev + 1);
      setFeedback("");
      setAnswered(false);
      setTimeLeft(60);
    } else {
      setCompleted(true);
    }
  };

  // Timer Logic
  useEffect(() => {
    let timer;
    if (!answered && !completed) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setFeedback(`⏰ Time's up! The correct sign was '${quizData[index].letter}'`);
            setAnswered(true);
            cooldown.current = true;
            setTimeout(() => {
              cooldown.current = false;
              nextQuestion();
            }, 3000); // Wait 3s before moving on
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [answered, index, completed]);

  useEffect(() => {
    const loadMediaPipe = async () => {
      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
  
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });
  
      hands.onResults((results) => {
        if (completed) return; // ✅ Don't process anything after completion
  
        const canvas = canvasnumRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
  
        if (results.multiHandLandmarks?.length) {
          const landmarks = results.multiHandLandmarks[0];
  
          window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 3 });
          window.drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 1 });
  
          if (!answered && !cooldown.current) {
            const isCorrect = quizData[index]?.detect?.(landmarks);
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
  
      if (numwebcamRef.current?.video) {
        const camera = new window.Camera(numwebcamRef.current.video, {
          onFrame: async () => {
            if (!completed) {
              await hands.send({ image: numwebcamRef.current.video });
            }
          },
          width: 640,
          height: 480,
        });
  
        camera.start();
  
        return () => {
          camera.stop(); // ✅ stop camera on cleanup
        };
      }
    };
  
    const cleanup = loadMediaPipe();
    return () => {
      cleanup?.then((stop) => stop?.());
    };
  }, [answered, index, completed]);
  
  // MediaPipe Detection
  // useEffect(() => {
  //   const loadMediaPipe = async () => {
  //     const hands = new window.Hands({
  //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  //     });

  //     hands.setOptions({
  //       maxNumHands: 1,
  //       modelComplexity: 1,
  //       minDetectionConfidence: 0.7,
  //       minTrackingConfidence: 0.5,
  //     });

  //     hands.onResults((results) => {
  //       const canvas = canvasnumRef.current;
  //       const ctx = canvas.getContext("2d");
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  //       if (results.multiHandLandmarks?.length) {
  //         const landmarks = results.multiHandLandmarks[0];

  //         window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 3 });
  //         window.drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 1 });

  //         if (!answered && !cooldown.current) {
  //           const isCorrect = quizData[index]?.detect(landmarks);
  //           if (isCorrect) {
  //             setFeedback("✅ Correct!");
  //             setAnswered(true);
  //             cooldown.current = true;

  //             setTimeout(() => {
  //               cooldown.current = false;
  //               nextQuestion();
  //             }, 10000); // ✅ 10 seconds before moving to next question
  //           } else {
  //             setFeedback("❌ Wrong!");
  //           }
  //         }
  //       }
  //     });

  //     if (numwebcamRef.current?.video) {
  //       const camera = new window.Camera(numwebcamRef?.current?.video, {
  //         onFrame: async () => {
  //           await hands.send({ image: numwebcamRef?.current?.video });
  //         },
  //         width: 640,
  //         height: 480,
  //       });
  //       camera.start();
  //     }
  //   };

  //   loadMediaPipe();
  // }, [answered, index]);

  const speakQuestion = (letter) => {
    const utterance = new SpeechSynthesisUtterance(`Show the sign for the letter ${letter}`);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel(); // Stop any previous speech
    window.speechSynthesis.speak(utterance);
  };
  

  useEffect(() => {
    if (!completed) {
      // Speak immediately
      speakQuestion(quizData[index]?.letter);
  
      // Speak again after 5 seconds
      const timeoutId = setTimeout(() => {
        speakQuestion(quizData[index]?.letter);
      }, 5000);
  
      return () => clearTimeout(timeoutId); // Cleanup on unmount or next question
    }
  }, [index, completed]);
  
  


  return (
    <div className="signquiz-container">
      <h2>Sign Language Quiz</h2>
      {completed ? (
        <div className="completed">
          <h3>🎉 Quiz Completed!</h3>
          <p>Great job practicing your signs!</p>
        </div>
      ) : (
        <>
          <p className="question">
            Make the sign for the letter <strong>{quizData[index]?.letter}</strong>
          </p>
          <p className="timer">⏱️ Time Left: {timeLeft}s</p>
          <div className="video-container">
            <Webcam ref={numwebcamRef} style={{ display: "none" }} />
            <canvas ref={canvasnumRef} width="640" height="480" className="quiz-canvas" />
          </div>
          <p className={`feedback ${feedback.includes("Correct") ? "correct" : "wrong"}`}>
            {feedback}
          </p>
        </>
      )}
    </div>
  );
};

export default SignQuiz;
