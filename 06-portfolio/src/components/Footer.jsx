import { profile, socials } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__brand">
              {profile.short}
              <span className="grad-text">.</span>
            </p>
            <p className="footer__blurb">
              {profile.role} — React, Next.js &amp; TypeScript. Building fast,
              accessible interfaces from {profile.location}.
            </p>
          </div>

          <nav className="footer__col">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>

          <nav className="footer__col">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
          </nav>

          <nav className="footer__col">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React &amp; Vite.</span>
        </div>
      </div>
    </footer>
  );
}
