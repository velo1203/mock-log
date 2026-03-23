import { useEffect } from 'react'
import { TierBadge, SubjectTag } from './ReviewCard'

export default function ReviewModal({ review, onClose }) {
  const { title, category, subject, tier, review: body } = review

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
          <div className="review-modal-title-row">
            <h2 className="review-modal-title">{title}</h2>
          </div>
          <div className="review-modal-tags">
            {category && <span className="tag tag-home">{category}</span>}
            <SubjectTag subject={subject} />
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
