export function TierBadge({ tier }) {
  if (!tier) return null
  return <span className={`tier-badge tier-${tier.toUpperCase()}`}>{tier.toUpperCase()}</span>
}

const SUBJECT_TAG = {
  math: { label: '수학', cls: 'tag-full' },
  korean: { label: '국어', cls: 'tag-live' },
  '수학': { label: '수학', cls: 'tag-full' },
  '국어': { label: '국어', cls: 'tag-live' },
}

export function SubjectTag({ subject }) {
  const s = SUBJECT_TAG[subject]
  if (!s) return null
  return <span className={`tag ${s.cls}`}>{s.label}</span>
}

export default function ReviewCard({ review, onClick }) {
  const { title, category, subject, review: body } = review

  return (
    <div className="review-card" onClick={onClick}>
      <div className="review-card-title">{title}</div>
      <div className="review-card-tags">
        {category && <span className="tag tag-home">{category}</span>}
        <SubjectTag subject={subject} />
      </div>
      {body && <p className="review-card-body">{body}</p>}
    </div>
  )
}
