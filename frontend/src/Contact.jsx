import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section with Wave SVG */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact SignLearn</h1>
          <p>Let’s build a more inclusive world together. Reach out with your ideas, questions, or partnership proposals.</p>
        </div>
        <svg viewBox="0 0 1440 320" className="wave">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L80,154.7C160,149,320,139,480,149.3C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </section>

      {/* Contact Cards Section */}
      <section className="quick-contact">
        <div className="container">
          <div className="cards">
            <div className="card">
              <h3>Email</h3>
              <p>prat27703@gmail.com</p>
            </div>
            <div className="card">
              <h3>Phone</h3>
              <p>+91 7510002564</p>
            </div>
            <div className="card">
              <h3>Location</h3>
              <p>Ambedkar Nagar up , India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form with Illustration */}
      <section className="contact-form-illustration">
        <div className="container">
          <div className="form-illustration-wrapper">
            <div className="form-container">
              <h2>We'd love to hear from you</h2>
              <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Subject" required />
                <textarea placeholder="Message" rows="5" required></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
            <div className="illustration">
              <img src="https://cdn-icons-png.flaticon.com/512/1087/1087920.png" alt="Contact illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-follow">
        <div className="container">
          <h2>Stay Connected</h2>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;