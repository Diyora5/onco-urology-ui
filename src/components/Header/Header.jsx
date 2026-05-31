import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../../utils/scroll';
import './Header.css';

const NAV = [
  { label: 'Главная', target: 'top' },
  { label: 'Врачи', target: 'doctors' },
  { label: 'Отзывы', target: 'doctors' },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (e, target) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Allow the home page to render before scrolling.
      setTimeout(() => scrollToId(target), 80);
    } else {
      scrollToId(target);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link to="/" className="site-header__logo">
          <span className="site-header__logo-mark" aria-hidden>
            ✚
          </span>
          DoctorInfo
        </Link>

        <nav className="site-header__nav">
          {NAV.map((item, i) => (
            <a
              key={`${item.label}-${i}`}
              href={`#${item.target}`}
              className="site-header__link"
              onClick={(e) => handleNav(e, item.target)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
