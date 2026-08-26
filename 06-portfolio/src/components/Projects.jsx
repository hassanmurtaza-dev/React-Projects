import { useMemo, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { profile, projects } from "../data";

function Project({ project }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="project glass reveal">
      <div className="project__media" style={{ background: project.gradient }}>
        {project.featured && <span className="project__badge">FEATURED</span>}
        <span className="project__cat">{project.category}</span>
      </div>

      <div className="project__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="pills">
          {project.tags.map((tag) => (
            <span className="pill" key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project__links">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">Live demo</a>
          ) : (
            <span className="project__soon">Demo soon</span>
          )}
          <a href={project.code} target="_blank" rel="noreferrer">Code</a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const tabs = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [],
  );

  const shown = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 className="section-title">
          Selected <span className="grad-text">work</span>.
        </h2>
        <p className="section-intro">
          Apps, tools and experiments — each one built from scratch and running on
          GitHub.
        </p>

        <div className="filters">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "on" : ""}
              aria-pressed={filter === tab}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {shown.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>

        <p className="projects__more">
          More work on{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>
    </section>
  );
}
