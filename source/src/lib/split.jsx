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

// Same masked lines as <Lines>, but every letter is its own element so it can react to the pointer.
export function CharLines({ lines, classes = [], dataAttr = 'data-line' }) {
  return (
    <span>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span className={`line-inner ${classes[i] || ''}`} {...{ [dataAttr]: '' }}>
            {l.split(' ').map((w, wi, arr) => (
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {[...w].map((c, ci) => (
                    <span className="char" data-char key={ci}>{c}</span>
                  ))}
                </span>
                {wi < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}
