import Bubble from "./Bubble";
import { BUBBLES } from "./data";
import logo from "./assets/logo.png";
import "./style.css";

export default function App() {
  const size = 1200;
  const center = size / 2;
  const bubbleDiameter = 300;
  const edgePadding = 20;
  const radius = center - bubbleDiameter / 2 - edgePadding;
  const startAngle = -Math.PI / 2;

  return (
    <div className="canvas" style={{ width: size, height: size }}>
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
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);

        return (
          <Bubble
            key={b.title}
            title={b.title}
            type={b.type}
            options={b.options}
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)"
            }}
          />
        );
      })}
    </div>
  );
}
