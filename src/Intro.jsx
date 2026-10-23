export default function Intro({ onStart }) {
  return (
    <div className="intro">
      <div className="intro-card" role="region" aria-label="PályaTérkép bevezető">
        <h1 className="intro-title">PályaTérkép</h1>
        <p className="intro-subtitle"><h2>Vizuális önismereti térkép az életpálya tervezéséhez</h2></p>

        <p>
          A PályaTérkép egy ingyenesen használható, böngészőben elérhető digitális pályaorientációs eszköz.
        </p>
        <p>
          Az életpálya-tervezés során sokféle fontos információ és felismerés gyűlik össze önmagunkról, tapasztalatainkról és lehetőségeinkről. A PályaTérkép abban segít, hogy mindezeket egy helyen, átlátható és vizuális formában lásd. A térképet lépésről lépésre te töltheted meg a rád jellemző elemekkel és saját gondolataiddal. Ahogy haladsz, fokozatosan kirajzolódik a saját PályaTérképed, amely megmutatja:
        </p>

        <ul className="intro-list">
          <li>mi érdekel,</li>
          <li>miben vagy jó,</li>
          <li>mi fontos számodra,</li>
          <li>hogyan szeretsz dolgozni,</li>
          <li>milyen tapasztalataid vannak,</li>
          <li>milyen erőforrásokra és lehetőségekre támaszkodhatsz,</li>
          <li>és mi az, ami még fontos rólad.</li>
        </ul>

        <h2 className="intro-h2">Kinek szól?</h2>
        <p>
          Önálló kitöltőknek, akik szeretnék rendszerezni a gondolataikat önmagukról.
        </p>
        <p>
          Tanácsadóknak és tanácskérőknek, akik egy vizuális eszközt keresnek a közös
          gondolkodás összegzéséhez.
        </p>

        <h2 className="intro-h2">Hogyan használhatod?</h2>
        <ul className="intro-list">
          <li>
            A PályaTérkép kitöltését az oldal alján található <strong>Kezdés</strong> gombbal indíthatod el.
          </li>
          <li>
            A név mezőbe megadhatod a nevedet vagy egy becenevet, de üresen is hagyhatod.
          </li>
          <li>
            Haladj végig a PályaTérkép számodra releváns területein, és írd be azokat a jellemzőket, felismeréseket és tapasztalatokat, amelyek igazak rád.
          </li>
          <li>
            Egyes területeken előre megadott lehetőségek közül választhatsz, és saját választ is hozzáadhatsz, más részeken pedig teljesen szabadon fogalmazhatod meg a gondolataidat.
          </li>
          <li>
            Ha egy már hozzáadott elemet törölni szeretnél, kattints arra az elemre, amelyet el szeretnél távolítani.
          </li>
          <li>
            Nem szükséges minden mezőt kitöltened, elsősorban arra koncentrálj, amit fontosnak érzel az életpályád tervezése szempontjából.
          </li>
        </ul>
        <p>
          Fontos: ha kilépsz az oldalról, a kitöltött térkép adatai nem kerülnek automatikusan mentésre, ezért a munka befejezése előtt mentsd el PDF-formátumban vagy nyomtasd ki. Ehhez kattints a Nyomtatás/PDF gombra, majd a megjelenő nyomtatási beállításoknál válaszd a fekvő tájolást. Ezután a térképet PDF-ként elmentheted vagy közvetlenül kinyomtathatod.
        </p>
        <p>
          <strong><em>
            A PályaTérkép elsősorban számítógépre készült. A teljes élményhez asztali
            gépet vagy laptopot javaslunk, mobilon a használat korlátozott lehet.
          </em></strong>
        </p>

        <div className="intro-actions">
          <button className="intro-button" type="button" onClick={onStart}>
            Kezdés
          </button>
        </div>

        <p className="intro-privacy">
          <strong>Adatkezelés:</strong> A PályaTérképen megadott adatokat és válaszokat a rendszer nem menti és nem tárolja. Az oldal nem helyez el sütiket (cookie-kat) az eszközödön. A látogatottság méréséhez a Cloudflare süti nélküli, alapszintű látogatói statisztikáját (Cloudflare Web Analytics) használjuk, amely összesített forgalmi adatokat szolgáltat, és nem azonosít egyedi felhasználókat.
        </p>
      </div>

      <div className="copyright copyright--fixed" aria-label="Szerzői jogi nyilatkozat">
        © Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn.
      </div>
    </div>
  );
}
