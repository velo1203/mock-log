import ExamRow from './ExamRow'
import ExamCard from './ExamCard'

const StateCell = ({ colSpan, children }) => (
  <tr className="state-row"><td colSpan={colSpan}>{children}</td></tr>
)

export default function ExamTable({ rows, loading, error, onRowClick }) {
  // ── Desktop table body ──
  let tableBody
  if (loading) {
    tableBody = <StateCell colSpan={7}><i className="state-icon fa-solid fa-circle-notch fa-spin" /></StateCell>
  } else if (error) {
    tableBody = (
      <StateCell colSpan={7}>
        <i className="state-icon fa-solid fa-circle-exclamation" />
        data.json 파일을 불러올 수 없습니다.<br />
        <span style={{ color: 'var(--text-placeholder)', fontSize: '0.8125rem' }}>
          로컬 서버(npx serve · python -m http.server) 또는 호스팅 환경에서 실행하세요.
        </span>
      </StateCell>
    )
  } else if (rows.length === 0) {
    tableBody = <StateCell colSpan={7}><i className="state-icon fa-solid fa-inbox" />표시할 항목이 없습니다.</StateCell>
  } else {
    tableBody = rows.map((exam, i) => (
      <ExamRow key={i} exam={exam} num={rows.length - i} onClick={() => onRowClick(exam)} />
    ))
  }

  // ── Mobile card body ──
  let cardBody
  if (loading) {
    cardBody = <div className="state-card"><i className="state-icon fa-solid fa-circle-notch fa-spin" /></div>
  } else if (error) {
    cardBody = (
      <div className="state-card">
        <i className="state-icon fa-solid fa-circle-exclamation" />
        data.json 파일을 불러올 수 없습니다.
      </div>
    )
  } else if (rows.length === 0) {
    cardBody = <div className="state-card"><i className="state-icon fa-solid fa-inbox" />표시할 항목이 없습니다.</div>
  } else {
    cardBody = rows.map((exam, i) => (
      <ExamCard key={i} exam={exam} onClick={() => onRowClick(exam)} />
    ))
  }

  return (
    <>
      {/* Desktop */}
      <div className="db-card desktop-only">
        <table className="db-table">
          <thead>
            <tr>
              <th className="col-num">
                <div className="th-cell" style={{ justifyContent: 'center' }}>
                  <i className="fa-solid fa-hashtag" />
                </div>
              </th>
              <th className="col-name">
                <div className="th-cell"><i className="fa-regular fa-file-lines" /> 시험명</div>
              </th>
              <th className="col-date">
                <div className="th-cell"><i className="fa-regular fa-calendar" /> 날짜</div>
              </th>
              <th className="col-type">
                <div className="th-cell" style={{ justifyContent: 'center' }}>
                  <i className="fa-solid fa-tag" /> 유형
                </div>
              </th>
              <th className="col-place">
                <div className="th-cell" style={{ justifyContent: 'center' }}>
                  <i className="fa-regular fa-map" /> 장소
                </div>
              </th>
              <th className="col-score">
                <div className="th-cell" style={{ justifyContent: 'center' }}>
                  <i className="fa-regular fa-star" /> 점수
                </div>
              </th>
              <th className="col-arrow" />
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="card-list mobile-only">{cardBody}</div>
    </>
  )
}
