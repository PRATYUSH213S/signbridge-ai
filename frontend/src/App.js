import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import Learn from './Learn';
import BeginnerLearn from './BeginnerLearn';
import AlphabetSignTrainer from './AlphabetSignTrainer';
import Signup from './Signup';
import Login from './Login';
import Quiz from './Quiz';
import { useState } from 'react';
import SignQuiz from './SignQuiz';
import Convert from './page/Convert';
import NumberSignQuiz from './NumberSignQuiz';

function App() {

  const [isLoginSuccess, setisLoginSuccess] = useState(false);

  return (
    <div className="App">
     {/* <Home /> */}
<Header isLoginSuccess={isLoginSuccess} setisLoginSuccess={setisLoginSuccess} />
     {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/video-learn" element={<BeginnerLearn />} />
        <Route path="/alphabet" element={<AlphabetSignTrainer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login isLoginSuccess={isLoginSuccess} setisLoginSuccess={setisLoginSuccess} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/give-quiz" element={<SignQuiz />} />
        <Route path="/number-quiz" element={<NumberSignQuiz />} />
        <Route exact path='/sign-kit/convert' element={<Convert />} />
        
        {/* Add your other routes like Learn, Quiz etc */}
      </Routes>
    {/* </BrowserRouter> */}

    </div>
  );
}

export default App;
