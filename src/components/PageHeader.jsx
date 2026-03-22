export default function PageHeader({ all }) {
  return (
    <div>
      <h1 className="page-title">모의고사 시행표</h1>
      <p className="page-meta">총 {all.length}회 시행</p>
    </div>
  )
}
