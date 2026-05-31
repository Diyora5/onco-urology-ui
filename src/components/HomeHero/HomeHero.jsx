import { Link } from 'react-router-dom';
import { splitName } from '../../utils/format';
import { DEFAULT_AVATAR } from '../../utils/avatar';
import './HomeHero.css';

function HomeHero({ doctor, doctorsCount = 0 }) {
  const image = doctor?.imageUrl || doctor?.photoUrl || DEFAULT_AVATAR;
  const { surname, rest } = splitName(doctor?.fullName || '');

  return (
    <section className="home-hero" id="top">
      <div className="home-hero__text">
        <h1 className="home-hero__title">
          Информация о врачах и&nbsp;специалистах
        </h1>
        <p className="home-hero__subtitle">
        Отделение онкоурологии Республиканского специализированного научно-практического медицинского центра онкологии и радиологии является ведущим профильным подразделением Узбекистана, оказывающим полный спектр помощи пациентам с онкоурологическими заболеваниями. Центр располагает всеми современными методами лечения — хирургическим, лекарственным и лучевым — при следующих нозологиях: рак почки, рак мочевого пузыря, рак предстательной железы, рак яичка, рак полового члена и рак мочеточника.
        <br /><br />Отделение регулярно принимает пациентов со сложными и нестандартными клиническими случаями, в том числе тех, кому было отказано в лечении в других медицинских учреждениях республики. Центр также выступает площадкой для получения независимого экспертного заключения — второго медицинского мнения — для пациентов из всех регионов Узбекистана.
        </p>

        <div className="home-hero__stats">
          <div className="home-hero__stat">
            <span className="home-hero__stat-num">{doctorsCount}</span>
            <span className="home-hero__stat-label">специалистов</span>
          </div>
          <div className="home-hero__stat">
            <span className="home-hero__stat-num">24/7</span>
            <span className="home-hero__stat-label">доступ к профилям</span>
          </div>
        </div>
      </div>

      {doctor && (
        <div className="home-hero__card">
          <span className="home-hero__badge">Заведующий отделением</span>
          <div className="home-hero__photo">
            <img
              src={image}
              alt={doctor.fullName}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />
          </div>
          <div className="home-hero__card-body">
            <h2 className="home-hero__surname">{surname}</h2>
            {rest && <p className="home-hero__name">{rest}</p>}
            {doctor.position && (
              <p className="home-hero__position">{doctor.position}</p>
            )}
            <Link to={`/employees/${doctor.id}`} className="btn home-hero__btn">
              Подробнее
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeHero;
