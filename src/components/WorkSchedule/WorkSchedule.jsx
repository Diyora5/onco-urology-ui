import './WorkSchedule.css';

const DAY_ORDER = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DAY_LABELS = {
  Monday: 'Dushanba',
  Tuesday: 'Seshanba',
  Wednesday: 'Chorshanba',
  Thursday: 'Payshanba',
  Friday: 'Juma',
  Saturday: 'Shanba',
  Sunday: 'Yakshanba',
};

function WorkSchedule({ schedules = [] }) {
  if (!schedules.length) {
    return (
      <div className="state-box work-schedule__empty">
        <span className="state-icon" aria-hidden>
          🕒
        </span>
        <p>Ish vaqtlari kiritilmagan.</p>
      </div>
    );
  }

  const sorted = [...schedules].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek)
  );

  return (
    <ul className="work-schedule">
      {sorted.map((s) => (
        <li
          key={s.id ?? s.dayOfWeek}
          className={`work-schedule__row${s.isDayOff ? ' is-off' : ''}`}
        >
          <span className="work-schedule__day">
            {DAY_LABELS[s.dayOfWeek] || s.dayOfWeek}
          </span>
          {s.isDayOff ? (
            <span className="badge badge-muted">Dam olish</span>
          ) : (
            <span className="work-schedule__time">
              <span className="badge badge-success">Ish kuni</span>
              <span className="work-schedule__hours">
                {s.startTime || '--'} – {s.endTime || '--'}
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default WorkSchedule;
