import { useState, useEffect } from "react";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });
    const [bounce, setBounce] = useState(false); // 🎶 bounce trigger

    // Fetch events on load
    useEffect(() => {
        fetch("http://localhost:4000/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    // Add new event
    const addEvent = async () => {
        if (!newEvent.name.trim() || !newEvent.date.trim() || !newEvent.location.trim()) return;

        try {
            const response = await fetch("http://localhost:4000/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                const createdEvent = await response.json();
                setEvents([...events, createdEvent]);
                setNewEvent({ name: "", date: "", location: "" });

                // 🎺 Trigger bounce animation
                setBounce(true);
                setTimeout(() => setBounce(false), 600);
            } else {
                console.error("Failed to create event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    // Delete event
    const removeEvent = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/events/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEvents(events.filter((event) => event.id !== id));
            } else {
                console.error("Failed to delete event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
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
                    <div className={`form-inputs ${bounce ? "bounce" : ""}`} style={{ display: "grid", gap: "0.5rem", marginBottom: "1rem" }}>
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
                        {events.map((event) => (
                            <li
                                key={event.id}
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
                                    onClick={() => removeEvent(event.id)}
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
        

        /* 🎷 Bounce Animation */
        @keyframes bounceJazz {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-8px) rotate(-2deg); }
          50% { transform: translateY(4px) rotate(2deg); }
          75% { transform: translateY(-4px) rotate(-1deg); }
        }

        .bounce {
          animation: bounceJazz 0.6s ease;
        }
      `}</style>
            {/* Floating Beads */}
            <div className="beads">
                {Array.from({ length: 15 }).map((_, i) => {
                    const beadImages = [
                        "/task-manager/mardi-mask.webp",
                        "/task-manager/public/bead1.png",
                        "/task-manager/public/bead2.png"
                
                    ];
                    const beadSrc = beadImages[Math.floor(Math.random() * beadImages.length)];

                    return (
                        <img
                            key={i}
                            src={beadSrc}
                            alt="Mardi Gras beads"
                            className="bead"
                            style={{
                                top: `${Math.random() * 100}vh`,
                                left: `${Math.random() * 100}vw`,
                                animationDelay: `${Math.random() * 20}s`,
                                animationDuration: `${20 + Math.random() * 20}s`,
                            }}
                        />
                    );
                })}
            </div>

            <style>{`
  .beads {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
  }

  .bead {
    position: absolute;
    width: 60px;
    opacity: 0.85;
    animation: floatBeads linear infinite;
  }

  @keyframes floatBeads {
    from {
      transform: translateY(-10vh) rotate(0deg);
    }
    to {
      transform: translateY(110vh) rotate(360deg);
    }
  }
`}</style>

        </div>
    );
}
