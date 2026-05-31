import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import './DoctorDetail.css';

function ScientificInterests({ interests }) {
  const items = Array.isArray(interests) ? interests : [];

  return (
    <section className="section-block doc-section" id="interests">
      <SectionHeader
        title="Сфера научных интересов"
        subtitle="Направления исследований и клинической практики"
      />
      {items.length > 0 ? (
        <div className="interest-chips">
          {items.map((item, i) => (
            <span key={i} className="interest-chip">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="doc-bio__text">Научные интересы пока не указаны.</p>
      )}
    </section>
  );
}

export default ScientificInterests;
