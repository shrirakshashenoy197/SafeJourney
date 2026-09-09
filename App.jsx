import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StartJourney from "./pages/startjourney";
import TrustedContacts from "./pages/TrustedContacts";
import Profile from "./pages/Profile";
import MyJourneys from "./pages/MyJourneys";

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>
            Safe<span>Journey</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#resources">Resources</a>
        </div>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </nav>

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            <span>●</span>
            Proactive personal safety
          </div>

          <h1>
            Your safety.
            <br />
            <span>Every journey.</span>
          </h1>

          <p>
            SafeJourney helps you stay connected and protected
            during your journeys with smart check-ins, live
            location sharing, and proactive emergency alerts.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Get Started →
            </button>

            <button className="secondary-btn">
              See How It Works
            </button>
          </div>

          <div className="trust-row">
            <div>
              <strong>100%</strong>
              <span>Free to build</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Safety monitoring</span>
            </div>

            <div>
              <strong>Privacy</strong>
              <span>First design</span>
            </div>
          </div>

        </div>

        {/* App Preview */}
        <div className="hero-visual">

          <div className="glow"></div>

          <div className="phone">

            <div className="phone-header">
              <div>
                <small>SafeJourney</small>
                <h3>Good morning</h3>
              </div>

              <div className="profile-circle">
                S
              </div>
            </div>

            <div className="status-card">

              <div>
                <span className="status-dot"></span>
                Journey Status
              </div>

              <strong>You're Safe</strong>

              <small>
                Ready to start your journey
              </small>

            </div>

            <div className="journey-card">

              <div className="journey-top">
                <span>Today's Journey</span>
                <span className="safe-label">
                  Safe
                </span>
              </div>

              <h3>
                Home → College
              </h3>

              <div className="journey-info">

                <div>
                  <small>Duration</small>
                  <strong>35 min</strong>
                </div>

                <div>
                  <small>Check-in</small>
                  <strong>Every 10 min</strong>
                </div>

              </div>

              <button className="start-journey">
                Start Journey
              </button>

            </div>

            <div className="quick-actions">

              <div className="action-card">
                <span>📍</span>
                <small>Live Location</small>
              </div>

              <div className="action-card">
                <span>⏱</span>
                <small>Check-in</small>
              </div>

              <div className="action-card">
                <span>👥</span>
                <small>Contacts</small>
              </div>

              <div className="action-card emergency">
                <span>!</span>
                <small>SOS</small>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="features" id="features">

        <div className="section-heading">

          <span>CORE FEATURES</span>

          <h2>
            Safety that works proactively.
          </h2>

          <p>
            SafeJourney doesn't wait for an emergency.
            It helps you stay safe throughout your journey.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon purple">
              ⌁
            </div>

            <h3>
              Safety Journey
            </h3>

            <p>
              Create a journey with your destination,
              duration and trusted contacts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              ✓
            </div>

            <h3>
              Smart Check-ins
            </h3>

            <p>
              Receive periodic reminders and confirm
              that you're safe.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange">
              !
            </div>

            <h3>
              Missed Check-in Detection
            </h3>

            <p>
              Detect missed responses and progressively
              escalate the situation.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon red">
              ⌖
            </div>

            <h3>
              Emergency Escalation
            </h3>

            <p>
              Notify trusted contacts when an emergency
              requires attention.
            </p>
          </div>

        </div>

      </section>

      {/* How It Works */}
      <section
        className="how-it-works"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Three simple steps.
          </h2>

        </div>

        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Create a journey
            </h3>

            <p>
              Set your destination, expected duration
              and trusted contacts.
            </p>

          </div>

          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Check in
            </h3>

            <p>
              Confirm your safety at scheduled intervals
              while you're travelling.
            </p>

          </div>

          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Get help if needed
            </h3>

            <p>
              If you don't respond, SafeJourney can
              progressively escalate the alert.
            </p>

          </div>

        </div>

      </section>

      {/* Final CTA */}
      <section className="final-cta">

        <div>

          <span>SAFEJOURNEY</span>

          <h2>
            Every journey deserves
            <br />
            a safer ending.
          </h2>

          <p>
            Built to make personal safety proactive,
            simple and accessible.
          </p>

          <button className="primary-btn">
            Get Started →
          </button>

        </div>

      </section>

      {/* Footer */}
      <footer>

        <div className="logo">

          <div className="logo-icon">
            ✦
          </div>

          <span>
            Safe<span>Journey</span>
          </span>

        </div>

        <p>
          Proactive personal safety platform
        </p>

      </footer>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup"element={<Signup/>}/>
      <Route path="/dashboard"element={<Dashboard/>}/>
      <Route path="/start-journey"element={<StartJourney/>}/>
      <Route path="/trusted-contacts" element={<TrustedContacts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/journeys" element={<MyJourneys />} />
    </Routes>
  );
}

export default App;