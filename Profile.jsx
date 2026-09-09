import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const [locationSharing, setLocationSharing] = useState(() => {
  const savedSetting = localStorage.getItem("locationSharing");

  return savedSetting === null
    ? true
    : savedSetting === "true";
});
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
            <span className="dashboard-label">ACCOUNT SETTINGS</span>
            <h1>Profile & Privacy</h1>
            <p>Manage your profile and safety preferences.</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Profile</h2>
            <p>Your SafeJourney account information.</p>
          </div>

          <div className="profile-card">
            <div className="profile-large-circle">S</div>

            <div>
              <h3>Shriraksha</h3>
              <p>SafeJourney user</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Privacy & Safety</h2>
            <p>Control how SafeJourney handles your safety information.</p>
          </div>

          <div className="privacy-card">
            <div>
              <h3>Location Sharing</h3>
              <p>
                Allow SafeJourney to use your current location during an active
                journey.
              </p>
            </div>

            <button
              className={`privacy-toggle ${
                locationSharing ? "enabled" : ""
              }`}
             onClick={() => {
  const newValue = !locationSharing;

  setLocationSharing(newValue);
  localStorage.setItem("locationSharing", String(newValue));
}}
            >
              {locationSharing ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div className="privacy-info-card">
            <h3>Your privacy matters</h3>
            <p>
              Location information is used to support journey monitoring and
              emergency safety features.
            </p>
          </div>
        </section>

        <Link to="/dashboard" className="secondary-btn">
          ← Back to Dashboard
        </Link>
      </main>
    </div>
  );
}

export default Profile;