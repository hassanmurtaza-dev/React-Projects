import useScrollReveal from "../hooks/useScrollReveal";
import { services } from "../data";

const ICONS = ["◈", "⇄", "🔒", "▭"];

function Service({ service, icon }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="service glass reveal">
      <span className="service__icon" aria-hidden="true">{icon}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>

      <div className="pills">
        {service.tags.map((tag) => (
          <span className="pill" key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <p className="section-label">What I do</p>
        <h2 className="section-title">
          Services built around a <span className="grad-text">modern front-end stack</span>.
        </h2>
        <p className="section-intro">
          From a Figma file to a deployed, authenticated, API-connected app — here is
          where I add the most value.
        </p>

        <div className="cards">
          {services.map((service, i) => (
            <Service key={service.title} service={service} icon={ICONS[i % ICONS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
