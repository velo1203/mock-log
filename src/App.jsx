import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCsv } from './hooks/useCsv'
import Header from './components/Header'
import PageHeader from './components/PageHeader'
import SubjectSwitch from './components/exam/SubjectSwitch'
import FilterBar from './components/exam/FilterBar'
import ExamTable from './components/exam/ExamTable'
import DetailModal from './components/exam/DetailModal'
import ReviewList from './components/review/ReviewList'
import ReviewModal from './components/review/ReviewModal'

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

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const page = location.pathname === '/review' ? 'review' : 'exam'
  const setPage = (p) => navigate('/' + p)

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
  const [reviewSearch, setReviewSearch] = useState('')
  const [selectedReview, setSelectedReview] = useState(null)

  const TIER_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 }

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
    .filter(r => r.title.toLowerCase().includes(reviewSearch.toLowerCase()))
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
    <>
      <Header page={page} onPage={setPage} />
      <div className="page">
        <div className="page-header-row">
          <PageHeader page={page} count={headerCount} />
          <div className="header-controls">
            {page === 'exam' && (
              <SubjectSwitch subject={subject} onSubject={handleSubject} />
            )}
          </div>
        </div>
        {page === 'exam' && <div className="divider" />}
        {page === 'exam' && (
          <>
            <FilterBar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
            <ExamTable rows={sorted} loading={examLoading} error={examError} onRowClick={setSelected} />
          </>
        )}
        {page === 'review' && (
          <>
            <div className="filter-area" style={{ marginBottom: '20px' }}>
              <div className="search-row" style={{ width: '100%', maxWidth: '320px', height: '34px' }}>
                <i className="fa-solid fa-magnifying-glass search-icon" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="컨텐츠 검색..."
                  value={reviewSearch}
                  onChange={e => setReviewSearch(e.target.value)}
                />
                {reviewSearch && (
                  <button className="search-clear" onClick={() => setReviewSearch('')}>
                    <i className="fa-solid fa-xmark" />
                  </button>
                )}
              </div>
            </div>
            <ReviewList reviews={filteredReviews} loading={reviewLoading} error={reviewError} onRowClick={setSelectedReview} />
          </>
        )}
        <div className="page-footer">{fmtToday()}</div>
        {selected && <DetailModal exam={selected} onClose={() => setSelected(null)} />}
        {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
      </div>
    </>
  )
}
