import useScrollReveal from "../hooks/useScrollReveal";
import useCountUp from "../hooks/useCountUp";
import { about, profile } from "../data";

function Stat({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);

  return (
    <div>
      <span ref={ref} className="about__value">
        {value}
        {suffix}
      </span>
      <span className="about__label">{label}</span>
    </div>
  );
}

export default function About() {
  const left = useScrollReveal();
  const right = useScrollReveal();

  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">About me</p>
        <h2 className="section-title">
          {about.heading[0]} <span className="grad-text">{about.heading[1]}</span>
          {about.heading[2]}
        </h2>

        <div className="about__grid">
          <div ref={left} className="about__card glass reveal">
            <p>
              I'm <strong>{profile.name}</strong>, {about.paragraphs[0]}
            </p>
            <p>{about.paragraphs[1]}</p>
            <p>{about.paragraphs[2]}</p>

            <div className="about__stats">
              {about.stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div ref={right} className="about__side glass reveal">
            <h3>What I focus on</h3>

            <ul className="about__focus">
              {about.focus.map((item) => (
                <li key={item}>
                  <span className="about__tick" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <dl className="about__meta">
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{profile.availability}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{profile.languages}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
