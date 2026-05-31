import { useEffect, useState } from 'react';
import { scrollToId } from '../../utils/scroll';
import './DoctorStickyNav.css';

function DoctorStickyNav({ items = [] }) {
  const [active, setActive] = useState(items[0]?.id || '');

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    scrollToId(id);
  };

  if (items.length === 0) return null;

  return (
    <nav className="doc-nav">
      <div className="doc-nav__inner">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`doc-nav__link${active === item.id ? ' is-active' : ''}`}
            onClick={(e) => handleClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default DoctorStickyNav;
