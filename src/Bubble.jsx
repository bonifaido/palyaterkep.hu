export default function Bubble({
  title,
  type,
  options = [],
  style,
  tooltip,
  selected = [],
  input = "",
  onInput,
  onToggle,
  onAdd,
  onFocus,
  titleButtonRef,
  focused = false
}) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    onAdd();
  };

  return (
    <div
      className={`bubble${focused ? " bubble--focused" : ""}`}
      style={style}
      title={tooltip}
    >
      <div className="bubble-content">
        {focused ? (
          <h2 className="bubble-title">{title}</h2>
        ) : (
          <button
            className="bubble-title bubble-title-button"
            type="button"
            onClick={onFocus}
            ref={titleButtonRef}
            aria-label={`${title} téma megnyitása`}
          >
            {title}
          </button>
        )}

        {focused && tooltip && <p className="bubble-tooltip">{tooltip}</p>}

        {focused && type === "select" && (
          <>
            <div className="dropdown" aria-label={`${title} válaszlehetőségek`}>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => onToggle(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <input
              className="free-input"
              placeholder="Egyéb (ha nincs a listában) – írd be és Enter…"
              value={input}
              onChange={(event) => onInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </>
        )}

        {focused && type === "free" && (
          <input
            className="free-input"
            placeholder="Írj be egy kifejezést és Enter…"
            value={input}
            onChange={(event) => onInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        <div className="tags">
          {selected.map((item) => (
            <button
              key={item}
              type="button"
              className="tag"
              onClick={() => onToggle(item)}
              aria-label={`Törlés: ${item}`}
              title="Kattints a törléshez"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
