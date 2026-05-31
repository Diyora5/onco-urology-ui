import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import './DoctorDetail.css';

// Renders a section with a list of simple text items (publications,
// certificates, internships). `variant` controls the visual style.
function ListSection({ id, title, subtitle, items = [], variant = 'list', icon }) {
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) return null;

  const getText = (it) => (typeof it === 'string' ? it : it.title);

  return (
    <section className="section-block doc-section" id={id}>
      <SectionHeader title={title} subtitle={subtitle} />

      {variant === 'chips' ? (
        <div className="cert-chips">
          {list.map((it, i) => (
            <span key={it.id ?? i} className="cert-chip">
              {icon && (
                <span className="cert-chip__icon" aria-hidden>
                  {icon}
                </span>
              )}
              {getText(it)}
            </span>
          ))}
        </div>
      ) : (
        <ol className="list-section">
          {list.map((it, i) => (
            <li key={it.id ?? i} className="list-section__item">
              <span className="list-section__num" aria-hidden>
                {i + 1}
              </span>
              <span className="list-section__text">{getText(it)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default ListSection;
