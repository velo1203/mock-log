import { useEffect } from 'react'
import { TierBadge } from './ReviewCard'

export default function ReviewModal({ review, onClose }) {
  const { title, category, tier, review: body } = review

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <h2 className="modal-title">{title}</h2>
            <TierBadge tier={tier} />
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          {category && (
            <div className="detail-grid">
              <div className="detail-row">
                <span className="detail-label"><i className="fa-solid fa-tag" /> 분류</span>
                <span className="tag tag-home">{category}</span>
              </div>
            </div>
          )}
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
