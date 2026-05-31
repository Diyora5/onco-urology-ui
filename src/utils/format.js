// Split a full name into a surname (last token) and the rest.
export function splitName(fullName = '') {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { surname: fullName || '', rest: '' };
  const surname = parts[parts.length - 1];
  const rest = parts.slice(0, -1).join(' ');
  return { surname, rest };
}

export function yearOf(dateStr) {
  if (!dateStr) return '';
  return String(dateStr).slice(0, 4);
}

// Build a "2018 — настоящее время" / "2008 — 2014" / "2018" range string.
export function dateRange(startDate, endDate, { current = false } = {}) {
  const start = yearOf(startDate) || '—';
  if (current || !endDate) return `${start} — настоящее время`;
  const end = yearOf(endDate);
  if (start === end) return start;
  return `${start} — ${end}`;
}

const DAY_RU = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
};

export const WEEKDAY_ORDER = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

export function dayLabelRu(day = '') {
  const key = String(day).toLowerCase();
  return DAY_RU[key] || day;
}

function dayOrderIndex(day) {
  const upper = String(day).toUpperCase();
  const idx = WEEKDAY_ORDER.indexOf(upper);
  if (idx >= 0) return idx;
  const lower = String(day).toLowerCase();
  return WEEKDAY_ORDER.findIndex((d) => d.toLowerCase() === lower);
}

/** Sort schedules Mon → Sun (supports MONDAY enum or Monday string). */
export function sortWeekSchedules(schedules = []) {
  return [...schedules].sort(
    (a, b) => dayOrderIndex(a.dayOfWeek) - dayOrderIndex(b.dayOfWeek)
  );
}

export function formatCommentDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
