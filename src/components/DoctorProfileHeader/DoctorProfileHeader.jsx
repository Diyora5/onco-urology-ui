import { DEFAULT_AVATAR } from '../../utils/avatar';
import './DoctorProfileHeader.css';

function DoctorProfileHeader({ doctor }) {
  if (!doctor) return null;

  const image = doctor.imageUrl || doctor.photoUrl || DEFAULT_AVATAR;
  const profile = doctor.profile || {};

  const badges = [
    profile.academicDegree,
    profile.academicTitle,
    profile.academyMembership,
  ].filter(Boolean);

  const workingDays = (doctor.workSchedules || []).filter((s) => !s.isDayOff)
    .length;
  const commentsCount = (doctor.comments || []).length;

  const chips = [
    doctor.phone && { icon: '📞', text: doctor.phone },
    doctor.address && { icon: '📍', text: doctor.address },
    workingDays > 0 && { icon: '🗓️', text: `${workingDays} рабочих дней` },
    { icon: '💬', text: `${commentsCount} отзывов` },
  ].filter(Boolean);

  return (
    <section className="profile-header">
      <div className="profile-header__photo">
        <img
          src={image}
          alt={doctor.fullName}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />
      </div>

      <div className="profile-header__info">
        {doctor.department && (
          <span className="badge badge-primary profile-header__dept">
            {doctor.department}
          </span>
        )}
        <h1 className="profile-header__name">{doctor.fullName}</h1>
        {doctor.position && (
          <p className="profile-header__position">{doctor.position}</p>
        )}

        {badges.length > 0 && (
          <div className="profile-header__badges">
            {badges.map((b, i) => (
              <span key={i} className="badge badge-secondary">
                {b}
              </span>
            ))}
          </div>
        )}

        <ul className="profile-header__chips">
          {chips.map((chip, i) => (
            <li key={i} className="profile-header__chip">
              <span className="profile-header__chip-icon" aria-hidden>
                {chip.icon}
              </span>
              <span>{chip.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DoctorProfileHeader;
