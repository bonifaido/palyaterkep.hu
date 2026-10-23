export default function LanguageSwitch({ language, onLanguageChange }) {
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
  )
}