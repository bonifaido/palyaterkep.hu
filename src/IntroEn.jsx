export default function IntroEn({ onStart }) {
  return (
    <div className="intro">
      <div className="intro-card" role="region" aria-label="Career Map introduction">
        <h1 className="intro-title">Career Map</h1>
        <h2 className="intro-subtitle">A Visual Self-Knowledge Tool for Career Guidance</h2>

        <p>Career Map is a free digital career guidance tool available in your browser.</p>
        <p>
          Planning your career can bring together many important insights about yourself,
          your experiences and your opportunities. Career Map helps you see them all in
          one clear, visual format. Step by step, you can fill your map with the qualities
          and thoughts that describe you. As you go, your own Career Map takes shape,
          showing:
        </p>
        <ul className="intro-list">
          <li>what interests you,</li>
          <li>what you are good at,</li>
          <li>what matters to you,</li>
          <li>how you like to work,</li>
          <li>what experiences you have,</li>
          <li>what resources and opportunities you can draw on,</li>
          <li>and anything else that is important about you.</li>
        </ul>

        <h2 className="intro-h2">Who is it for?</h2>
        <p>Individuals who want to organise their thoughts about themselves.</p>
        <p>Career advisers and their clients looking for a visual tool to summarise their discussions.</p>

        <h2 className="intro-h2">How do you use it?</h2>
        <ul className="intro-list">
          <li>Click <strong>Start</strong> at the bottom of the page to begin your Career Map.</li>
          <li>Enter your name or a nickname in the name field, or leave it blank.</li>
          <li>Go through the areas that are relevant to you and add the qualities, insights and experiences that describe you.</li>
          <li>In some areas you can choose from the options provided and add your own; in others you can express your thoughts freely.</li>
          <li>To remove an item you have added, click it.</li>
          <li>You do not need to fill in every field. Focus on what matters to you when planning your career.</li>
        </ul>
        <p>
          Important: your map is not saved automatically when you leave this page.
          Before you finish, save it as a PDF or print it. Click Print / PDF and
          choose landscape orientation in the print settings, then save or print your map.
        </p>
        <p>
          <strong><em>
            Career Map is designed primarily for computers. For the full experience,
            we recommend a desktop or laptop; use on mobile devices may be limited.
          </em></strong>
        </p>

        <div className="intro-actions">
          <button className="intro-button" type="button" onClick={onStart}>Start</button>
        </div>

        <section className="intro-announcements" aria-label="News">
          <p>
            PályaTérkép won third place in the Youth category of the 2026 Euroguidance Career Guidance Award.
          </p>
          <p>The Hungarian version is available at <a href="https://palyaterkep.hu/">palyaterkep.hu</a>.</p>
        </section>

        <p className="intro-privacy">
          <strong>Privacy:</strong> Career Map does not save or store the information and
          answers you enter. This site does not set cookies on your device.
        </p>
      </div>

      <div className="copyright copyright--fixed" aria-label="Copyright notice">
        © Careermap.hu – All rights reserved. Krácser‑Varga Adrienn.
      </div>
    </div>
  );
}
