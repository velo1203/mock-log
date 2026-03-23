import ExamCard from './ExamCard'

function SkeletonCard() {
  return (
    <div className="exam-card skeleton-card">
      <div className="exam-card-top">
        <span className="skeleton" style={{ width: '55%', height: '16px' }} />
      </div>
      <div className="exam-card-bottom">
        <div className="exam-card-tags">
          <span className="skeleton" style={{ width: '72px' }} />
          <span className="skeleton" style={{ width: '52px' }} />
          <span className="skeleton" style={{ width: '44px' }} />
        </div>
        <span className="skeleton" style={{ width: '32px' }} />
      </div>
    </div>
  )
}

export default function ExamTable({ rows, loading, error, onRowClick }) {
  if (loading) {
    return (
      <div className="card-list">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }
  if (error) {
    return (
      <div className="state-card">
        <i className="state-icon fa-solid fa-circle-exclamation" />
        data를 불러올 수 없습니다.
      </div>
    )
  }
  if (rows.length === 0) {
    return <div className="state-card"><i className="state-icon fa-solid fa-inbox" />표시할 항목이 없습니다.</div>
  }

  return (
    <div className="card-list">
      {rows.map((exam, i) => (
        <ExamCard key={i} exam={exam} onClick={() => onRowClick(exam)} />
      ))}
    </div>
  )
}
