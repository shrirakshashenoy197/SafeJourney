import "../App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MyJourneys() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const savedJourneys =
      JSON.parse(localStorage.getItem("journeyHistory")) || [];

    setJourneys(savedJourneys);
  }, []);

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>
            Safe<span>Journey</span>
          </span>
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/start-journey">Start Journey</Link>
          <Link to="/trusted-contacts">Trusted Contacts</Link>
          <Link to="/profile">Profile & Privacy</Link>
        </div>

        <div className="dashboard-profile">
          <div className="profile-circle">S</div>
        </div>
      </nav>

      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-label">JOURNEY HISTORY</span>
            <h1>My Journeys</h1>
            <p>View your previous SafeJourney trips.</p>
          </div>

          <Link to="/start-journey" className="start-journey-btn">
            + Start Journey
          </Link>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Journey History</h2>
            <p>Your completed and active journeys.</p>
          </div>

          {journeys.length === 0 ? (
            <div className="empty-journeys">
              <div className="empty-journey-icon">🛡️</div>
              <h3>No journeys yet</h3>
              <p>
                Start your first SafeJourney and it will appear here.
              </p>

              <Link to="/start-journey" className="auth-submit">
                Start Your First Journey →
              </Link>
            </div>
          ) : (
            <div className="journey-history-list">
              {journeys.map((journey, index) => (
                <div className="journey-history-card" key={index}>
                  <div>
                    <span className="journey-history-label">
                      {journey.status}
                    </span>

                    <h3>{journey.destination}</h3>

                    <p>
                      Duration: {journey.duration}
                    </p>

                    <p>
                      Started:{" "}
                      {journey.startedAt
                        ? new Date(journey.startedAt).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>

                  <div className="journey-history-status">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MyJourneys;