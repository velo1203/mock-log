import ReviewCard from './ReviewCard'

const TIERS = ['S', 'A', 'B', 'C', 'D']

function SkeletonCard() {
  return (
    <div className="review-card skeleton-card">
      <div className="skeleton" style={{ width: '50%', height: '15px', marginBottom: '10px' }} />
      <div className="skeleton" style={{ width: '80%', height: '12px' }} />
    </div>
  )
}

export default function ReviewList({ reviews, loading, error, onRowClick }) {
  if (loading) {
    return (
      <div>
        {[0, 1].map(i => (
          <div key={i} className="review-section">
            <div className="skeleton" style={{ width: '60px', height: '13px', marginBottom: '12px' }} />
            <div className="review-grid">
              {[0, 1].map(j => <SkeletonCard key={j} />)}
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (error) {
    return (
      <div className="state-card">
        <i className="state-icon fa-solid fa-circle-exclamation" />
        data를 불러올 수 없습니다.
      </div>
    )
  }
  if (reviews.length === 0) {
    return (
      <div className="state-card">
        <i className="state-icon fa-solid fa-book-open" />
        등록된 후기가 없습니다.
      </div>
    )
  }

  return (
    <div className="review-sections">
      {TIERS.map(tier => {
        const items = reviews.filter(r => r.tier?.toUpperCase() === tier)
        if (items.length === 0) return null
        return (
          <div key={tier} className="review-section">
            <div className="review-section-header">
              <span className={`review-tier-label tier-text-${tier}`}>{tier} 티어</span>
              <span className="review-section-line" />
              <span className="review-section-count">{items.length}개</span>
            </div>
            <div className="review-grid">
              {items.map((review, i) => (
                <ReviewCard key={i} review={review} onClick={() => onRowClick(review)} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
