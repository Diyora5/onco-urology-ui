import { dayLabelRu, sortWeekSchedules } from '../../utils/format';
import './ContactsFeatures.css';

export const FALLBACK_DEPARTMENT = {
  title: 'Отделение онкоурологии',
  phone: '+998 55 515-55-68',
  address:
    'г. Ташкент, Олмазорский район, ул. Автомобильное кольцо, дом 14а',
  description:
    'Отделение онкоурологии специализируется на диагностике и лечении онкологических заболеваний мочевыводящих путей.',
  advantages: [
    'Каждый пациент онкоурологического отделения находится под наблюдением мультидисциплинарного консилиума специалистов. Такой подход обеспечивает глубоко персонализированное лечение, основанное на современных достижениях клинической онкологии, молекулярной генетики и доказательной медицины. В зависимости от клинической ситуации к ведению пациента подключаются хирурги, радиологи, химиотерапевты и молекулярные генетики.',
    'В составе отделения работают высококвалифицированные хирурги с обширным опытом лечения широкого спектра урологических и онкологических заболеваний, выходящего за рамки стандартной онкоурологической практики.',
    'Отделение оснащено современным оборудованием для проведения роботассистированных операций — наиболее передового метода малоинвазивной хирургии. Данная технология позволяет существенно снизить операционную травму и ускорить восстановление пациента, полностью сохраняя при этом радикальность вмешательства.',
    'Специалисты отделения в совершенстве владеют всем арсеналом современных малоинвазивных методик: эндоскопическими и лапароскопическими операциями, роботассистированными вмешательствами, а также их комбинациями в зависимости от индивидуальных показаний.',
    'Сотрудники отделения ведут активную научную и профессиональную деятельность: регулярно участвуют в крупных российских и международных конгрессах, входят в состав рабочих групп по разработке международных клинических рекомендаций, а также являются авторами учебных пособий, монографий и публикаций в ведущих рецензируемых журналах.'
  ],
  workSchedules: [
    { dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '17:00', isWorkingDay: true },
    { dayOfWeek: 'TUESDAY', startTime: '08:00', endTime: '17:00', isWorkingDay: true },
    { dayOfWeek: 'WEDNESDAY', startTime: '08:00', endTime: '17:00', isWorkingDay: true },
    { dayOfWeek: 'THURSDAY', startTime: '08:00', endTime: '17:00', isWorkingDay: true },
    { dayOfWeek: 'FRIDAY', startTime: '08:00', endTime: '17:00', isWorkingDay: true },
    { dayOfWeek: 'SATURDAY', startTime: null, endTime: null, isWorkingDay: false },
    { dayOfWeek: 'SUNDAY', startTime: null, endTime: null, isWorkingDay: false },
  ],
};

function scheduleTimeLabel(schedule) {
  const working =
    schedule.isWorkingDay === true ||
    (schedule.isWorkingDay !== false && !schedule.isDayOff);
  if (!working) return 'Выходной';
  const start = schedule.startTime || '--';
  const end = schedule.endTime || '--';
  return `${start}–${end}`;
}

function ContactsFeatures({ department }) {
  const info = department || FALLBACK_DEPARTMENT;
  const schedules = sortWeekSchedules(info.workSchedules || []);
  const advantages =
    Array.isArray(info.advantages) && info.advantages.length
      ? info.advantages
      : FALLBACK_DEPARTMENT.advantages;

  return (
    <section className="cf" id="contacts">
      <div className="cf__card cf__contacts">
        <h3 className="cf__title">
          <span className="cf__title-icon" aria-hidden>
            📍
          </span>
          Контакты
        </h3>

        <ul className="cf__list">
          {schedules.length > 0 && (
            <li className="cf__item">
              <span className="cf__label">Время работы</span>
              <ul className="cf__hours">
                {schedules.map((s) => (
                  <li key={s.id ?? s.dayOfWeek}>
                    <span>{dayLabelRu(s.dayOfWeek)}</span>
                    <span
                      className={
                        s.isWorkingDay === false || s.isDayOff
                          ? 'cf__hours-off'
                          : ''
                      }
                    >
                      {scheduleTimeLabel(s)}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {info.phone && (
            <li className="cf__item">
              <span className="cf__label">Телефон</span>
              <span className="cf__value">
                <a href={`tel:${info.phone.replace(/\s/g, '')}`}>{info.phone}</a>
              </span>
            </li>
          )}
          {info.address && (
            <li className="cf__item">
              <span className="cf__label">Адрес</span>
              <span className="cf__value">{info.address}</span>
            </li>
          )}
        </ul>
      </div>

      <div className="cf__card cf__features">
        <h3 className="cf__title">
          <span className="cf__title-icon cf__title-icon--teal" aria-hidden>
            ✦
          </span>
          Преимущества отделения
        </h3>
        <ul className="bullet-list">
          {advantages.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ContactsFeatures;
