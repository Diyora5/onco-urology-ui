import SearchableDropdown from '../SearchableDropdown/SearchableDropdown.jsx';
import './SearchFilter.css';

function SearchFilter({
  query,
  onQueryChange,
  position,
  onPositionChange,
  positions = [],
}) {
  return (
    <div className="search-filter">

      <div className="search-filter__dropdown">
        <SearchableDropdown
          value={position}
          onChange={onPositionChange}
          options={positions}
          placeholder="Все специалисты"
          clearLabel="Все специалисты"
          searchPlaceholder="Поиск специальности..."
        />
      </div>
    </div>
  );
}

export default SearchFilter;
