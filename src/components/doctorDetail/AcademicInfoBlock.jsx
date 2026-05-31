import './DoctorDetail.css';

function AcademicInfoBlock({ profile }) {
  const items = [
    { label: 'Ученая степень', value: profile?.academicDegree, icon: '🎓' },
    { label: 'Ученое звание', value: profile?.academicTitle, icon: '🏅' },
    { label: 'Членство в РАН', value: profile?.academyMembership, icon: '🏛️' },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <section className="section-block">
      <div className="academic-grid">
        {items.map((item) => (
          <div key={item.label} className="academic-card">
            <span className="academic-card__icon" aria-hidden>
              {item.icon}
            </span>
            <span className="academic-card__label">{item.label}</span>
            <span className="academic-card__value">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AcademicInfoBlock;
