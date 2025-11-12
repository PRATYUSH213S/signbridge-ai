import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import hero_img from "./assets/hello.png";
import why_img1 from "./assets/interactive.png";
import why_img2 from "./assets/ai-powered-support.png";
import why_img3 from "./assets/order-processed.png";
import partner1 from "./assets/on-fire.png";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}

      {/* Hero Section */}
      <section className="hero-section animate-fade-in">
        <div className="hero-content">
          <h2>Master Sign Language with AI</h2>
          <p>Interactive lessons, real-time hand recognition, and engaging quizzes.</p>
          <Link to="/video-learn" className="cta-button">Start Learning</Link>
        </div>
        <div className="hero-image">
          <img src={hero_img} alt="Sign Language Hero" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3 className="section-title">Why Choose SignLearn?</h3>
        <div className="features">
          <div className="feature-card animate-slide-up">
            <img src={why_img1} alt="Interactive Lessons" />
            <h4>Interactive Lessons</h4>
            <p>Step-by-step lessons with engaging visuals.</p>
          </div>
          <div className="feature-card animate-slide-up delay-1">
            <img src={why_img2} alt="Quizzes" />
            <h4>AI-Powered Quizzes</h4>
            <p>Practice using webcam-based sign detection.</p>
          </div>
          <div className="feature-card animate-slide-up delay-2">
            <img src={why_img3} alt="Progress Tracking" />
            <h4>Track Progress</h4>
            <p>Monitor your learning journey in real time.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <h3 className="section-title">How It Works</h3>
        <div className="steps">
          <div className="step animate-fade-in">
            <span>1</span>
            <h4>Sign Up</h4>
            <p>Create your free account to begin your journey.</p>
          </div>
          <div className="step animate-fade-in delay-1">
            <span>2</span>
            <h4>Learn & Practice</h4>
            <p>Use our interactive tools and camera-based detection.</p>
          </div>
          <div className="step animate-fade-in delay-2">
            <span>3</span>
            <h4>Test Yourself</h4>
            <p>Take quizzes and get instant feedback.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h3 className="section-title">FAQs</h3>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Is SignLearn free to use?</summary>
            <p>Yes! Most of our content is free, with optional premium features.</p>
          </details>
          <details className="faq-item">
            <summary>Do I need a webcam?</summary>
            <p>Yes, a webcam is needed for real-time sign recognition quizzes.</p>
          </details>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h3 className="section-title">Our Partners</h3>
        <div className="partner-cards">
          <div className="partner-card">
            <img src={partner1} alt="Partner 1" />
            <h4>EduTech Solutions</h4>
            <p>Helping us bring accessible education to everyone.</p>
          </div>
          <div className="partner-card">
            <img src={partner1} alt="Partner 2" />
            <h4>InnoAI Labs</h4>
            <p>AI technology partner powering our sign recognition engine.</p>
          </div>
          <div className="partner-card">
            <img src={partner1} alt="Partner 3" />
            <h4>Inclusive World</h4>
            <p>Promoting inclusivity through technology and awareness.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-columns">
          <div>
            <h4>About SignLearn</h4>
            <p>Empowering people to communicate through sign language using AI.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/learn">Learn</Link></li>
              <li><Link to="/quiz">Quiz</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul className="social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SignLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
