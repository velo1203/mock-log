function fmtDate(d) {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${y}.${m}.${day}`
}

export default function ExamCard({ exam, onClick }) {
  const { name, date, type, place, score } = exam

  const n = score !== '' && score != null ? score : null

  const typeTag = type === 'full'
    ? <span className="tag tag-full"><i className="fa-regular fa-circle" /> 풀모의</span>
    : <span className="tag tag-half"><i className="fa-solid fa-circle-half-stroke" /> 하프모의</span>

  const placeTag = place === 'live'
    ? <span className="tag tag-live"><i className="fa-regular fa-building" /> 현장</span>
    : <span className="tag tag-home"><i className="fa-solid fa-house" /> 집모</span>

  return (
    <div className="exam-card" onClick={onClick}>
      <div className="exam-card-top">
        <span className="exam-card-name">{name}</span>
        <i className="fa-solid fa-chevron-right exam-card-arrow" />
      </div>
      <div className="exam-card-bottom">
        <div className="exam-card-tags">
          <span className="exam-card-date">{fmtDate(date)}</span>
          {typeTag}
          {placeTag}
        </div>
        {n !== null && <span className="score">{n}</span>}
      </div>
    </div>
  )
}
