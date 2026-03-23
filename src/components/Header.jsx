export default function Header({ page, onPage }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <span className="site-logo">호성의 공부기록</span>
        <nav className="site-nav">
          <button
            className={'site-nav-btn' + (page === 'exam' ? ' on' : '')}
            onClick={() => onPage('exam')}
          >
            모의고사
          </button>
          <button
            className={'site-nav-btn' + (page === 'review' ? ' on' : '')}
            onClick={() => onPage('review')}
          >
            후기
          </button>
        </nav>
      </div>
    </header>
  )
}
