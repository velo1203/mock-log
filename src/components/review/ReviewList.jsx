import ReviewCard from './ReviewCard'

const TIERS = ['S', 'A', 'B', 'C', 'D']

function SkeletonCard() {
  return (
    <div className="review-card skeleton-card">
      {/* 제목 */}
      <div className="skeleton" style={{ width: '60%', height: '16px', marginBottom: '8px' }} />
      {/* 태그 2개 */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <span className="skeleton" style={{ width: '44px', height: '20px', borderRadius: '4px' }} />
        <span className="skeleton" style={{ width: '36px', height: '20px', borderRadius: '4px' }} />
      </div>
      {/* 본문 2줄 */}
      <div className="skeleton" style={{ width: '100%', height: '12px', marginBottom: '5px' }} />
      <div className="skeleton" style={{ width: '75%', height: '12px' }} />
    </div>
  )
}

function SkeletonSection() {
  return (
    <div className="review-section">
      {/* 섹션 헤더: 티어 라벨 + 선 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
        <div className="skeleton" style={{ width: '48px', height: '13px', flexShrink: 0 }} />
        <div className="skeleton" style={{ flex: 1, height: '1px' }} />
        <div className="skeleton" style={{ width: '24px', height: '13px', flexShrink: 0 }} />
      </div>
      <div className="review-grid">
        {[0, 1].map(j => <SkeletonCard key={j} />)}
      </div>
    </div>
  )
}

export default function ReviewList({ reviews, loading, error, onRowClick }) {
  if (loading) {
    return (
      <div className="review-sections">
        {[0, 1].map(i => <SkeletonSection key={i} />)}
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
