import { useState, useEffect } from 'react'

function parseCsv(text, rowFilter) {
  const rows = []
  let cur = '', inQuote = false
  const raw = text.trim()
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i]
    if (ch === '"') {
      if (inQuote && raw[i + 1] === '"') { cur += '"'; i++ }
      else { inQuote = !inQuote }
    } else if (ch === '\n' && !inQuote) {
      rows.push(cur); cur = ''
    } else {
      cur += ch
    }
  }
  rows.push(cur)

  const headers = rows[0].split(',').map(h => h.trim())
  return rows.slice(1).map(line => {
    const values = []
    let cell = '', q = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (q && line[i + 1] === '"') { cell += '"'; i++ }
        else { q = !q }
      } else if (ch === ',' && !q) {
        values.push(cell.trim()); cell = ''
      } else {
        cell += ch
      }
    }
    values.push(cell.trim())
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
