import ReviewCard from './ReviewCard'

function SkeletonCard() {
  return (
    <div className="exam-card skeleton-card">
      <div className="exam-card-top">
        <span className="skeleton" style={{ width: '45%', height: '16px' }} />
      </div>
      <div className="exam-card-bottom">
        <div className="exam-card-tags">
          <span className="skeleton" style={{ width: '72px' }} />
          <span className="skeleton" style={{ width: '48px' }} />
        </div>
        <span className="skeleton" style={{ width: '60px' }} />
      </div>
    </div>
  )
}

export default function ReviewList({ reviews, loading, error, onRowClick }) {
  if (loading) {
    return (
      <div className="card-list">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
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
    <div className="card-list">
      {reviews.map((review, i) => (
        <ReviewCard key={i} review={review} onClick={() => onRowClick(review)} />
      ))}
    </div>
  )
}
