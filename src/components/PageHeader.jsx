const TITLES = {
  exam:   '모의고사 시행표',
  review: '컨텐츠 후기',
}
const META = {
  exam: count => `총 ${count}회 시행`,
}
const DESC = {
  review: '직접 풀어본 수학·국어 컨텐츠들의 솔직한 후기를 남깁니다.',
}

export default function PageHeader({ page, count }) {
  return (
    <div>
      <h1 className="page-title">{TITLES[page]}</h1>
      {META[page] && <p className="page-meta">{META[page](count)}</p>}
      {DESC[page] && <p className="page-desc">{DESC[page]}</p>}
    </div>
  )
}
