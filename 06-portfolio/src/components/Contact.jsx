import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { profile, socials } from "../data";

export default function Contact() {
  const info = useScrollReveal();
  const box = useScrollReveal();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error || "Something went wrong.");

      form.reset();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (problem) {
      setError(problem.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-label">Contact</p>
        <h2 className="section-title">
          Let's build <span className="grad-text">something great</span>.
        </h2>
        <p className="section-intro">
          Have a project, a role, or just a question? Send a message and I'll get
          back to you.
        </p>

        <div className="contact__grid">
          <div ref={info} className="contact__info glass reveal">
            <h3>Get in touch</h3>
            <p>
              I'm currently open to freelance projects and full-time front-end
              roles. Tell me what you're building and what you need from the front
              end.
            </p>

            <dl className="contact__rows">
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Response time</dt>
                <dd>{profile.response}</dd>
              </div>
            </dl>

            <div className="contact__socials">
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
            </div>
          </div>

          <form ref={box} className="contact__form glass reveal" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required />
            </label>

            <label className="field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@company.com" required />
            </label>

            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                rows="5"
                placeholder="What would you like to build?"
                maxLength="5000"
                required
              ></textarea>
            </label>

            <input
              type="text"
              name="website"
              className="hp"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <button type="submit" className="contact__submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="contact__note contact__note--ok">
                Message sent — I'll reply to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="contact__note contact__note--bad">
                {error} You can also email me at{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            )}

            {status === "idle" && (
              <p className="contact__note">
                Goes straight to my inbox — no email app needed.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
