function fmtDate(d) {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${y}.${m}.${day}`
}

function StarRating({ rating }) {
  const n = parseFloat(rating)
  if (!rating || isNaN(n)) return null
  return <span className="review-rating">{n}<i className="fa-solid fa-star" /></span>
}

export default function ReviewCard({ review, onClick }) {
  const { title, date, category, rating, review: body } = review

  return (
    <div className="exam-card" onClick={onClick}>
      <div className="exam-card-top">
        <span className="exam-card-name">{title}</span>
        <i className="fa-solid fa-chevron-right exam-card-arrow" />
      </div>
      <div className="exam-card-bottom">
        <div className="exam-card-tags">
          <span className="exam-card-date">{fmtDate(date)}</span>
          {category && (
            <span className="tag tag-home">{category}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StarRating rating={rating} />
          {body && (
            <span className="review-preview">{body.slice(0, 20)}{body.length > 20 ? '…' : ''}</span>
          )}
        </div>
      </div>
    </div>
  )
}
