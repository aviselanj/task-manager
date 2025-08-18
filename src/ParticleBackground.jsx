// src/ParticleBackground.jsx
import Particles from "react-tsparticles";

export default function ParticleBackground() {
    return (
        <Particles
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
            options={{
                background: { color: { value: "#0d0d0d" } },
                fpsLimit: 60,
                particles: {
                    number: { value: 100, density: { enable: true, area: 800 } },
                    color: { value: ["#ffffff", "#ffcc00", "#66ccff", "#ff6699"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.7, random: true },
                    size: { value: { min: 0.5, max: 3 }, random: true },
                    move: { enable: true, speed: 1, direction: "none", outModes: { default: "out" } },
                    links: { enable: false },
                },
                interactivity: {
                    events: { onHover: { enable: true, mode: "repulse" } },
                    modes: { repulse: { distance: 100, duration: 0.4 } },
                },
                detectRetina: true,
            }}
        />
    );
}
