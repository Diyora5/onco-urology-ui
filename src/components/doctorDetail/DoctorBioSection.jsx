import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import './DoctorDetail.css';

function DoctorBioSection({ bio }) {
  const paragraphs = (bio || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="section-block doc-section" id="about">
      <SectionHeader
        title="О враче"
        subtitle="Профессиональная биография и основные сведения"
      />
      {paragraphs.length > 0 ? (
        <div className="doc-bio__text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        <p className="doc-bio__text">Информация о враче пока не добавлена.</p>
      )}
    </section>
  );
}

export default DoctorBioSection;
