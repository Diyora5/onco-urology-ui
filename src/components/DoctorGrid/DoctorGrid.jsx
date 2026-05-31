import DoctorCard from '../DoctorCard/DoctorCard.jsx';
import './DoctorGrid.css';

function DoctorGrid({ doctors = [] }) {
  if (doctors.length === 0) {
    return (
      <div className="state-box">
        <span className="state-icon" aria-hidden>
          🔎
        </span>
        <p>Специалисты не найдены. Измените параметры поиска.</p>
      </div>
    );
  }

  return (
    <div className="doctor-grid">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default DoctorGrid;
