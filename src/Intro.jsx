export default function Intro({ onStart }) {
  return (
    <div className="intro">
      <div className="intro-card" role="region" aria-label="PályaTérkép bevezető">
        <h1 className="intro-title">PályaTérkép</h1>
        <p className="intro-subtitle">Vizuális önismereti térkép az életpálya tervezéséhez</p>

        <p>
          A PályaTérkép egy ingyenesen használható, böngészőben elérhető felület,
          amely segít egyben látni mindazt, amit eddig önmagadról összegyűjtöttél.
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
          Tanácsadóknak és tanácskérőknek, akik egy vizuális eszközt keresnek a közös
          gondolkodás összegzéséhez.
        </p>

        <h2 className="intro-h2">Hogyan használhatod?</h2>
        <p>
          A PályaTérképet önállóan is elkezdheted kitölteni. Segít átlátni a már meglévő
          felismeréseidet, és láthatóvá teszi, hol vannak még kérdések.
        </p>
        <p>
          Tanácsadási helyzetben a tanácsadóval együtt kitöltve a térkép vizuálisan is
          összegzi a megbeszélt felismeréseket.
        </p>
        <p>
          Nem szükséges minden területet kitöltened. A kitöltés végén elmentheted a saját
          térképedet.
        </p>

        <div className="intro-actions">
          <button className="intro-button" type="button" onClick={onStart}>
            Kezdés
          </button>
        </div>
      </div>
    </div>
  );
}
