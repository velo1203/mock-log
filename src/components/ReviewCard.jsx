export function TierBadge({ tier }) {
  if (!tier) return null
  return <span className={`tier-badge tier-${tier.toUpperCase()}`}>{tier.toUpperCase()}</span>
}

export default function ReviewCard({ review, onClick }) {
  const { title, category, tier, review: body } = review

  return (
    <div className="exam-card" onClick={onClick}>
      <div className="exam-card-top">
        <span className="exam-card-name">{title}</span>
        <i className="fa-solid fa-chevron-right exam-card-arrow" />
      </div>
      <div className="exam-card-bottom">
        <div className="exam-card-tags">
          {category && <span className="tag tag-home">{category}</span>}
          {body && (
            <span className="review-preview">{body.slice(0, 24)}{body.length > 24 ? '…' : ''}</span>
          )}
        </div>
        <TierBadge tier={tier} />
      </div>
    </div>
  )
}
