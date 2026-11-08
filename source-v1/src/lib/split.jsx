export function Lines({ lines, as: Tag = 'span', className = '', lineClass = '', classes = [], dataAttr = 'data-line' }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span className={`line ${lineClass}`} key={i}>
          <span className={`line-inner ${classes[i] || ''}`} {...{ [dataAttr]: '' }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function Words({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span className="word" key={i}>
          {w + (i < words.length - 1 ? ' ' : '')}
        </span>
      ))}
    </span>
  )
}
