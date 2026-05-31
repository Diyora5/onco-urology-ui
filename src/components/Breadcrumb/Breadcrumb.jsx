import { Link } from 'react-router-dom';
import './Breadcrumb.css';

function Breadcrumb({ current }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/" className="breadcrumb__link">
        Главная
      </Link>
      <span className="breadcrumb__sep" aria-hidden>
        /
      </span>
      <Link to="/#doctors" className="breadcrumb__link">
        Врачи
      </Link>
      <span className="breadcrumb__sep" aria-hidden>
        /
      </span>
      <span className="breadcrumb__current">{current}</span>
    </nav>
  );
}

export default Breadcrumb;
