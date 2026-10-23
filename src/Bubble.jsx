import { useState, useRef, useEffect } from "react";

export default function Bubble({ title, type, options = [], translatedOptions = [], language, style, tooltip, labels }) {
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
    if (e.key !== "Enter") return;
    const value = input.trim();
    if (!value) return;

    const optionIndex = options.findIndex((option, index) =>
      option.trim().toLowerCase() === value.toLowerCase() ||
      (language === "en" && translatedOptions[index]?.trim().toLowerCase() === value.toLowerCase())
    );

    if (optionIndex !== -1) {
      const existingOption = options[optionIndex];
      setSelected((prev) =>
        prev.includes(existingOption) ? prev : [...prev, existingOption]
      );
    } else {
      setSelected((prev) => {
        const alreadySelected = prev.some(
          (v) => v.trim().toLowerCase() === value.toLowerCase()
        );
        return alreadySelected ? prev : [...prev, value];
      });
    }

    setInput("");
  };

  return (
    <div
      className={`bubble${open ? " bubble--open" : ""}`}
      style={style}
      ref={ref}
      title={tooltip}
    >
      <div className="bubble-content">
        <h3 onClick={() => setOpen(o => !o)}>{title}</h3>

        {open && type === "select" && (
          <>
            <div className="dropdown">
              {options.map((opt, index) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                  {language === "en" ? translatedOptions[index] : opt}
                </label>
              ))}
            </div>

            <input
              className="free-input"
              placeholder={labels.otherPlaceholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={addFreeTag}
            />
          </>
        )}

        {open && type === "free" && (
          <input
            className="free-input"
            placeholder={labels.freePlaceholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={addFreeTag}
          />
        )}

        <div className="tags">
          {selected.map(item => (
            <button
              key={item}
              type="button"
              className="tag"
              onClick={() => toggle(item)}
              aria-label={`${labels.remove}: ${language === "en" && options.includes(item)
                ? translatedOptions[options.indexOf(item)]
                : item}`}
              title={labels.removeTitle}
            >
              {language === "en" && options.includes(item)
                ? translatedOptions[options.indexOf(item)]
                : item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
