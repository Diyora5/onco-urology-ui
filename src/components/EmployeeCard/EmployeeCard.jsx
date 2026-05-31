import { Link } from 'react-router-dom';
import './EmployeeCard.css';

const FALLBACK_IMG =
  'https://via.placeholder.com/400x300?text=No+Photo';

function EmployeeCard({ employee }) {
  const { id, fullName, position, department, photoUrl, description } =
    employee;

  return (
    <article className="employee-card">
      <div className="employee-card__image">
        <img
          src={photoUrl || FALLBACK_IMG}
          alt={fullName}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
        {position && (
          <span className="employee-card__position-badge">{position}</span>
        )}
      </div>

      <div className="employee-card__body">
        <h3 className="employee-card__name">{fullName}</h3>
        {department && (
          <span className="badge badge-secondary employee-card__department">
            {department}
          </span>
        )}
        {description && (
          <p className="employee-card__description">{description}</p>
        )}
        <Link to={`/employees/${id}`} className="btn employee-card__btn">
          Batafsil ko‘rish
        </Link>
      </div>
    </article>
  );
}

export default EmployeeCard;
