import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";

function StartJourney() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [trustedContact, setTrustedContact] = useState("");

  const [contacts, setContacts] = useState([]);

useEffect(() => {
  const savedContacts = localStorage.getItem("trustedContacts");

  if (savedContacts) {
    setContacts(JSON.parse(savedContacts));
  }
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const journey = {
      destination,
      duration,
      trustedContact,
      status: "On Journey",
      startedAt: new Date().toISOString()
    };

    localStorage.setItem("activeJourney", JSON.stringify(journey));

    navigate("/dashboard");
  };

  return (
    <div className="journey-page">
      <div className="journey-card">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <div className="journey-icon">
          🛡️
        </div>

        <h1>Start a Safe Journey</h1>

        <p className="journey-subtitle">
          Tell us about your journey so SafeJourney can help keep you protected.
        </p>

        <form className="journey-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Destination</label>

            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Expected journey duration</label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              <option value="">Select duration</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>3 hours</option>
              <option>4 hours</option>
              <option>5+ hours</option>
            </select>
          </div>

          <div className="form-group">
  <label>Trusted contact</label>

  <select
    value={trustedContact}
    onChange={(e) => setTrustedContact(e.target.value)}
    required
  >
    <option value="">Select a trusted contact</option>

    {contacts.map((contact, index) => (
      <option key={index} value={contact.name}>
        {contact.name}
      </option>
    ))}
  </select>
</div>

          <button type="submit" className="auth-submit">
            Start Journey →
          </button>

        </form>

      </div>
    </div>
  );
}

export default StartJourney;