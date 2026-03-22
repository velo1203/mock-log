import ExamCard from './ExamCard'

export default function ExamTable({ rows, loading, error, onRowClick }) {
  if (loading) {
    return <div className="state-card"><i className="state-icon fa-solid fa-circle-notch fa-spin" /></div>
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
