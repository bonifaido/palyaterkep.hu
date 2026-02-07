import { useState, useRef, useEffect } from "react";

export default function Bubble({ title, type, options = [], style }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const addFreeTag = (e) => {
    if (e.key === "Enter" && input.trim()) {
      if (!selected.includes(input.trim())) {
        setSelected([...selected, input.trim()]);
      }
      setInput("");
    }
  };

  return (
    <div className="bubble" style={style} ref={ref}>
      <h3 onClick={() => setOpen(o => !o)}>{title}</h3>

      {open && type === "select" && (
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

      {open && type === "free" && (
        <input
          className="free-input"
          placeholder="Írj be egy kifejezést és Enter…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={addFreeTag}
        />
      )}

      <div className="tags">
        {selected.map(item => (
          <span key={item} className="tag">{item}</span>
        ))}
      </div>
    </div>
  );
}
