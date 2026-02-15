import { useState } from "react";
import Bubble from "./Bubble";
import { BUBBLES } from "./data";
import logo from "./assets/logo.png";
import Intro from "./Intro";
import "./style.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const width = 1320;
  const height = 1200;
  const centerX = width / 2;
  const centerY = height / 2;
  const bubbleDiameter = 320;
  const edgePadding = 6;
  const baseRadiusX = centerX - bubbleDiameter / 2 - edgePadding;
  const baseRadiusY = centerY - bubbleDiameter / 2 - edgePadding;
  const radiusX = baseRadiusX;
  const radiusY = Math.round(baseRadiusY * 0.62);
  const startAngle = -Math.PI / 2;

  if (!started) {
    return <Intro onStart={() => setStarted(true)} />;
  }

  return (
    <div className="canvas-print">
      <div className="canvas" style={{ width, height }}>
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
            left: centerX,
            top: centerY,
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
          const x = centerX + radiusX * Math.cos(rad);
          const y = centerY + radiusY * Math.sin(rad);

          const shouldNudge =
            b.title === "Képességek" || b.title === "Egyéb fontos szempontok";

          const nudgeUp = 18;
          const nudgeIn = 8;
          const dx = x - centerX;
          const dy = y - centerY;
          const len = Math.hypot(dx, dy) || 1;

          const adjustedX = shouldNudge ? x - (dx / len) * nudgeIn : x;
          const adjustedY = shouldNudge ? y - (dy / len) * nudgeIn - nudgeUp : y;

          return (
            <Bubble
              key={b.title}
              title={b.title}
              type={b.type}
              options={b.options}
              tooltip={b.tooltip}
              style={{
                left: adjustedX,
                top: adjustedY,
                transform: "translate(-50%, -50%)"
              }}
            />
          );
        })}

        <div className="copyright" aria-label="Szerzői jogi nyilatkozat">
          © Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn.
        </div>
      </div>
    </div>
  );
}
