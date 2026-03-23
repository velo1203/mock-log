export function TierBadge({ tier }) {
  if (!tier) return null
  return <span className={`tier-badge tier-${tier.toUpperCase()}`}>{tier.toUpperCase()}</span>
}

export default function ReviewCard({ review, onClick }) {
  const { title, category, review: body } = review

  return (
    <div className="review-card" onClick={onClick}>
      <div className="review-card-title">{title}</div>
      <div className="review-card-bottom">
        {category && <span className="tag tag-home">{category}</span>}
        {body && (
          <span className="review-preview">{body.slice(0, 40)}{body.length > 40 ? '…' : ''}</span>
        )}
      </div>
    </div>
  )
}
