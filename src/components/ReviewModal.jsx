import { useEffect } from 'react'

function fmtDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${y}년 ${m}월 ${day}일`
}

export default function ReviewModal({ review, onClose }) {
  const { title, date, category, rating, review: body } = review

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const n = rating !== '' && rating != null ? parseFloat(rating) : null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-row">
              <span className="detail-label"><i className="fa-regular fa-calendar" /> 날짜</span>
              <span className="detail-value">{fmtDate(date)}</span>
            </div>
            {category && (
              <div className="detail-row">
                <span className="detail-label"><i className="fa-solid fa-tag" /> 분류</span>
                <span className="detail-value">{category}</span>
              </div>
            )}
            {n !== null && !isNaN(n) && (
              <div className="detail-row">
                <span className="detail-label"><i className="fa-solid fa-star" /> 평점</span>
                <span className="detail-value review-rating">{n}<i className="fa-solid fa-star" /></span>
              </div>
            )}
          </div>
          {body && (
            <div className="detail-memo">
              <div className="detail-memo-label">
                <i className="fa-regular fa-note-sticky" /> 후기
              </div>
              <div className="detail-memo-content">{body}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
