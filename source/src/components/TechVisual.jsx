// Abstract technical compositions used where no real photograph exists.
export default function TechVisual({ variant = 'curve', label = '' }) {
  return (
    <svg viewBox="0 0 800 600" role="img" aria-label={label} className="absolute inset-0 h-full w-full bg-paper-2" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`g-${variant}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#0F1213" strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#g-${variant})`} />
      {variant === 'analysis' ? (
        <g fill="none" stroke="#0F1213">
          {[['VOLUME', 250], ['INTENSIDADE', 170], ['RECUPERAÇÃO', 330]].map(([l, w], i) => {
            const y = 200 + i * 125
            return (
              <g key={l}>
                <path d={`M170 ${y}H630`} strokeOpacity=".35" />
                {Array.from({ length: 21 }).map((_, k) => (
                  <path key={k} d={`M${170 + k * 23} ${y}v${k % 5 === 0 ? 18 : 9}`} strokeOpacity=".45" />
                ))}
                <rect data-draw pathLength="1" x="170" y={y - 36} width={w} height="22" strokeWidth="2" stroke={i === 1 ? '#14CFB1' : '#0F1213'} />
                <text x="170" y={y - 56} fill="#0F1213" fillOpacity=".55" stroke="none" fontSize="14" fontWeight="700" letterSpacing="3">{l}</text>
              </g>
            )
          })}
        </g>
      ) : variant === 'bars' ? (
        <g fill="none" stroke="#0F1213">
          <path d="M60 520H740" strokeOpacity=".5" />
          {[0, 1, 2, 3, 4].map((i) => {
            const h = 80 + i * 70
            return (
              <rect key={i} data-draw pathLength="1" x={100 + i * 128} y={520 - h} width="88" height={h} strokeWidth="2" stroke={i === 4 ? '#14CFB1' : '#0F1213'} strokeOpacity={i === 4 ? 1 : 0.35 + i * 0.12} />
            )
          })}
          <path d="M100 440L228 372L356 292L484 220L612 120" strokeOpacity=".4" strokeDasharray="4 8" />
          <g fill="#0F1213" fillOpacity=".55" stroke="none" fontSize="14" fontWeight="700" letterSpacing="3">
            <text x="60" y="552">INICIAÇÃO</text>
            <text x="620" y="552">DIFERENCIAÇÃO</text>
          </g>
        </g>
      ) : variant === 'curve' ? (
        <g fill="none" stroke="#0F1213" strokeLinecap="square">
          <path d="M60 520H740M60 520V60" strokeOpacity=".5" />
          <path data-draw pathLength="1" d="M60 470C150 480 190 520 260 420S400 330 470 300S600 170 740 110" strokeWidth="2.5" />
          <path d="M60 200H740" strokeOpacity=".25" strokeDasharray="4 8" />
          {[[260, 420], [470, 300], [740, 110]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x} ${y}V520`} strokeOpacity=".25" strokeDasharray="3 6" />
              <circle cx={x} cy={y} r="8" fill="#0c0f10" strokeWidth="2" stroke={i === 2 ? '#14CFB1' : '#0F1213'} />
            </g>
          ))}
          <g fill="#0F1213" fillOpacity=".55" stroke="none" fontSize="14" fontWeight="700" letterSpacing="3">
            <text x="60" y="552">INÍCIO</text>
            <text x="440" y="552">PROGRESSÃO</text>
            <text x="650" y="552">RETORNO</text>
          </g>
        </g>
      ) : (
        <g fill="none" stroke="#0F1213">
          {[250, 190, 130, 70].map((r, i) => (
            <rect key={r} data-draw pathLength="1" x={400 - r} y={300 - r} width={r * 2} height={r * 2} strokeOpacity={0.9 - i * 0.18} strokeWidth="2" />
          ))}
          <path d="M60 300H740M400 40V560" strokeOpacity=".4" />
          <circle cx="400" cy="300" r="10" stroke="#14CFB1" strokeWidth="2.5" />
          <path d="M400 270V250M400 330V350M370 300H350M430 300H450" stroke="#14CFB1" strokeWidth="2.5" />
          {Array.from({ length: 21 }).map((_, i) => (
            <path key={i} d={`M${60 + i * 34} 552v${i % 5 === 0 ? 18 : 9}`} strokeOpacity=".5" />
          ))}
        </g>
      )}
    </svg>
  )
}
