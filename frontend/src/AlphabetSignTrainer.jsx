import React, { useEffect, useState, useRef } from "react";
import "./AlphabetSignTrainer.css";

import letter_A from "./assets/A.png";
import letter_B from "./assets/B.png";
import letter_C from "./assets/C.png";
import letter_D from "./assets/D.png";
import letter_E from "./assets/E.png";
import letter_F from "./assets/F.png";
import letter_G from "./assets/G.png";
import letter_H from "./assets/H.png";
import letter_I from "./assets/I.png";
import letter_J from "./assets/J.png";
import letter_K from "./assets/K.png";
import letter_L from "./assets/L.png";

import letter_M from "./assets/M.png";
import letter_N from "./assets/N.png";
import letter_O from "./assets/O.png";
import letter_P from "./assets/P.png";
import letter_Q from "./assets/Q.png";
import letter_R from "./assets/R.png";
import letter_S from "./assets/S.png";
import letter_T from "./assets/T.png";
import letter_U from "./assets/U.png";
import letter_V from "./assets/V.png";
import letter_W from "./assets/W.png";
import letter_X from "./assets/X.png";
import letter_Y from "./assets/Y.png";
import letter_Z from "./assets/Z.png";


const alphabetInstructions = [
  { letter: "A", instruction: "Make a fist with your thumb resting on the side of the index finger.", image: letter_A },
  { letter: "B", instruction: "Hold your fingers straight up together and thumb across your palm.", image: letter_B },
  { letter: "C", instruction: "Curve your hand like you're holding a cup.", image: letter_C },
  { letter: "D", instruction: "Touch your thumb to the tips of your middle, ring, and pinky fingers while your index finger points straight up.", image: letter_D },
  { letter: "E", instruction: "Curl your fingers to your palm with your thumb pressing against them.", image: letter_E },
  { letter: "F", instruction: "Make an OK sign by touching your index finger to your thumb.", image: letter_F },
  { letter: "G", instruction: "Hold your index finger and thumb sideways pointing outward.", image: letter_G },
  { letter: "H", instruction: "Hold your index and middle fingers together, pointing outward.", image: letter_H },
  { letter: "I", instruction: "Raise your pinky finger while making a fist.", image: letter_I },
  { letter: "J", instruction: "Draw a 'J' in the air using your pinky.", image: letter_J },
  { letter: "K", instruction: "Raise index and middle fingers while placing thumb between them.", image: letter_K },
  { letter: "L", instruction: "Make an L-shape with your thumb and index finger.", image: letter_L },
  { letter: "M", instruction: "Place your thumb under the first three fingers.", image: letter_M },
  { letter: "N", instruction: "Tuck your thumb under the first two fingers.", image: letter_N },
  { letter: "O", instruction: "Form an O shape using all fingers touching.", image: letter_O },
  { letter: "P", instruction: "Make a K shape and point it downward.", image: letter_P },
  { letter: "Q", instruction: "Pinch your thumb and index finger, pointing them downward.", image: letter_Q },
  { letter: "R", instruction: "Cross your index and middle fingers.", image: letter_R },
  { letter: "S", instruction: "Make a fist with thumb over fingers.", image: letter_S },
  { letter: "T", instruction: "Tuck your thumb under your index finger.", image: letter_T },
  { letter: "U", instruction: "Hold up index and middle fingers together.", image: letter_U },
  { letter: "V", instruction: "Hold up index and middle fingers apart like a V.", image: letter_V },
  { letter: "W", instruction: "Raise index, middle, and ring fingers.", image: letter_W },
  { letter: "X", instruction: "Bend your index finger like a hook.", image: letter_X },
  { letter: "Y", instruction: "Raise your thumb and pinky while keeping others folded.", image: letter_Y },
  { letter: "Z", instruction: "Use your index finger to draw a Z in the air.", image: letter_Z },
];



const AlphabetSignTrainer = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingCount, setSpeakingCount] = useState(0);
  const speechRef = useRef(null);

  useEffect(() => {
    if (index < alphabetInstructions.length && !isPaused) {
      const current = alphabetInstructions[index];
      const msg = new SpeechSynthesisUtterance(
        `Make the sign for letter ${current.letter}. ${current.instruction}`
      );
      msg.rate = 0.8; // slower speech
      speechRef.current = msg;

      msg.onend = () => {
        if (speakingCount < 1) {
          setSpeakingCount(1);
        } else {
          setSpeakingCount(0);
          setTimeout(() => {
            setIndex((prev) => prev + 1);
          }, 2000);
        }
      };

      window.speechSynthesis.speak(msg);
    }
  }, [index, isPaused, speakingCount]);

//   const togglePause = () => {
//     if (window.speechSynthesis.speaking) {
//       if (!isPaused) {
//         window.speechSynthesis.pause();
//         setIsPaused(true);
//       } else {
//         window.speechSynthesis.resume();
//         setIsPaused(false);
//       }
//     }
//   };

const togglePause = () => {
    if (!isPaused) {
      window.speechSynthesis.cancel();
      setIsPaused(true);
    } else {
      const current = alphabetInstructions[index];
      const msg = new SpeechSynthesisUtterance(
        `Make the sign for letter ${current.letter}. ${current.instruction}`
      );
      msg.rate = 0.8;
  
      msg.onend = () => {
        if (speakingCount < 1) {
          setSpeakingCount(1);
        } else {
          setSpeakingCount(0);
          setTimeout(() => {
            setIndex((prev) => prev + 1);
          }, 2000);
        }
      };
  
      window.speechSynthesis.speak(msg);
      setIsPaused(false);
    }
  };
  

  if (index >= alphabetInstructions.length) {
    return (
      <div className="alphabet-trainer">
        <h1>Great Job!</h1>
        <p>You've completed the alphabet sign practice!</p>
      </div>
    );
  }

  const current = alphabetInstructions[index];

  return (
    <div className="alphabet-trainer-container">
      <h1>Sign Language Practice</h1>
      <div className="trainer-layout">
        <div className="alphabet-grid">
          {alphabetInstructions.map((item, i) => (
            <div
              key={item.letter}
              className={`alphabet-card ${i === index ? "active" : ""}`}
              onClick={() => {
                setIsPaused(true);
                setIndex(i);
              }}
            >
              {item.letter}
            </div>
          ))}
        </div>
  
        <div className="main-content">
          <div className="instruction-box">
            <h2>Letter: {current.letter}</h2>
            <p>{current.instruction}</p>
            <img
              src={current.image}
              alt={`Sign for ${current.letter}`}
              className="sign-image"
            />
          </div>
          <button className="pause-btn" onClick={togglePause}>
            {isPaused ? "Resume" : "Pause"} Speech
          </button>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default AlphabetSignTrainer;
