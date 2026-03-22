function fmtDate(d) {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${y}.${m}.${day}`
}

export default function ExamRow({ exam, num, onClick }) {
  const { name, date, type, place, score } = exam

  const n = score !== '' && score != null ? score : null

  const typeTag = type === 'full'
    ? <span className="tag tag-full"><i className="fa-regular fa-circle" /> 풀모의</span>
    : <span className="tag tag-half"><i className="fa-solid fa-circle-half-stroke" /> 하프모의</span>

  const placeTag = place === 'live'
    ? <span className="tag tag-live"><i className="fa-regular fa-building" /> 현장</span>
    : <span className="tag tag-home"><i className="fa-solid fa-house" /> 집모</span>

  return (
    <tr onClick={onClick}>
      <td className="col-num"><span className="cell-num">{num}</span></td>
      <td className="col-name"><span className="cell-name">{name}</span></td>
      <td className="col-date"><span className="cell-date">{fmtDate(date)}</span></td>
      <td className="col-type">{typeTag}</td>
      <td className="col-place">{placeTag}</td>
      <td className="col-score">
        {n !== null
          ? <span className="score">{n}</span>
          : <span className="no-score">—</span>}
      </td>
      <td className="col-arrow">
        <i className="fa-solid fa-chevron-right row-arrow" />
      </td>
    </tr>
  )
}
