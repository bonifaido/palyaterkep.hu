import Bubble from "./Bubble";
import { DATA } from "./data";
import "./style.css";
import logo from "./assets/logo.png";

const bubbles = [
  { title: "Érdeklődés", angle: 300 },
  { title: "Képesség", angle: 220 },
  { title: "Érték", angle: 140 },
  { title: "Munkamód", angle: 60 }
];

export default function App() {
  const radius = 340;   // ⬅️ nagyobb kör
  const center = 500;   // ⬅️ nagyobb vászon

  return (
    <div className="canvas">

      <div className="center">
        <div className="logo">
          <img src={logo} alt="PályaTérkép logo" />
        </div>
      </div>

      {bubbles.map(b => {
        const rad = b.angle * Math.PI / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);

        return (
          <Bubble
            key={b.title}
            title={b.title}
            options={DATA[b.title]}
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
