import useScrollReveal from "../hooks/useScrollReveal";
import { skillGroups } from "../data";

function Group({ group }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="skill-group glass reveal">
      <div className="skill-group__head">
        <span className={`skill-group__dot ${group.tone}`} aria-hidden="true"></span>
        <h3>{group.name}</h3>
      </div>
      <p className="skill-group__note">{group.note}</p>

      {group.items.map((skill) => (
        <div className="skill" key={skill.name}>
          <div className="skill__top">
            <span>{skill.name}</span>
            <span className="skill__percent">{skill.level}%</span>
          </div>
          <div className="skill__track">
            <span className="skill__fill" style={{ "--target": `${skill.level}%` }}></span>
          </div>
        </div>
      ))}
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-label">My skills</p>
        <h2 className="section-title">
          The stack I use to <span className="grad-text">ship real products</span>.
        </h2>
        <p className="section-intro">
          Grouped by where they sit in the build — interface, data layer, and the
          tooling that ties them together.
        </p>

        <div className="cards">
          {skillGroups.map((group) => (
            <Group key={group.name} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
