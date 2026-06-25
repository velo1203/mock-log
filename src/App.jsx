import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCsv } from './hooks/useCsv'
import Header from './components/Header'
import PageHeader from './components/PageHeader'
import SubjectSwitch from './components/exam/SubjectSwitch'
import FilterBar from './components/exam/FilterBar'
import ExamTable from './components/exam/ExamTable'
import DetailModal from './components/exam/DetailModal'
import ReportPage from './components/report/ReportPage'

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
  const page = location.pathname === '/report' ? 'report' : 'exam'
  const setPage = (p) => navigate('/' + p)

  // 모의고사
  const { data: all, loading: examLoading, error: examError } = useCsv(
    import.meta.env.VITE_CSV_URL, row => !!row.name
  )
  const [subject, setSubject] = useState('math')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const subjectData = all.filter(e => e.subject === subject)

  const sorted = [...getFiltered(all, subject, filter)]
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return b.date.localeCompare(a.date)
    })

  function handleSubject(s) {
    setSubject(s)
    setFilter('all')
  }

  const headerCount = page === 'exam' ? subjectData.length : undefined

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
        {page === 'report' && <ReportPage />}
        <div className="page-footer">{fmtToday()}</div>
        {selected && <DetailModal exam={selected} onClose={() => setSelected(null)} />}
      </div>
    </>
  )
}
