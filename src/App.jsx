import { useEffect, useState } from "react";
import Bubble from "./Bubble";
import { BUBBLES as HUNGARIAN_BUBBLES } from "./data";
import { BUBBLES as ENGLISH_BUBBLES } from "./data.en";
import logo from "./assets/logo.png";
import Intro from "./Intro";
import IntroEn from "./IntroEn";
import "./style.css";

const isEnglish = import.meta.env.VITE_SITE_LOCALE === "en";
const BUBBLES = isEnglish ? ENGLISH_BUBBLES : HUNGARIAN_BUBBLES;
const CANVAS_WIDTH = 1990;
const CANVAS_HEIGHT = 1220;
const BUBBLE_DIAMETER = 440;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const ORBIT_RADIUS_X = CENTER_X - BUBBLE_DIAMETER / 2 - 8;
const ORBIT_RADIUS_Y = CENTER_Y - BUBBLE_DIAMETER / 2 - 8;
const START_ANGLE = -Math.PI / 2;

function getEllipseAngles(count, radiusX, radiusY, startAngle) {
  const segments = 2048;
  const step = (2 * Math.PI) / segments;
  const lengths = [0];

  for (let index = 0; index < segments; index += 1) {
    const angle = startAngle + index * step;
    const speed = Math.hypot(radiusX * Math.sin(angle), radiusY * Math.cos(angle));
    lengths.push(lengths[index] + speed * step);
  }

  const perimeter = lengths[segments];

  return Array.from({ length: count }, (_, index) => {
    const targetLength = (index * perimeter) / count;
    let segment = 1;

    while (lengths[segment] < targetLength) {
      segment += 1;
    }

    const segmentLength = lengths[segment] - lengths[segment - 1];
    const fraction = (targetLength - lengths[segment - 1]) / segmentLength;
    return startAngle + (segment - 1 + fraction) * step;
  });
}

function getCanvasScale() {
  if (window.innerWidth <= 900) {
    return 1;
  }

  return Math.min(
    1,
    (window.innerWidth - 32) / CANVAS_WIDTH,
    (window.innerHeight - 32) / CANVAS_HEIGHT
  );
}

const BUBBLE_ANGLES = getEllipseAngles(
  BUBBLES.length,
  ORBIT_RADIUS_X,
  ORBIT_RADIUS_Y,
  START_ANGLE
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const [canvasScale, setCanvasScale] = useState(getCanvasScale);

  useEffect(() => {
    const handleResize = () => setCanvasScale(getCanvasScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!started) {
    const Introduction = isEnglish ? IntroEn : Intro;
    return <Introduction onStart={() => setStarted(true)} />;
  }

  return (
    <div
      className="canvas-print"
      style={{
        width: CANVAS_WIDTH * canvasScale,
        height: CANVAS_HEIGHT * canvasScale
      }}
    >
      <div
        className={`canvas${isEnglish ? " canvas--english" : ""}`}
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${canvasScale})`,
          "--content-scale": 1 / canvasScale
        }}
      >
        <div className="print-box">
          <button
            className="print-button"
            type="button"
            onClick={() => window.print()}
            aria-label={isEnglish ? "Print / Save as PDF" : "Nyomtatás / Mentés PDF-be"}
            title={isEnglish ? "Choose landscape orientation when printing!" : "Nyomtatáskor válaszd a fekvő tájolást!"}
          >
            {isEnglish ? "Print / PDF" : "Nyomtatás / PDF"}
          </button>
        </div>

        <div className="name-box">
          <input
            className="name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={isEnglish ? "Name…" : "Név…"}
            aria-label={isEnglish ? "Name" : "Név"}
          />
        </div>

        {/* LOGO */}
        <div
          className="center"
          style={{
            position: "absolute",
            left: CENTER_X,
            top: CENTER_Y,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className={`logo${isEnglish ? " logo--english" : ""}`}>
            {isEnglish ? (
              <>
                <div className="logo-symbol"><img src={logo} alt="" /></div>
                <span>Career Map</span>
              </>
            ) : <img src={logo} alt="PályaTérkép logo" />}
          </div>
        </div>

        {/* BUBORÉKOK */}
        {BUBBLES.map((b, index) => {
          const angle = BUBBLE_ANGLES[index];
          const x = CENTER_X + ORBIT_RADIUS_X * Math.cos(angle);
          const y = CENTER_Y + ORBIT_RADIUS_Y * Math.sin(angle);

          return (
            <Bubble
              key={b.title}
              title={b.title}
              type={b.type}
              options={b.options}
              tooltip={b.tooltip}
              isEnglish={isEnglish}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)"
              }}
            />
          );
        })}

        <div className="copyright" aria-label={isEnglish ? "Copyright notice" : "Szerzői jogi nyilatkozat"}>
          {isEnglish
            ? "© Careermap.hu – All rights reserved. Krácser‑Varga Adrienn."
            : "© Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn."}
        </div>
      </div>
    </div>
  );
}
