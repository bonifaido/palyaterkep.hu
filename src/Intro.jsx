export default function Intro({ onStart }) {
  return (
    <div className="intro">
      <div className="intro-card" role="region" aria-label="PályaTérkép bevezető">
        <h1 className="intro-title">PályaTérkép</h1>
        <p className="intro-subtitle"><strong>Vizuális önismereti térkép az életpálya tervezéséhez</strong></p>

        <p>
          A PályaTérkép egy ingyenesen használható, böngészőben elérhető pályaorientációs felület.
        </p>

        <p>A kitöltés során egy személyes térképet készíthetsz magadról, amely megmutatja:</p>
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
        <p>
          Haladj végig a PályaTérkép számodra releváns területein, és írd be azokat a jellemzőket, felismeréseket és tapasztalatokat, amelyek igazak rád.
          Nem szükséges minden mezőt kitöltened, elsősorban arra koncentrálj, amit fontosnak érzel az életpályád tervezése szempontjából.
        </p>
        <p>
          Ha egy már hozzáadott elemet törölni szeretnél, kattints arra az elemre, amelyet el szeretnél távolítani.
        </p>
        <p>
          Fontos: ha kilépsz az oldalról, a kitöltött térkép nem marad meg automatikusan. Ezért a munka befejezése előtt mentsd el PDF-formátumban vagy nyomtasd ki.

          Kattints a Nyomtatás/PDF gombra.

          A megjelenő nyomtatási beállításoknál mindig válaszd a fekvő tájolást.

          Ezután a térképet PDF-ként elmentheted vagy kinyomtathatod.
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
      </div>

      <div className="copyright copyright--fixed" aria-label="Szerzői jogi nyilatkozat">
        © Palyaterkep.hu – Minden jog fenntartva. Krácser‑Varga Adrienn.
      </div>
    </div>
  );
}
