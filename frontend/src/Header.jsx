import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {
  const { isLoginSuccess, setisLoginSuccess } = props;
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("sign_userId");
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoginSuccess]);

  const handleLogout = () => {
    localStorage.removeItem("sign_userId");
    setisLoginSuccess(!isLoginSuccess);
    setIsLoggedIn(false);
    navigate("/"); // Go to homepage after logout
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">Signbridge-ai</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/video-learn">Video learn</Link>  
          {/* <Link to="/video-learn">Video learn</Link>
          <Link to="/alphabet">Learn Alphabets</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/about">About</Link> */}
          <Link to="/sign-kit/convert">Sign converter</Link>
          {!isLoggedIn ? (
            <>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
               <Link to="/quiz">Quiz</Link>
          <Link to="/alphabet">Learn Alphabets</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/about">About</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
