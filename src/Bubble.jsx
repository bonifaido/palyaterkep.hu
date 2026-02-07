import { useState, useRef, useEffect } from "react";

export default function Bubble({ title, options, style }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const bubbleRef = useRef(null);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  // ⬇️ KATTINTÁS FIGYELÉS
  useEffect(() => {
    function handleClickOutside(e) {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bubble" style={style} ref={bubbleRef}>
      <h3 onClick={() => setOpen(o => !o)}>{title}</h3>

      {open && (
        <div className="dropdown">
          {options.map(opt => (
            <label key={opt}>
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      <div className="tags">
        {selected.map(item => (
          <span key={item} className="tag">{item}</span>
        ))}
      </div>
    </div>
  );
}
