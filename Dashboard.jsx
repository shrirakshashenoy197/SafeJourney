import "../App.css";
import {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import LocationMap from "../components/LocationMap";


function Dashboard() {
    const [activeJourney,setActiveJourney]=useState(null);
    const [checkedIn, setCheckedIn] =
     useState(false);
     const [timeLeft, setTimeLeft] = useState(30*60);
     const [checkInMissed, setCheckInMissed] = useState(false);
     const [emergencyState, setEmergencyState] = useState(false);

     const[location,setLocation]=useState(null);
     const[locationError,setLocationError]=useState("");

  useEffect(() => {
  fetch("http://localhost:5000/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Backend connection failed:", error);
    });

  const savedJourney = localStorage.getItem("activeJourney");

  if (savedJourney) {
    setActiveJourney(JSON.parse(savedJourney));
  }
}, []);

useEffect(() => {
  if (!activeJourney || checkedIn) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [activeJourney,checkedIn]);

useEffect(() => {
  if (timeLeft === 0 && !checkedIn) {
    setCheckInMissed(true);
    setEmergencyState(true);
  }
}, [timeLeft, checkedIn]);

const handleGetLocation = () => {
  if (!navigator.geolocation) {
    setLocationError("Geolocation is not supported by your browser.");
    return;
  }

  setLocationError("");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const currentLocation = {
  latitude,
  longitude,
  updatedAt: new Date().toISOString()
};

setLocation(currentLocation);

localStorage.setItem(
  "currentLocation",
  JSON.stringify(currentLocation)
);

const savedJourney = localStorage.getItem("activeJourney");

if (savedJourney) {
  const journey = JSON.parse(savedJourney);

  journey.currentLocation = currentLocation;

  localStorage.setItem(
    "activeJourney",
    JSON.stringify(journey)
  );

  setActiveJourney(journey);
}
    },
    (error) => {
      console.error("Location error:", error);
      setLocationError("Unable to access your location.");
    }
  );
};
useEffect(() => {
  if (!activeJourney) return;

  const locationSharing =
    localStorage.getItem("locationSharing") !== "false";

  if (!locationSharing) return;

  const locationInterval = setInterval(() => {
    handleGetLocation();
  }, 30000);

  return () => clearInterval(locationInterval);
}, [activeJourney]);
   
  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="logo">
          <div className="logo-icon">✦</div>

          <span>
            Safe<span>Journey</span>
          </span>
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/journeys">My Journeys</Link>
          <Link to="/trusted-contacts">Trusted Contacts</Link>
        </div>

        <div className="dashboard-profile">
          <div className="profile-circle">
            S
          </div>
        </div>

      </nav>


      {/* Main Dashboard */}
      <main className="dashboard-container">

        {/* Welcome */}
        <section className="dashboard-welcome">

          <div>
            <span className="dashboard-label">
              SAFEJOURNEY DASHBOARD
            </span>

            <h1>
              Hello! Shriraksha.
            </h1>

            <p>
              Your safety overview for today.
            </p>
          </div>

         <Link to="/start-journey" className="start-journey-btn">
            + Start Journey
        </Link>

        </section>


        {/* Safety Status */}
        <section className="safety-status-card">

          <div className="safety-status-left">

            <div className="large-status-icon">
              ✓
            </div>

            <div>
              <span className="status-title">
                You're safe
              </span>
<h2>
  {activeJourney ? activeJourney.destination : "No active journey"}
</h2>

<p>
  {activeJourney
    ? `Your journey is currently ${activeJourney.status.toLowerCase()}.`
    : "Start a journey when you're ready to travel."}
</p>
            </div>

          </div>

          <div className="status-badge">
            ● Safe
          </div>

        </section>


        {/* Quick Actions */}
        <section className="dashboard-section">

          <div className="section-title">
            <h2>Quick actions</h2>

            <p>
              Access important safety tools quickly.
            </p>
          </div>

          <div className="quick-action-grid">

            <div
  className="dashboard-action-card"
  onClick={handleGetLocation}
>

  <div className="action-icon purple">
    📍
  </div>

  <h3>
    Live Location
  </h3>

  <p>
    {location
      ? "Your current location has been detected."
      : "Click to share your current location."}
  </p>

</div>

            <div
  className="dashboard-action-card"
  onClick={() => {
    if (activeJourney) {
      setCheckedIn(true);
      localStorage.setItem("journeyCheckedIn","true");
    }
  }}
>

  <div className="action-icon green">
    ✓
  </div>

  <h3>
    {checkedIn ? "Checked In" : "Check-in"}
  </h3>

  <p>
    {checkedIn
      ? "You have confirmed that you're safe."
      : activeJourney
      ? "Click to confirm that you're safe."
      : "Start a journey before checking in."}
  </p>

