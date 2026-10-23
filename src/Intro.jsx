export default function Intro({ onStart, language, onLanguageChange }) {
  const isEnglish = language === "en";
  const copy = isEnglish
    ? {
        subtitle: "A visual self-discovery map for career planning",
        opening: "PályaTérkép is a free digital career guidance tool available in your browser.",
        overview: "Career planning brings together many important insights about ourselves, our experiences, and our opportunities. PályaTérkép helps you see them all in one place and in a clear, visual format. Fill in the map step by step with the details and thoughts that are true for you. As you go, your personal map takes shape and shows:",
        interests: "what interests you",
        strengths: "what you are good at",
        values: "what matters to you",
        style: "how you like to work",
        experience: "what experience you have",
        resources: "which resources and opportunities you can draw on",
        other: "and anything else that is important about you",
        audience: "Who is it for?",
        selfGuided: "For anyone who wants to organize their thoughts about themselves.",
        advisors: "For advisors and people seeking guidance who want a visual tool to support and summarize a conversation.",
        use: "How to use it",
        start: <>Start filling in your map with the <strong>Start</strong> button at the bottom of this page.</>,
        name: "Enter your name or a nickname in the name field, or leave it blank.",
        areas: "Explore the areas that are relevant to you, and add the qualities, insights, and experiences that feel true.",
        choices: "In some areas, choose from suggested options or add your own. In others, write freely.",
        delete: "To remove an item you have added, click it.",
        optional: "You do not need to fill in every field. Focus on what feels important for your career planning.",
        saving: "Important: your map is not saved automatically when you leave the page. Before finishing, save it as a PDF or print it. Select the Print / PDF button, then choose landscape orientation in the print settings. You can then save the map as a PDF or print it directly.",
        desktop: "PályaTérkép is designed primarily for computers. For the full experience, we recommend a desktop or laptop. Use on a mobile phone may be limited.",
        begin: "Start",
        privacy: "Privacy: The information and answers you enter in PályaTérkép are not saved or stored by the system. The site does not place cookies on your device. We use Cloudflare Web Analytics, a cookie-free basic visitor statistics service that provides aggregated traffic data and does not identify individual users.",
        introLabel: "PályaTérkép introduction",
        copyrightLabel: "Copyright notice",
        copyright: "© Palyaterkep.hu – All rights reserved. Adrienn Krácser‑Varga."
      }
    : {
        subtitle: "Vizuális önismereti térkép az életpálya tervezéséhez",
        opening: "A PályaTérkép egy ingyenesen használható, böngészőben elérhető digitális pályaorientációs eszköz.",
        overview: "Az életpálya-tervezés során sokféle fontos információ és felismerés gyűlik össze önmagunkról, tapasztalatainkról és lehetőségeinkről. A PályaTérkép abban segít, hogy mindezeket egy helyen, átlátható és vizuális formában lásd. A térképet lépésről lépésre te töltheted meg a rád jellemző elemekkel és saját gondolataiddal. Ahogy haladsz, fokozatosan kirajzolódik a saját PályaTérképed, amely megmutatja:",
        interests: "mi érdekel",
        strengths: "miben vagy jó",
        values: "mi fontos számodra",
        style: "hogyan szeretsz dolgozni",
        experience: "milyen tapasztalataid vannak",
        resources: "milyen erőforrásokra és lehetőségekre támaszkodhatsz",
        other: "és mi az, ami még fontos rólad",
        audience: "Kinek szól?",
        selfGuided: "Önálló kitöltőknek, akik szeretnék rendszerezni a gondolataikat önmagukról.",
        advisors: "Tanácsadóknak és tanácskérőknek, akik egy vizuális eszközt keresnek a közös gondolkodás összegzéséhez.",
        use: "Hogyan használhatod?",
        start: <>A PályaTérkép kitöltését az oldal alján található <strong>Kezdés</strong> gombbal indíthatod el.</>,
        name: "A név mezőbe megadhatod a nevedet vagy egy becenevet, de üresen is hagyhatod.",
        areas: "Haladj végig a PályaTérkép számodra releváns területein, és írd be azokat a jellemzőket, felismeréseket és tapasztalatokat, amelyek igazak rád.",
        choices: "Egyes területeken előre megadott lehetőségek közül választhatsz, és saját választ is hozzáadhatsz, más részeken pedig teljesen szabadon fogalmazhatod meg a gondolataidat.",
        delete: "Ha egy már hozzáadott elemet törölni szeretnél, kattints arra az elemre, amelyet el szeretnél távolítani.",
        optional: "Nem szükséges minden mezőt kitöltened, elsősorban arra koncentrálj, amit fontosnak érzel az életpályád tervezése szempontjából.",
        saving: "Fontos: ha kilépsz az oldalról, a kitöltött térkép adatai nem kerülnek automatikusan mentésre, ezért a munka befejezése előtt mentsd el PDF-formátumban vagy nyomtasd ki. Ehhez kattints a Nyomtatás/PDF gombra, majd a megjelenő nyomtatási beállításoknál válaszd a fekvő tájolást. Ezután a térképet PDF-ként elmentheted vagy közvetlenül kinyomtathatod.",
        desktop: "A PályaTérkép elsősorban számítógépre készült. A teljes élményhez asztali gépet vagy laptopot javaslunk, mobilon a használat korlátozott lehet.",
        begin: "Kezdés",
        privacy: "Adatkezelés: A PályaTérképen megadott adatokat és válaszokat a rendszer nem menti és nem tárolja. Az oldal nem helyez el sütiket (cookie-kat) az eszközödön. A látogatottság méréséhez a Cloudflare süti nélküli, alapszintű látogatói statisztikáját (Cloudflare Web Analytics) használjuk, amely összesített forgalmi adatokat szolgáltat, és nem azonosít egyedi felhasználókat.",
        introLabel: "PályaTérkép bevezető",
        copyrightLabel: "Szerzői jogi nyilatkozat",
        copyright: "© Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn."
      };

  return (
    <div className="intro">
      <div className="intro-card" role="region" aria-label={copy.introLabel}>
        <div className="intro-header">
        <h1 className="intro-title">PályaTérkép</h1>
          <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
        </div>
        <h2 className="intro-subtitle">{copy.subtitle}</h2>

        <p>{copy.opening}</p>
        <p>{copy.overview}</p>

        <ul className="intro-list">
          <li>{copy.interests},</li>
          <li>{copy.strengths},</li>
          <li>{copy.values},</li>
          <li>{copy.style},</li>
          <li>{copy.experience},</li>
          <li>{copy.resources},</li>
          <li>{copy.other}.</li>
        </ul>

        <h2 className="intro-h2">{copy.audience}</h2>
        <p>{copy.selfGuided}</p>
        <p>{copy.advisors}</p>

        <h2 className="intro-h2">{copy.use}</h2>
        <ul className="intro-list">
          <li>{copy.start}</li>
          <li>{copy.name}</li>
          <li>{copy.areas}</li>
          <li>{copy.choices}</li>
          <li>{copy.delete}</li>
          <li>{copy.optional}</li>
        </ul>
        <p>{copy.saving}</p>
        <p>
          <strong><em>{copy.desktop}</em></strong>
        </p>

        <div className="intro-actions">
          <button className="intro-button" type="button" onClick={onStart}>
            {copy.begin}
          </button>
        </div>

        <p className="intro-privacy">
          <strong>{isEnglish ? "Privacy:" : "Adatkezelés:"}</strong> {copy.privacy.replace(/^(Privacy: |Adatkezelés: )/, "")}
        </p>
      </div>

      <div className="copyright copyright--fixed" aria-label={copy.copyrightLabel}>
        {copy.copyright}
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
