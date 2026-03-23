import { useState, useEffect } from 'react'
import PageHeader from './components/PageHeader'
import PageNav from './components/PageNav'
import SubjectSwitch from './components/SubjectSwitch'
import FilterBar from './components/FilterBar'
import ExamTable from './components/ExamTable'
import DetailModal from './components/DetailModal'
import ReviewList from './components/ReviewList'
import ReviewModal from './components/ReviewModal'

function parseCsv(text, rowFilter) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = []
    let cur = '', inQuote = false
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote }
      else if (ch === ',' && !inQuote) { values.push(cur.trim()); cur = '' }
      else { cur += ch }
    }
    values.push(cur.trim())
    const obj = {}
    headers.forEach((h, i) => { obj[h] = values[i] ?? '' })
    return obj
  }).filter(rowFilter)
}

function getFiltered(all, subject, filter) {
  let data = all.filter(e => e.subject === subject)
  if (filter === 'full') return data.filter(e => e.type === 'full')
  if (filter === 'half') return data.filter(e => e.type === 'half')
  if (filter === 'live') return data.filter(e => e.place === 'live')
  if (filter === 'home') return data.filter(e => e.place === 'home')
  return data
}

function fmtToday() {
  const d = new Date()
  return '업데이트: ' + d.getFullYear() + '.' +
    String(d.getMonth() + 1).padStart(2, '0') + '.' +
    String(d.getDate()).padStart(2, '0')
}

function useCsv(url, rowFilter) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) { setLoading(false); return }
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(csv => { setData(parseCsv(csv, rowFilter)); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { data, loading, error }
}

export default function App() {
  const [page, setPage] = useState('exam')

  // 모의고사
  const { data: all, loading: examLoading, error: examError } = useCsv(
    import.meta.env.VITE_CSV_URL, row => !!row.name
  )
  const [subject, setSubject] = useState('math')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  // 후기 — 같은 스프레드시트의 시트2 (gid=770427134)
  const reviewCsvUrl = import.meta.env.VITE_CSV_URL
    ? import.meta.env.VITE_CSV_URL + '&gid=770427134'
    : undefined
  const { data: reviews, loading: reviewLoading, error: reviewError } = useCsv(
    reviewCsvUrl, row => !!row.title
  )
  const [reviewSubject, setReviewSubject] = useState('math')
  const [selectedReview, setSelectedReview] = useState(null)

  const TIER_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 }
  const SUBJECT_ALIAS = { math: ['math', '수학'], korean: ['korean', '국어'] }

  const subjectData = all.filter(e => e.subject === subject)

  const sorted = [...getFiltered(all, subject, filter)]
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return b.date.localeCompare(a.date)
    })

  const filteredReviews = [...reviews]
    .filter(r => SUBJECT_ALIAS[reviewSubject]?.includes(r.subject))
    .sort((a, b) => {
      const ta = TIER_ORDER[a.tier?.toUpperCase()] ?? 99
      const tb = TIER_ORDER[b.tier?.toUpperCase()] ?? 99
      return ta - tb
    })

  function handleSubject(s) {
    setSubject(s)
    setFilter('all')
  }

  const headerCount = page === 'exam' ? subjectData.length : filteredReviews.length

  return (
    <div className="page">
      <div className="page-header-row">
        <PageHeader page={page} count={headerCount} />
        <div className="header-controls">
          <PageNav page={page} onPage={setPage} />
          {page === 'exam' && (
            <SubjectSwitch subject={subject} onSubject={handleSubject} />
          )}
          {page === 'review' && (
            <SubjectSwitch subject={reviewSubject} onSubject={setReviewSubject} />
          )}
        </div>
      </div>
      <div className="divider" />
      {page === 'exam' && (
        <>
          <FilterBar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
          <ExamTable rows={sorted} loading={examLoading} error={examError} onRowClick={setSelected} />
        </>
      )}
      {page === 'review' && (
        <ReviewList reviews={filteredReviews} loading={reviewLoading} error={reviewError} onRowClick={setSelectedReview} />
      )}
      <div className="page-footer">{fmtToday()}</div>
      {selected && <DetailModal exam={selected} onClose={() => setSelected(null)} />}
      {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
    </div>
  )
}
