import { useState } from "react";
import Bubble from "./Bubble";
import { BUBBLES } from "./data";
import logo from "./assets/logo.png";
import Intro from "./Intro";
import "./style.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const size = 1200;
  const center = size / 2;
  const bubbleDiameter = 300;
  const edgePadding = 20;
  const radius = center - bubbleDiameter / 2 - edgePadding;
  const radiusX = radius;
  const radiusY = Math.round(radius * 0.78);
  const startAngle = -Math.PI / 2;

  if (!started) {
    return <Intro onStart={() => setStarted(true)} />;
  }

  return (
    <div className="canvas-print">
      <div className="canvas" style={{ width: size, height: size }}>
        <div className="print-box">
          <button
            className="print-button"
            type="button"
            onClick={() => window.print()}
            aria-label="Nyomtatás / Mentés PDF-be"
          >
            Nyomtatás / PDF
          </button>
        </div>

        <div className="name-box">
          <input
            className="name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Név…"
            aria-label="Név"
          />
        </div>

        {/* LOGO */}
        <div
          className="center"
          style={{
            position: "absolute",
            left: center,
            top: center,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="logo">
            <img src={logo} alt="PályaTérkép logo" />
          </div>
        </div>

        {/* BUBORÉKOK */}
        {BUBBLES.map((b, index) => {
          const rad = startAngle + (index * 2 * Math.PI) / BUBBLES.length;
          const x = center + radiusX * Math.cos(rad);
          const y = center + radiusY * Math.sin(rad);

          return (
            <Bubble
              key={b.title}
              title={b.title}
              type={b.type}
              options={b.options}
              tooltip={b.tooltip}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)"
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
