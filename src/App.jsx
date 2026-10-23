import { useEffect, useState } from "react";
import Bubble from "./Bubble";
import { BUBBLES } from "./data";
import { BUBBLES_EN } from "./data.en";
import logo from "./assets/logo.png";
import Intro from "./Intro";
import "./style.css";

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
  const [language, setLanguage] = useState("hu");
  const [userName, setUserName] = useState("");
  const [canvasScale, setCanvasScale] = useState(getCanvasScale);

  useEffect(() => {
    const handleResize = () => setCanvasScale(getCanvasScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  if (!started) {
    return <Intro onStart={() => setStarted(true)} language={language} onLanguageChange={setLanguage} />;
  }

  const copy = language === "en"
    ? {
        print: "Print / PDF",
        printTitle: "Choose landscape orientation in the print settings",
        name: "Name...",
        nameLabel: "Name",
        copyrightLabel: "Copyright notice",
        copyright: "© Palyaterkep.hu – All rights reserved. Adrienn Krácser‑Varga.",
        otherPlaceholder: "Other (if not listed) – type and press Enter...",
        freePlaceholder: "Type a phrase and press Enter...",
        remove: "Remove",
        removeTitle: "Click to remove"
      }
    : {
        print: "Nyomtatás / PDF",
        printTitle: "Nyomtatáskor válaszd a fekvő tájolást!",
        name: "Név…",
        nameLabel: "Név",
        copyrightLabel: "Szerzői jogi nyilatkozat",
        copyright: "© Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn.",
        otherPlaceholder: "Egyéb (ha nincs a listában) – írd be és Enter…",
        freePlaceholder: "Írj be egy kifejezést és Enter…",
        remove: "Törlés",
        removeTitle: "Kattints a törléshez"
      };

  const labels = {
    otherPlaceholder: copy.otherPlaceholder,
    freePlaceholder: copy.freePlaceholder,
    remove: copy.remove,
    removeTitle: copy.removeTitle
  };

  return (
    <div
      className="canvas-print"
      style={{
        width: CANVAS_WIDTH * canvasScale,
        height: CANVAS_HEIGHT * canvasScale
      }}
    >
      <div
        className="canvas"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${canvasScale})`,
          "--content-scale": 1 / canvasScale
        }}
      >
        <div className="print-box">
          <LanguageSwitch language={language} onLanguageChange={setLanguage} />
          <button
            className="print-button"
            type="button"
            onClick={() => window.print()}
            aria-label={copy.print}
            title={copy.printTitle}
          >
            {copy.print}
          </button>
        </div>

        <div className="name-box">
          <input
            className="name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={copy.name}
            aria-label={copy.nameLabel}
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
          <div className="logo">
            <img src={logo} alt="PályaTérkép logo" />
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
              title={language === "en" ? BUBBLES_EN[index].title : b.title}
              type={b.type}
              options={b.options}
              translatedOptions={BUBBLES_EN[index].options}
              language={language}
              tooltip={language === "en" ? BUBBLES_EN[index].tooltip : b.tooltip}
              labels={labels}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)"
              }}
            />
          );
        })}

        <div className="copyright" aria-label={copy.copyrightLabel}>
          {copy.copyright}
        </div>
      </div>
    </div>
  );
}

function LanguageSwitch({ language, onLanguageChange }) {
  return (
    <div className="language-switch" role="group" aria-label={language === "en" ? "Language" : "Nyelv"}>
      {["hu", "en"].map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? "language-option language-option--active" : "language-option"}
          aria-pressed={language === option}
          onClick={() => onLanguageChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
