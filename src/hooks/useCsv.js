import { useState, useEffect } from 'react'

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
