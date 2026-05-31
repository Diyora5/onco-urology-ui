import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './SearchableDropdown.css';

function normalizeOptions(options) {
  return options.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
}

function SearchableDropdown({
  value = '',
  onChange,
  options = [],
  placeholder = 'Все специалисты',
  clearLabel = 'Все специалисты',
  searchPlaceholder = 'Поиск...',
  className = '',
  disabled = false,
  emptyMessage = 'Ничего не найдено',
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const listId = useId();

  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(q)
    );
  }, [normalizedOptions, search]);

  const displayLabel = useMemo(() => {
    if (!value) return placeholder;
    const match = normalizedOptions.find((opt) => opt.value === value);
    return match?.label ?? value;
  }, [value, placeholder, normalizedOptions]);

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        close();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const handleToggle = () => {
    if (disabled) return;
    if (open) {
      close();
    } else {
      setOpen(true);
    }
  };

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    close();
  };

  const handleClear = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onChange('');
    close();
  };

  return (
    <div
      ref={rootRef}
      className={[
        'searchable-dropdown',
        open ? 'is-open' : '',
        disabled ? 'is-disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="searchable-dropdown__trigger"
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        disabled={disabled}
      >
        <span className="searchable-dropdown__value" title={displayLabel}>
          {displayLabel}
        </span>
        <span className="searchable-dropdown__actions">
          {value ? (
            <span
              role="button"
              tabIndex={0}
              className="searchable-dropdown__clear"
              aria-label="Сбросить фильтр"
              onClick={handleClear}
              onMouseDown={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e);
                }
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M3 3l8 8M11 3L3 11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          ) : null}
          <span className="searchable-dropdown__chevron" aria-hidden />
        </span>
      </button>

      {open ? (
        <div className="searchable-dropdown__panel">
          <div className="searchable-dropdown__search-wrap">
            <span className="searchable-dropdown__search-icon" aria-hidden>
              🔍
            </span>
            <input
              ref={searchRef}
              type="text"
              className="searchable-dropdown__search"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label={searchPlaceholder}
            />
          </div>

          <ul className="searchable-dropdown__list" id={listId} role="listbox">
            <li role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={!value}
                className={`searchable-dropdown__option ${
                  !value ? 'is-selected' : ''
                }`}
                onClick={() => handleSelect('')}
              >
                {clearLabel}
              </button>
            </li>

            {filteredOptions.map((opt) => (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt.value}
                  className={`searchable-dropdown__option ${
                    value === opt.value ? 'is-selected' : ''
                  }`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </button>
              </li>
            ))}

            {filteredOptions.length === 0 ? (
              <li className="searchable-dropdown__empty" role="presentation">
                {emptyMessage}
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SearchableDropdown;
