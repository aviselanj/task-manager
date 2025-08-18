import { useState, useEffect } from "react";

export default function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!newEvent.name.trim() || !newEvent.date.trim() || !newEvent.location.trim()) return;
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ name: "", date: "", location: "" });
  };

  const removeEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Gradient Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #000000, #1a1a1a, #FFD700, #000000)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 20s ease infinite",
          zIndex: 0,
        }}
      />

      {/* Gold Stars */}
      <div className="stars" />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            width: "100%",
            background: "rgba(0,0,0,0.85)",
            border: "1px solid #FFD700",
            borderRadius: "12px",
            padding: "2rem",
            textAlign: "center",
            color: "#FFD700",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            ⚜️ New Orleans Event Planner ⚜️
          </h1>

          {/* Add Event Form */}
          <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #FFD700",
                background: "black",
                color: "white",
              }}
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #FFD700",
                background: "black",
                color: "white",
              }}
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #FFD700",
                background: "black",
                color: "white",
              }}
            />
          </div>

          <button
            onClick={addEvent}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#FFD700",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "1.5rem",
              color: "#000",
            }}
          >
            Add Event
          </button>

          {/* Events List */}
          <ul style={{ textAlign: "left" }}>
            {events.map((event, index) => (
              <li
                key={index}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  border: "1px solid #FFD700",
                  color: "#FFD700",
                }}
              >
                <strong>{event.name}</strong>
                <br />📅 {event.date}
                <br />📍 {event.location}
                <button
                  onClick={() => removeEvent(index)}
                  style={{
                    marginTop: "0.5rem",
                    background: "#FFD700",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.25rem 0.5rem",
                    cursor: "pointer",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
          background-size: 400px 400px;
          animation: moveStars 80s linear infinite;
          opacity: 0.7;
          filter: sepia(100%) hue-rotate(15deg) saturate(300%);
          z-index: 1;
        }

        @keyframes moveStars {
          from { transform: translate(0,0); }
          to { transform: translate(-400px, -400px); }
        }
      `}</style>
    </div>
  );
}
