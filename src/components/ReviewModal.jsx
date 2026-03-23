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

        <div className="review-modal-header">
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="review-modal-body">
          <h2 className="review-modal-title">{title}</h2>
          <div className="review-modal-meta">
            <TierBadge tier={tier} />
            {category && <span className="tag tag-home">{category}</span>}
          </div>
          {body && (
            <>
              <div className="review-modal-divider" />
              <p className="review-modal-text">{body}</p>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
