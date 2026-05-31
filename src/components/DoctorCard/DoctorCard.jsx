import { Link } from 'react-router-dom';
import { splitName } from '../../utils/format';
import { DEFAULT_AVATAR } from '../../utils/avatar';
import './DoctorCard.css';

function DoctorCard({ doctor }) {
  if (!doctor) return null;
  const { id, fullName, position, department } = doctor;
  const image = doctor.imageUrl || doctor.photoUrl || DEFAULT_AVATAR;
  const { surname, rest } = splitName(fullName);

  return (
    <article className="doctor-card">
      <Link to={`/employees/${id}`} className="doctor-card__media">
        <div className="doctor-card__image">
          <img
            src={image}
            alt={fullName}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
        </div>
      </Link>

      <div className="doctor-card__body">
        <Link to={`/employees/${id}`} className="doctor-card__name-link">
          <span className="doctor-card__surname">{surname}</span>
          {rest && <span className="doctor-card__name">{rest}</span>}
        </Link>

        {position && <span className="doctor-card__position">{position}</span>}
        {department && (
          <span className="doctor-card__department">{department}</span>
        )}

        <Link to={`/employees/${id}`} className="btn btn-secondary doctor-card__btn">
          Смотреть профиль
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;
