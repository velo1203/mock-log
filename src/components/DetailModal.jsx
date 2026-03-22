import { useEffect } from 'react'

function fmtDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${y}년 ${m}월 ${day}일`
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">
        <i className={icon} /> {label}
      </span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

export default function DetailModal({ exam, onClose }) {
  const { name, date, type, place, score, memo } = exam

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const n = score !== '' && score != null ? score : null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{name}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <DetailRow icon="fa-regular fa-calendar" label="날짜"  value={fmtDate(date)} />
            <DetailRow icon="fa-solid fa-tag"         label="유형"  value={type === 'full' ? '풀모의고사' : '하프모의고사'} />
            <DetailRow icon="fa-regular fa-map"       label="장소"  value={place === 'live' ? '현장' : '집모'} />
            <DetailRow
              icon="fa-regular fa-star"
              label="점수"
              value={n !== null
                ? <span className="score">{n}</span>
                : <span className="no-score">미입력</span>}
            />
          </div>
          {memo && (
            <div className="detail-memo">
              <div className="detail-memo-label">
                <i className="fa-regular fa-note-sticky" /> 메모
              </div>
              <div className="detail-memo-content">{memo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
