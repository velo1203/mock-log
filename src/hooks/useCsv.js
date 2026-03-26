import { useState, useEffect } from 'react'

function parseCsv(text, rowFilter) {
  const result = []
  let row = [], cell = '', inQuote = false
  const raw = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i]
    if (ch === '"') {
      if (inQuote && raw[i + 1] === '"') { cell += '"'; i++ }
      else { inQuote = !inQuote }
    } else if (ch === ',' && !inQuote) {
      row.push(cell.trim()); cell = ''
    } else if (ch === '\n' && !inQuote) {
      row.push(cell.trim()); result.push(row); row = []; cell = ''
    } else {
      cell += ch
    }
  }
  row.push(cell.trim())
  if (row.some(c => c !== '')) result.push(row)

  const headers = result[0]
  return result.slice(1).map(values => {
    const obj = {}
    headers.forEach((h, i) => { obj[h] = values[i] ?? '' })
    return obj
  }).filter(rowFilter)
}

export function useCsv(url, rowFilter) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) { setLoading(false); return }
    const bustUrl = `${url}&t=${Date.now()}`
    fetch(bustUrl)
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(csv => { setData(parseCsv(csv, rowFilter)); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { data, loading, error }
}
