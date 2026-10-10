import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Bubble from "./Bubble";
import { BUBBLES } from "./data";
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

export default function App({ startImmediately = false }) {
  const [started, setStarted] = useState(startImmediately);
  const [userName, setUserName] = useState("");
  const [canvasScale, setCanvasScale] = useState(getCanvasScale);
  const [activeIndex, setActiveIndex] = useState(null);
  const [answers, setAnswers] = useState(() =>
    BUBBLES.map(() => ({ selected: [], input: "" }))
  );
  const titleButtons = useRef([]);
  const closeButton = useRef(null);
  const previousActiveIndex = useRef(null);

  const updateAnswer = (index, update) => {
    setAnswers((current) =>
      current.map((answer, answerIndex) =>
        answerIndex === index ? { ...answer, ...update(answer) } : answer
      )
    );
  };

  const toggleAnswer = (index, item) => {
    updateAnswer(index, ({ selected }) => ({
      selected: selected.includes(item)
        ? selected.filter((value) => value !== item)
        : [...selected, item]
    }));
  };

  const addAnswer = (index, options) => {
    updateAnswer(index, ({ input, selected }) => {
      const value = input.trim();
      if (!value) return {};

      const existingOption = options.find(
        (option) => option.trim().toLowerCase() === value.toLowerCase()
      );
      const newValue = existingOption ?? value;
      const alreadySelected = selected.some(
        (item) => item.trim().toLowerCase() === newValue.toLowerCase()
      );

      return {
        selected: alreadySelected ? selected : [...selected, newValue],
        input: ""
      };
    });
  };

  const closeCarousel = () => {
    const closedIndex = activeIndex;
    setActiveIndex(null);
    requestAnimationFrame(() => titleButtons.current[closedIndex]?.focus());
  };

  useEffect(() => {
    const handleResize = () => setCanvasScale(getCanvasScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      previousActiveIndex.current = null;
      return undefined;
    }

    if (previousActiveIndex.current === null) {
      closeButton.current?.focus();
    }
    previousActiveIndex.current = activeIndex;

    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        const closedIndex = activeIndex;
        setActiveIndex(null);
        requestAnimationFrame(() => titleButtons.current[closedIndex]?.focus());
        return;
      }

      const targetIsEditable = ["INPUT", "TEXTAREA", "SELECT"].includes(
        event.target.tagName
      );

      if (event.key === "Tab") {
        const focusableItems = document.querySelectorAll(
          ".carousel-panel button:not(:disabled), .carousel-panel input:not(:disabled)"
        );
        const firstItem = focusableItems[0];
        const lastItem = focusableItems[focusableItems.length - 1];

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem?.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem?.focus();
        }
        return;
      }

      if (targetIsEditable) return;

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % BUBBLES.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          (current - 1 + BUBBLES.length) % BUBBLES.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  if (!started) {
    return <Intro onStart={() => setStarted(true)} />;
  }

  return (
    <div
      className="canvas-print"
      aria-hidden={activeIndex !== null}
      inert={activeIndex !== null}
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
          <button
            className="print-button"
            type="button"
            onClick={() => window.print()}
            aria-label="Nyomtatás / Mentés PDF-be"
            title="Nyomtatáskor válaszd a fekvő tájolást!"
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
            left: CENTER_X,
            top: CENTER_Y,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="logo">
            <img src={logo} alt="PályaTérkép logo" />
          </div>
        </div>

        <div
          className={`map-layer${activeIndex !== null ? " map-layer--inactive" : ""}`}
          aria-hidden={activeIndex !== null}
          inert={activeIndex !== null}
        >
          {BUBBLES.map((bubble, index) => {
            const angle = BUBBLE_ANGLES[index];
            const x = CENTER_X + ORBIT_RADIUS_X * Math.cos(angle);
            const y = CENTER_Y + ORBIT_RADIUS_Y * Math.sin(angle);
            const answer = answers[index];

            return (
              <Bubble
                key={bubble.title}
                title={bubble.title}
                type={bubble.type}
                options={bubble.options}
                tooltip={bubble.tooltip}
                selected={answer.selected}
                input={answer.input}
                onInput={(value) => updateAnswer(index, () => ({ input: value }))}
                onToggle={(item) => toggleAnswer(index, item)}
                onAdd={() => addAnswer(index, bubble.options ?? [])}
                onFocus={() => setActiveIndex(index)}
                titleButtonRef={(element) => {
                  titleButtons.current[index] = element;
                }}
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)"
                }}
              />
            );
          })}
        </div>

        {activeIndex !== null && createPortal(
          <div
            className="carousel-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeCarousel();
            }}
          >
            <section
              className="carousel-panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${BUBBLES[activeIndex].title} téma`}
            >
              <header className="carousel-header">
                <p className="carousel-count">
                  {activeIndex + 1} / {BUBBLES.length}
                </p>
                <button
                  className="carousel-close"
                  type="button"
                  onClick={closeCarousel}
                  ref={closeButton}
                  aria-label="Vissza a térképhez"
                  title="Vissza a térképhez (Escape)"
                >
                  ×
                </button>
              </header>

              <div className="carousel-stage" key={activeIndex}>
                <Bubble
                  title={BUBBLES[activeIndex].title}
                  type={BUBBLES[activeIndex].type}
                  options={BUBBLES[activeIndex].options}
                  tooltip={BUBBLES[activeIndex].tooltip}
                  selected={answers[activeIndex].selected}
                  input={answers[activeIndex].input}
                  onInput={(value) =>
                    updateAnswer(activeIndex, () => ({ input: value }))
                  }
                  onToggle={(item) => toggleAnswer(activeIndex, item)}
                  onAdd={() =>
                    addAnswer(activeIndex, BUBBLES[activeIndex].options ?? [])
                  }
                  focused
                />
              </div>

              <footer className="carousel-controls">
                <button
                  className="carousel-nav"
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex - 1 + BUBBLES.length) % BUBBLES.length)
                  }
                  aria-label={`Előző téma: ${BUBBLES[(activeIndex - 1 + BUBBLES.length) % BUBBLES.length].title}`}
                >
                  <span aria-hidden="true">←</span> Előző
                </button>
                <p className="carousel-topic">{BUBBLES[activeIndex].title}</p>
                <button
                  className="carousel-nav"
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % BUBBLES.length)}
                  aria-label={`Következő téma: ${BUBBLES[(activeIndex + 1) % BUBBLES.length].title}`}
                >
                  Következő <span aria-hidden="true">→</span>
                </button>
              </footer>
            </section>
          </div>,
          document.body
        )}

        <div className="copyright" aria-label="Szerzői jogi nyilatkozat">
          © Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn.
        </div>
      </div>
    </div>
  );
}
