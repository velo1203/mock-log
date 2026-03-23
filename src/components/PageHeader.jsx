const TITLES = {
  exam:   '모의고사 시행표',
  review: '학습 후기',
}
const META = {
  exam:   count => `총 ${count}회 시행`,
  review: count => `총 ${count}개`,
}

export default function PageHeader({ page, count }) {
  return (
    <div>
      <h1 className="page-title">{TITLES[page]}</h1>
      <p className="page-meta">{META[page](count)}</p>
    </div>
  )
}
