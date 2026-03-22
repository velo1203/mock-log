const SUBJECTS = [
  { key: 'math',   label: '수학' },
  { key: 'korean', label: '국어' },
]

export default function SubjectSwitch({ subject, onSubject }) {
  return (
    <div className="subject-switch">
      {SUBJECTS.map(s => (
        <button
          key={s.key}
          className={'subject-btn' + (subject === s.key ? ' on' : '')}
          onClick={() => onSubject(s.key)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
