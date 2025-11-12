import React from "react";
import "./Beginner.css";

const BeginnerLearn = () => {
  return (
    <div className="beginner-page">
      {/* Header */}
      <section className="beginner-hero">
        <div className="beginner-hero-content">
          <h1>Beginner Sign Language</h1>
          <p>Let’s begin your sign language journey with the basics — alphabets, numbers, and daily expressions.</p>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="video-lessons">
        <h2>Video Demonstrations</h2>
        <p>Watch the signs in motion to understand hand shape, orientation, and movement.</p>
        <div className="video-grid">
          <div className="video-card">
            <h3>Sign Alphabet A-Z</h3>
            <iframe 
              width="100%" 
              height="250" 
              src="https://www.youtube.com/embed/DBQINq0SsAw" 
              title="Sign Alphabet A-Z"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-card">
            <h3>Numbers 1-20</h3>
            <iframe 
              width="100%" 
              height="250" 
              src="https://www.youtube.com/embed/6_gXiBe9y9A" 
              title="Numbers 1-20"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-card">
            <h3>Common Greetings</h3>
            <iframe 
              width="100%" 
              height="250" 
              src="https://www.youtube.com/embed/r9gCipM-wn0" 
              title="Common Greetings in Sign Language"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeginnerLearn;