</div>


            <div className="dashboard-action-card">

              <div className="action-icon orange">
                👥
              </div>

              <h3>
                Trusted Contacts
              </h3>

              <p>
                Manage the people who can receive your alerts.
              </p>

            </div>


            <div className="dashboard-action-card emergency-action">

              <div className="action-icon red">
                !
              </div>

              <h3>
                Emergency SOS
              </h3>

              <p>
                Access emergency assistance when you need it.
              </p>

            </div>

          </div>

        </section>

        {location && (
  <div className="location-result">
    <strong>Current Location</strong>

    <p>
  Last updated:{" "}
  {location.updatedAt
    ? new Date(location.updatedAt).toLocaleTimeString()
    : "Not available"}
</p>

    <p>
      Latitude: {location.latitude}
    </p>

    <p>
      Longitude: {location.longitude}
    </p>

    <LocationMap
      latitude={location.latitude}
      longitude={location.longitude}
    />
  </div>
)}

        {locationError && (
          <p className="location-error">
            {locationError}
          </p>
        )}

        {/* Journey Section */}
        <section className="dashboard-section"></section>


        {/* Journey Section */}
        <section className="dashboard-section">

          <div className="section-title">
            <h2>Today's journey</h2>

            <p>
              Your active and recent journeys will appear here.
            </p>
          </div>

          {activeJourney ? (
  <div className="active-journey-card">

    {checkInMissed && (
  <div className="missed-checkin-warning">
    <strong>Check-in missed</strong>
    <p>
      You didn't confirm your safety before the timer expired.
    </p>
  </div>
)}
{emergencyState && (
  <div className="emergency-warning">
    <strong>Emergency state activated</strong>

    <p>
      Your check-in was missed. Trusted contacts should be alerted.
    </p>

    {activeJourney?.currentLocation ? (
      <div className="emergency-location">
        <strong>Last known location</strong>
        <p>
          Latitude: {activeJourney.currentLocation.latitude}
        </p>
        <p>
          Longitude: {activeJourney.currentLocation.longitude}
        </p>
        <p>
          Location updated at:{" "}
          {new Date(
            activeJourney.currentLocation.updatedAt
          ).toLocaleTimeString()}
        </p>
      </div>
    ) : (
      <p>Last known location is not available.</p>
    )}
  </div>
)}

    <div className="journey-card-header">
      <div>
        <p className="journey-label">ACTIVE JOURNEY</p>
        <h3>{activeJourney.destination}</h3>
      </div>

      <span className="journey-status">
        {activeJourney.status}
      </span>
    </div>

    <div className="journey-details">

      <div className="journey-detail">
  <span>Next Check-in</span>
  <strong>
    {Math.floor(timeLeft / 60)}:
    {String(timeLeft % 60).padStart(2, "0")}
  </strong>
</div>

      <div className="journey-detail">
        <span>Duration</span>
        <strong>{activeJourney.duration}</strong>
      </div>

      <div className="journey-detail">
        <span>Trusted Contact</span>
        <strong>{activeJourney.trustedContact}</strong>
      </div>

    </div>

    <div className="journey-progress">

      <div className="progress-step active">
  <span>{checkedIn ? "✓" : "●"}</span>
  <p>{checkedIn ? "Checked In" : "On Journey"}</p>
</div>

      <div className="progress-line"></div>

      <div className="progress-step">
        <span>○</span>
        <p>Completed</p>
      </div>

    
    </div>

<button
  className="complete-journey-btn"
  onClick={() => {
    const completedJourney = {
      ...activeJourney,
      status: "Completed",
      completedAt: new Date().toISOString(),
    };

    const existingHistory =
      JSON.parse(localStorage.getItem("journeyHistory")) || [];

    const updatedHistory = [
      ...existingHistory,
      completedJourney,
    ];

    localStorage.setItem(
      "journeyHistory",
      JSON.stringify(updatedHistory)
    );

    localStorage.removeItem("activeJourney");

    setActiveJourney(null);
    setCheckedIn(false);
    setCheckInMissed(false);
    setEmergencyState(false);
    setTimeLeft(30 * 60);
  }}
>
  ✓ Complete Journey
</button>



  </div>
) : (
  <div className="empty-journey-card">

    <div className="empty-journey-icon">
      ✦
    </div>

    <h3>No journey started yet</h3>

    <p>
      Create a safety journey to start proactive monitoring.
    </p>

    <Link to="/start-journey" className="secondary-btn">
      Create a Journey →
    </Link>

  </div>
)}

        </section>


        {/* Safety Tips */}
        <section className="safety-tip-card">

          <div className="tip-icon">
            💡
          </div>

          <div>
            <span>SAFETY TIP</span>

            <h3>
              Keep your trusted contacts updated.
            </h3>

            <p>
              Make sure someone you trust can be reached
              if your journey requires attention.
            </p>
          </div>

        </section>
<section className="dashboard-section">
  <div className="section-title">
    <h2>Emergency Resources</h2>
    <p>Quick access to help when you need it.</p>
  </div>

  <div className="emergency-resources-grid">
    <a href="tel:112" className="emergency-resource-card">
      <div className="action-icon red">!</div>
      <h3>Emergency</h3>
      <p>Call 112 for emergency assistance.</p>
    </a>

    <a href="tel:100" className="emergency-resource-card">
      <div className="action-icon purple">●</div>
      <h3>Police</h3>
      <p>Contact the police for immediate assistance.</p>
    </a>

    <a href="tel:108" className="emergency-resource-card">
      <div className="action-icon green">+</div>
      <h3>Ambulance</h3>
      <p>Request emergency medical assistance.</p>
    </a>
  </div>
</section>
      </main>

    </div>
  );
}

export default Dashboard;