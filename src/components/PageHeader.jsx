const TITLES = {
  exam:   '모의고사 시행표',
  report: '1인1프로젝트 보고서',
}
const META = {
  exam: count => `총 ${count}회 시행`,
}
const DESC = {
  report: '계획서, 결과보고서, 포트폴리오 내용을 블로그 형식으로 정리했습니다.',
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
