import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import { dateRange } from '../../utils/format';
import './DoctorDetail.css';

function ExperienceSection({ experiences }) {
  const items = Array.isArray(experiences) ? experiences : [];

  return (
    <section className="section-block doc-section" id="experience">
      <SectionHeader
        title="Опыт работы"
        subtitle="Профессиональный путь и места работы"
      />
      {items.length > 0 ? (
        <div className="tl">
          {items.map((exp) => (
            <div key={exp.id} className="tl__row">
              <div className="tl__date">
                {dateRange(exp.startDate, exp.endDate, {
                  current: exp.isCurrent,
                })}
              </div>
              <div className="tl__marker" aria-hidden>
                <span className="tl__dot" />
              </div>
              <div className="tl__body">
                <div className="tl__title">
                  <span>
                    {exp.position || exp.organizationName || exp.description}
                  </span>
                  {exp.isCurrent && <span className="tl__now">Сейчас</span>}
                </div>
                {exp.position && exp.organizationName && (
                  <span className="tl__org">{exp.organizationName}</span>
                )}
                {exp.department && (
                  <span className="tl__sub">{exp.department}</span>
                )}
                {exp.description && (exp.position || exp.organizationName) && (
                  <p className="tl__desc">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="doc-bio__text">Опыт работы пока не добавлен.</p>
      )}
    </section>
  );
}

export default ExperienceSection;
