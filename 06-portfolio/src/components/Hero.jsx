import { useEffect, useState } from "react";
import { heroFloats, heroIntro, heroStats, marquee, profile } from "../data";

const PHRASES = [
  "React & Next.js interfaces",
  "TypeScript-first codebases",
  "REST APIs wired properly",
  "Responsive on every screen",
];

function useTypewriter(phrases) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const full = phrases[index];
    const done = !erasing && text === full;
    const cleared = erasing && text === "";

    if (done) {
      const hold = setTimeout(() => setErasing(true), 1600);
      return () => clearTimeout(hold);
    }

    if (cleared) {
      const next = setTimeout(() => {
        setErasing(false);
        setIndex((now) => (now + 1) % phrases.length);
      }, 220);
      return () => clearTimeout(next);
    }

    const tick = setTimeout(
      () => setText(erasing ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      erasing ? 35 : 70,
    );

    return () => clearTimeout(tick);
  }, [text, erasing, index, phrases]);

  return text;
}

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const typed = useTypewriter(PHRASES);
  const showPhoto = profile.photo && !photoFailed;

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div>
          <span className="hero__badge glass">
            <span className="hero__dot"></span>
            Available for freelance &amp; full-time work
          </span>

          <h1 className="hero__title">
            Hi, I'm {profile.name} —<br />
            I build <span className="grad-text">fast, modern</span> web apps.
          </h1>

          <p className="hero__typed">
            <span className="grad-text">&gt;</span> {typed}
            <span className="hero__caret">|</span>
          </p>

          <p className="hero__intro">{heroIntro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">View Projects</a>
            <a className="btn btn--ghost" href="#contact">Get in Touch</a>
            {profile.resume && (
              <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
                View Resume ↗
              </a>
            )}
          </div>

          <div className="hero__stats">
            {heroStats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__ring"></div>

          <div className="hero__photo">
            {showPhoto ? (
              <img
                src={profile.photo}
                alt={profile.name}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <span className="hero__monogram">{profile.initials}</span>
            )}
          </div>

          {heroFloats.map((item, i) => (
            <span key={item} className={`hero__float hero__float--${i + 1} glass`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          {[...marquee, ...marquee].map((item, i) => (
            <span className="marquee__item" key={i}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
