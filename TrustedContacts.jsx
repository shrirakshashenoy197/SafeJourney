import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function TrustedContacts() {
  const [showForm, setShowForm] = useState(false);

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("trustedContacts");

    return savedContacts
      ? JSON.parse(savedContacts)
      : [{ name: "Mom", phone: "" }];
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSaveContact = (e) => {
    e.preventDefault();

    if (!name || !phone) return;

    const newContact = {
      name,
      phone,
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);

    localStorage.setItem(
      "trustedContacts",
      JSON.stringify(updatedContacts)
    );

    setName("");
    setPhone("");
    setShowForm(false);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter(
      (_, contactIndex) => contactIndex !== index
    );

    setContacts(updatedContacts);

    localStorage.setItem(
      "trustedContacts",
      JSON.stringify(updatedContacts)
    );
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <nav className="dashboard-navbar">

        <div className="logo">
          <div className="logo-icon">✦</div>

          <span>
            Safe<span>Journey</span>
          </span>
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/journeys">Journeys</Link>
          <Link to="/trusted-contacts">Trusted Contacts</Link>
          <Link to="/profile">Profile & Privacy</Link>
        </div>

        <div className="dashboard-profile">
          <div className="profile-circle">
            S
          </div>
        </div>

      </nav>


      {/* Main Content */}
      <main className="dashboard-container">

        {/* Page Header */}
        <section className="dashboard-welcome">

          <div>
            <span className="dashboard-label">
              SAFETY SETTINGS
            </span>

            <h1>
              Trusted Contacts
            </h1>

            <p>
              People who can be notified if your journey needs attention.
            </p>
          </div>

          <button
            className="start-journey-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Contact"}
          </button>

        </section>


        {/* Add Contact Form */}
        {showForm && (
          <section className="trusted-contact-form-card">

            <div className="section-title">
              <h2>Add Trusted Contact</h2>

              <p>
                Add someone you trust to your safety network.
              </p>
            </div>

            <form
              className="trusted-contact-form"
              onSubmit={handleSaveContact}
            >

              <div className="form-group">
                <label>Contact name</label>

                <input
                  type="text"
                  placeholder="e.g. Mom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>


              <div className="form-group">
                <label>Phone number</label>

                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>


              <button
                type="submit"
                className="save-contact-btn"
              >
                Save Contact
              </button>

            </form>

          </section>
        )}


        {/* Contacts */}
        <section className="dashboard-section">

          <div className="section-title">
            <h2>Your trusted network</h2>

            <p>
              These people can be contacted when a journey requires attention.
            </p>
          </div>


          <div className="trusted-contacts-grid">

            {contacts.map((contact, index) => (

              <div
                className="trusted-contact-card"
                key={index}
              >

                <div className="trusted-contact-top">

                  <div className="trusted-contact-avatar">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{contact.name}</h3>

                    <span className="contact-status">
                      ● Active
                    </span>
                  </div>

                </div>


                <div className="trusted-contact-info">

                  <span>PHONE NUMBER</span>

                  <strong>
                    {contact.phone || "Phone number not added"}
                  </strong>

                </div>


                <div className="trusted-contact-actions">

                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="contact-call-btn"
                    >
                      Call
                    </a>
                  )}

                  <button
                    className="contact-delete-btn"
                    onClick={() => handleDeleteContact(index)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* Information Card */}
        <section className="trusted-contact-info-card">

          <div className="trusted-info-icon">
            !
          </div>

          <div>
            <h3>Why trusted contacts matter</h3>

            <p>
              SafeJourney can use your trusted contacts as part of
              the emergency escalation process when a journey
              check-in is missed.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default TrustedContacts;