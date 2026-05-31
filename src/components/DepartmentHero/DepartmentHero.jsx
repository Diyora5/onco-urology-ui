import { Link } from 'react-router-dom';
import { splitName, dayLabelRu } from '../../utils/format';
import './DepartmentHero.css';

const FALLBACK_IMG = 'https://via.placeholder.com/400x480?text=No+Photo';

const DEFAULT_FEATURES = [
  'Каждый пациент онкоурологического отделения находится под наблюдением мультидисциплинарного консилиума специалистов. Такой подход обеспечивает глубоко персонализированное лечение, основанное на современных достижениях клинической онкологии, молекулярной генетики и доказательной медицины. В зависимости от клинической ситуации к ведению пациента подключаются хирурги, радиологи, химиотерапевты и молекулярные генетики.',
  'Индивидуальный подход к каждому пациенту',
  'Команда квалифицированных специалистов',
  'Профилактика и реабилитационная терапия',
];

function DepartmentHero({ doctor, title = 'Заведующий отделением' }) {
  if (!doctor) return null;

  const image = doctor.imageUrl || doctor.photoUrl || FALLBACK_IMG;
  const { surname, rest } = splitName(doctor.fullName);
  const description = doctor.profile?.bio || doctor.description || '';
  const interests = doctor.profile?.scientificInterests || [];
  const features = interests.length ? interests : DEFAULT_FEATURES;

  const workingDays = (doctor.workSchedules || []).filter((s) => !s.isDayOff);

  return (
    <section className="dept-hero">
      <h1 className="dept-hero__title">{title}</h1>

      <div className="dept-hero__head">
        <div className="dept-hero__photo">
          <img
            src={image}
            alt={doctor.fullName}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>

        <div className="dept-hero__info">
          <h2 className="dept-hero__surname">{surname}</h2>
          {rest && <p className="dept-hero__name">{rest}</p>}

          <hr className="dept-hero__divider" />

          <p className="dept-hero__label">Должность:</p>
          <p className="dept-hero__position">{doctor.position}</p>

          <Link to={`/employees/${doctor.id}`} className="btn dept-hero__btn">
            Подробнее
          </Link>
        </div>
      </div>

      {description && <p className="dept-hero__description">{description}</p>}

      <div className="dept-hero__columns">
        <div className="dept-hero__contacts">
          <h3 className="dept-hero__block-title">Контакты</h3>

          {workingDays.length > 0 && (
            <div className="dept-hero__contact-row">
              <span className="dept-hero__contact-label">Время работы</span>
              <ul className="dept-hero__hours">
                {workingDays.map((s) => (
                  <li key={s.id ?? s.dayOfWeek}>
                    <span>{dayLabelRu(s.dayOfWeek)}</span>
                    <span>
                      {s.startTime || '--'}–{s.endTime || '--'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {doctor.phone && (
            <div className="dept-hero__contact-row">
              <span className="dept-hero__contact-label">Телефон</span>
              <span className="dept-hero__contact-value">{doctor.phone}</span>
            </div>
          )}

          {doctor.address && (
            <div className="dept-hero__contact-row">
              <span className="dept-hero__contact-label">Адрес</span>
              <span className="dept-hero__contact-value">{doctor.address}</span>
            </div>
          )}
        </div>

        <div className="dept-hero__features">
          <h3 className="dept-hero__block-title">Особенности отделения</h3>
          <ul className="bullet-list">
            {features.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DepartmentHero;
