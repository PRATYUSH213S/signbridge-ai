import React from "react";
import "./About.css";
import partner1 from "./assets/on-fire.png";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section (Same Header Style as Home Page) */}
      <section className="about-hero">
        <h1>Learn. Express. Connect.</h1>
        <p>Empowering inclusive communication through sign language education.</p>
      </section>

      {/* Unique About Sections */}

      {/* Our Story Section */}
      <section className="about-story">
        <div className="container">
          <h2>Our Story</h2>
          <p>
            Born from a vision of inclusivity, Signbridge-ai was founded to bridge communication gaps and foster understanding between hearing and non-hearing communities. What started as a passion project has evolved into a robust platform for accessible, interactive sign language education.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="about-how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step-box">
              <span className="step-number">1</span>
              <h3>Create Your Account</h3>
              <p>Start your journey by registering on our platform.</p>
            </div>
            <div className="step-box">
              <span className="step-number">2</span>
              <h3>Choose a Course</h3>
              <p>Pick from a variety of levels and modules that suit your needs.</p>
            </div>
            <div className="step-box">
              <span className="step-number">3</span>
              <h3>Practice & Interact</h3>
              <p>Learn through interactive quizzes, videos, and real-time sign detection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="about-partners">
        <div className="container">
          <h2>Our Partners</h2>
          <div className="partner-grid">
            <div className="partner-card">
              <img src={partner1} alt="Partner 1" />
              <h4>Deaf Education India</h4>
              <p>Leading accessibility partner.</p>
            </div>
            <div className="partner-card">
              <img src={partner1} alt="Partner 2" />
              <h4>Inclusive Tech Labs</h4>
              <p>Technology enabler for sign detection.</p>
            </div>
            <div className="partner-card">
              <img src={partner1} alt="Partner 3" />
              <h4>Youth Connect</h4>
              <p>Student outreach and awareness collaborator.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <input type="checkbox" id="faq1" />
            <label htmlFor="faq1">Is this platform free to use?</label>
            <div className="faq-content">
              <p>Yes, our basic learning modules are free for everyone.</p>
            </div>
          </div>
          <div className="faq-item">
            <input type="checkbox" id="faq2" />
            <label htmlFor="faq2">Can I track my progress?</label>
            <div className="faq-content">
              <p>Yes, you can track learning progress, completed quizzes, and performance.</p>
            </div>
          </div>
          <div className="faq-item">
            <input type="checkbox" id="faq3" />
            <label htmlFor="faq3">How can I contribute to the platform?</label>
            <div className="faq-content">
              <p>You can join as a content creator or developer to enhance the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-vision">
        <div className="container">
          <h2>Our Vision</h2>
          <p>
            We dream of a world where sign language is celebrated and understood by all. Signbridge-ai is dedicated to this vision, combining technology and community to build a more inclusive society.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
