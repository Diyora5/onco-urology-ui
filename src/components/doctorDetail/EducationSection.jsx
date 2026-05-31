import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import { dateRange } from '../../utils/format';
import './DoctorDetail.css';

const EDU_TYPE_RU = {
  UNIVERSITY: 'Университет',
  MASTER: 'Магистратура',
  PHD: 'Аспирантура / PhD',
  RESIDENCY: 'Ординатура',
  TRAINING: 'Стажировка',
  CERTIFICATE: 'Сертификат',
  QUALIFICATION: 'Квалификация',
  COURSE: 'Курс',
};

function EducationSection({ educations }) {
  const items = Array.isArray(educations) ? educations : [];

  return (
    <section className="section-block doc-section" id="education">
      <SectionHeader
        title="Образование"
        subtitle="Учебные заведения и повышение квалификации"
      />
      {items.length > 0 ? (
        <div className="tl">
          {items.map((ed) => (
            <div key={ed.id} className="tl__row">
              <div className="tl__date">{dateRange(ed.startDate, ed.endDate)}</div>
              <div className="tl__marker" aria-hidden>
                <span className="tl__dot" />
              </div>
              <div className="tl__body">
                <div className="tl__title">
                  <span>{ed.institutionName || ed.description}</span>
                  {ed.educationType && (
                    <span className={`edu-type edu-type--${ed.educationType}`}>
                      {EDU_TYPE_RU[ed.educationType] || ed.educationType}
                    </span>
                  )}
                </div>
                {ed.direction && <span className="tl__org">{ed.direction}</span>}
                {ed.specialization && (
                  <span className="tl__sub">
                    Специализация: {ed.specialization}
                  </span>
                )}
                {ed.description && ed.institutionName && (
                  <p className="tl__desc">{ed.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="doc-bio__text">Сведения об образовании пока не добавлены.</p>
      )}
    </section>
  );
}

export default EducationSection;
