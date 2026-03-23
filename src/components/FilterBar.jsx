const FILTERS = [
  { key: 'all',  icon: 'fa-solid fa-border-all',          label: '전체' },
  { key: 'full', icon: 'fa-regular fa-circle',            label: '풀모' },
  { key: 'half', icon: 'fa-solid fa-circle-half-stroke',  label: '하프모' },
  { key: 'live', icon: 'fa-regular fa-building',          label: '현장' },
  { key: 'home', icon: 'fa-solid fa-house',               label: '집모' },
]

export default function FilterBar({ filter, onFilter, search, onSearch }) {
  return (
    <div className="filter-area">
      <div className="search-row">
        <i className="fa-solid fa-magnifying-glass search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="시험 이름 검색..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => onSearch('')}>
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>
      <div className="filter-row">
        <span className="filter-label">
          <i className="fa-solid fa-sliders" /> 필터
        </span>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={'filter-btn' + (filter === f.key ? ' on' : '')}
            onClick={() => onFilter(f.key)}
          >
            <i className={f.icon} /> {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
