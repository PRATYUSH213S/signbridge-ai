import React from "react";
import "./Learn.css";

const Learn = () => {
  return (
    <div className="learn-page">
      {/* Hero Section */}
      <section className="learn-hero">
        <div className="hero-content">
          <h1>Start Learning Sign Language</h1>
          <p>Step into a world of communication beyond words. Interactive, visual, and fun learning modules await you!</p>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Learning Path</h2>
        <div className="path-grid">
          <div className="path-card">
            <h3>Beginner Level</h3>
            <p>Learn the basics of sign language including alphabet and daily gestures.</p>
            <button>Start Now</button>
          </div>
          <div className="path-card">
            <h3>Intermediate</h3>
            <p>Enhance your vocabulary and start understanding full sentences in sign.</p>
            <button>Explore</button>
          </div>
          <div className="path-card">
            <h3>Advanced</h3>
            <p>Master fluency, facial expressions and real-life conversations in sign language.</p>
            <button>Go Pro</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>What Makes Learning With Us Different?</h2>
        <div className="features-list">
          <div className="feature-box">
            <h4>Video-Based Lessons</h4>
            <p>Learn from native signers through high-quality videos and examples.</p>
          </div>
          <div className="feature-box">
            <h4>AI Sign Detection</h4>
            <p>Practice your signs using AI that gives real-time feedback on accuracy.</p>
          </div>
          <div className="feature-box">
            <h4>Gamified Quizzes</h4>
            <p>Test your skills with fun quizzes that make learning interactive and rewarding.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="learn-cta">
        <h2>Join Thousands of Learners</h2>
        <p>Sign up now and begin your journey towards fluent and expressive communication.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
};

export default Learn;