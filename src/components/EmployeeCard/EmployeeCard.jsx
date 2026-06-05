import { Link } from 'react-router-dom';
import './EmployeeCard.css';

function EmployeeCard({ employee }) {
  const { id, fullName, position, department, description } =
    employee;

  return (
    <article className="employee-card">
      <div className="employee-card__body">
        <h3 className="employee-card__name">{fullName}</h3>
        {position && (
          <span className="employee-card__position-badge">{position}</span>
        )}
        {department && (
          <span className="badge badge-secondary employee-card__department">
            {department}
          </span>
        )}
        {description && (
          <p className="employee-card__description">{description}</p>
        )}
        <Link to={`/employees/${id}`} className="btn employee-card__btn">
          Batafsil ko'rish
        </Link>
      </div>
    </article>
  );
}

export default EmployeeCard;