const PAGES = [
  { key: 'exam',   label: '모의고사' },
  { key: 'review', label: '후기' },
]

export default function PageNav({ page, onPage }) {
  return (
    <div className="page-nav">
      {PAGES.map(p => (
        <button
          key={p.key}
          className={'page-nav-btn' + (page === p.key ? ' on' : '')}
          onClick={() => onPage(p.key)}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
