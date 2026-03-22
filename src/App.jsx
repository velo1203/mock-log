import { useState, useEffect } from 'react'
import PageHeader from './components/PageHeader'
import SubjectSwitch from './components/SubjectSwitch'
import FilterBar from './components/FilterBar'
import ExamTable from './components/ExamTable'
import DetailModal from './components/DetailModal'

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
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [subject, setSubject] = useState('math')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('data.json?_=' + Date.now())
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => { setAll(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const subjectData = all.filter(e => e.subject === subject)

  const sorted = [...getFiltered(all, subject, filter)].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })

  function handleSubject(s) {
    setSubject(s)
    setFilter('all')
  }

  return (
    <div className="page">
      <div className="page-header-row">
        <PageHeader all={subjectData} />
        <SubjectSwitch subject={subject} onSubject={handleSubject} />
      </div>
      <div className="divider" />
      <FilterBar filter={filter} onFilter={setFilter} />
      <ExamTable rows={sorted} loading={loading} error={error} onRowClick={setSelected} />
      <div className="page-footer">{fmtToday()}</div>
      {selected && <DetailModal exam={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
