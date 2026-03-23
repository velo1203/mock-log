export function TierBadge({ tier }) {
  if (!tier) return null
  return <span className={`tier-badge tier-${tier.toUpperCase()}`}>{tier.toUpperCase()}</span>
}

export default function ReviewCard({ review, onClick }) {
  const { title, category, review: body } = review

  return (
    <div className="review-card" onClick={onClick}>
      <div className="review-card-title">{title}</div>
      {category && <span className="review-card-category">{category}</span>}
      {body && <p className="review-card-body">{body}</p>}
    </div>
  )
}
