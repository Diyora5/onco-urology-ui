import { useEffect, useMemo, useState } from 'react';
import { getEmployees, getEmployeeById } from '../../api/employeeApi';
import { getDepartmentInfo } from '../../api/departmentInfoApi';
import HomeHero from '../../components/HomeHero/HomeHero.jsx';
import SearchFilter from '../../components/SearchFilter/SearchFilter.jsx';
import DoctorGrid from '../../components/DoctorGrid/DoctorGrid.jsx';
import ContactsFeatures from '../../components/ContactsFeatures/ContactsFeatures.jsx';
import './Home.css';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [head, setHead] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmployees();
        if (!active) return;
        setEmployees(data);

        if (data.length > 0) {
          try {
            const detail = await getEmployeeById(data[0].id);
            if (active) setHead(detail);
          } catch {
            if (active) setHead(data[0]);
          }
        }
      } catch {
        if (active) setError('Не удалось загрузить данные. Попробуйте позже.');
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const positions = useMemo(() => {
    const set = new Set();
    employees.forEach((e) => {
      if (e.position) set.add(e.position);
    });
    return Array.from(set).sort();
  }, [employees]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((e) => {
      const matchesName = !q || (e.fullName || '').toLowerCase().includes(q);
      const matchesPos = !position || e.position === position;
      return matchesName && matchesPos;
    });
  }, [employees, query, position]);

  if (loading) {
    return (
      <div className="home">
        <div className="home-hero-skeleton skeleton" />
        <div className="doctor-grid home__skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="home__card-skeleton">
              <div className="skeleton home__card-skeleton-img" />
              <div className="skeleton home__card-skeleton-line" />
              <div className="skeleton home__card-skeleton-line short" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="alert-error">
          <span aria-hidden>⚠️</span>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="home">
        <div className="state-box">
          <span className="state-icon" aria-hidden>
            🩺
          </span>
          <p>Специалисты пока не добавлены.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <HomeHero doctor={head} doctorsCount={employees.length} />

      <section className="home__doctors section-block" id="doctors">
        <div className="home__doctors-head">
          <div>
            <h2 className="section-heading">Наши специалисты</h2>
            <p className="home__subtitle">
              Выберите врача, чтобы посмотреть подробный профиль и отзывы
            </p>
          </div>
          <span className="home__count">{filtered.length} врачей</span>
        </div>

        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          position={position}
          onPositionChange={setPosition}
          positions={positions}
        />

        <DoctorGrid doctors={filtered} />
      </section>

      <ContactsFeatures department={departmentInfo} />
    </div>
  );
}

export default Home;
