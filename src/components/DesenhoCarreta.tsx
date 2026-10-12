import type { ParteId } from '../data/anatomia'

/*
  Desenho técnico (vista lateral) de uma carreta de encalhe. viewBox 1200 × 520.
  Cada <g data-parte> é destacado quando a peça correspondente está ativa.
  Sem medidas numéricas: as cotas dizem "conforme o casco", porque cada carreta é feita para um barco.
*/

type Props = { ativa: ParteId | null; animar: boolean }

export function DesenhoCarreta({ ativa, animar }: Props) {
  const a = (id: ParteId) => ({ 'data-parte': id, 'data-ativo': ativa === id ? 'true' : 'false' })

  return (
    <svg
      viewBox="0 110 1200 410"
      className={`desenho h-auto w-full ${animar ? 'desenho-animado' : ''}`}
      role="img"
      aria-labelledby="desenho-titulo desenho-desc"
    >
      <title id="desenho-titulo">Desenho técnico de uma carreta de encalhe, vista lateral</title>
      <desc id="desenho-desc">
        Engate e ganchos na ponta da lança, catraca no poste da proa, chassi, berços onde o casco apoia,
        rodagem com rolamentos no cubo e a parte traseira galvanizada.
      </desc>

      <defs>
        <pattern
          id="hachura"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </pattern>
        <pattern id="carpete" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="currentColor" opacity="0.08" />
          <circle cx="2" cy="2" r="0.8" fill="currentColor" opacity="0.4" />
        </pattern>
        <marker
          id="seta"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* Casco em linha fantasma */}
      <path
        d="M432 214 C 520 248 640 266 800 272 L 1122 276 L 1132 150 L 620 150 C 540 156 470 186 432 214 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="10 5 2 5"
        opacity="0.38"
      />
      <text x="770" y="140" className="rotulo-desenho" opacity="0.6">
        CASCO · LINHA DE REFERÊNCIA
      </text>

      {/* Chão */}
      <line x1="10" y1="476" x2="1190" y2="476" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="477" width="1180" height="9" fill="url(#hachura)" />

      {/* Chassi: lança + longarina */}
      <g {...a('chassi')} className="parte">
        <path className="traco" pathLength={1} d="M128 298 H470 L500 318 H1104 V338 H486 L456 316 H128 Z" />
        {[540, 700, 880, 1040].map((x) => (
          <rect key={x} x={x - 6} y={322} width={12} height={12} className="detalhe" />
        ))}
        {[180, 260, 380].map((x) => (
          <circle key={x} cx={x} cy={307} r={2.6} className="detalhe" />
        ))}
      </g>

      {/* Rodinha de apoio (sem hotspot) */}
      <g className="parte-neutra">
        <rect x="202" y="292" width="16" height="30" />
        <line x1="210" y1="322" x2="210" y2="432" />
        <path d="M200 432 h20 v6 h-20 z" />
        <circle cx="210" cy="454" r="20" />
        <circle cx="210" cy="454" r="5" />
      </g>

      {/* Berços com revestimento */}
      <g {...a('bercos')} className="parte">
        {[560, 760, 960].map((x) => (
          <path
            key={x}
            className="traco"
            pathLength={1}
            d={`M${x - 8} 318 L${x - 4} 294 H${x + 4} L${x + 8} 318`}
          />
        ))}
        <path
          className="traco"
          pathLength={1}
          d="M488 270 L1110 280 L1110 296 L488 286 Z"
          style={{ fill: 'url(#carpete)' }}
        />
        <line x1="488" y1="278" x2="1110" y2="288" className="detalhe" strokeDasharray="3 4" />
      </g>

      {/* Catraca no poste da proa */}
      <g {...a('catraca')} className="parte">
        <path className="traco" pathLength={1} d="M294 298 V188 H310 V298" />
        <path className="traco" pathLength={1} d="M364 298 L310 236" />
        <path d="M286 180 h40 l-6 10 h-28 z" className="detalhe" />
        <rect className="traco" pathLength={1} x="276" y="226" width="52" height="30" rx="3" />
        <circle cx="302" cy="241" r="11" className="detalhe" />
        <path d="M328 241 L356 222 M352 218 l8 8" className="detalhe" />
        <path d="M296 236 C 360 226 400 218 432 214" className="detalhe" strokeDasharray="6 4" />
      </g>

      {/* Engate e ganchos */}
      <g {...a('engate')} className="parte">
        <path
          className="traco"
          pathLength={1}
          d="M130 296 H72 C 56 296 44 304 44 314 C 44 326 56 330 70 330 H96 L102 318 H130 Z"
        />
        <path d="M70 296 C 70 278 92 278 92 296" className="detalhe" />
        <circle cx="70" cy="330" r="9" className="detalhe" />
        <path d="M124 318 C 120 346 96 360 82 352 C 74 348 76 340 84 340" className="detalhe" />
        <path d="M84 340 c-6 0 -8 8 -2 10" className="detalhe" />
      </g>

      {/* Rodagem: feixe de mola, paralama, pneu e roda */}
      <g {...a('rodagem')} className="parte">
        <path d="M770 340 C 800 356 880 356 910 340" className="detalhe" />
        <path d="M776 346 C 806 360 874 360 904 346" className="detalhe" />
        <path className="traco" pathLength={1} d="M742 338 C 750 290 930 290 938 338" />
        <circle className="traco" pathLength={1} cx="840" cy="410" r="66" />
        <circle cx="840" cy="410" r="56" className="detalhe" opacity="0.5" />
        <circle cx="840" cy="410" r="38" className="detalhe" />
        {[0, 72, 144, 216, 288].map((g) => {
          const r = (g * Math.PI) / 180
          return (
            <circle
              key={g}
              cx={840 + Math.cos(r) * 24}
              cy={410 + Math.sin(r) * 24}
              r="3"
              className="detalhe"
            />
          )
        })}
      </g>

      {/* Rolamentos: cubo da roda + detalhe */}
      <g {...a('rolamentos')} className="parte">
        <circle cx="840" cy="410" r="13" className="detalhe" />
        <circle cx="840" cy="410" r="6" className="detalhe" />
        <circle cx="840" cy="410" r="20" className="detalhe" strokeDasharray="3 3" />
      </g>

      {/* Galvanização: traseira hachurada + lanterna */}
      <g {...a('galvanizacao')} className="parte">
        <rect x="1030" y="318" width="74" height="20" style={{ fill: 'url(#hachura)' }} />
        <rect className="traco" pathLength={1} x="1104" y="304" width="26" height="22" />
        <rect x="1110" y="309" width="14" height="8" className="detalhe" />
      </g>

      {/* Cota geral, sem números */}
      <g className="cota">
        <line x1="44" y1="504" x2="1130" y2="504" markerStart="url(#seta)" markerEnd="url(#seta)" />
        <line x1="44" y1="488" x2="44" y2="512" />
        <line x1="1130" y1="488" x2="1130" y2="512" />
        <rect x="470" y="494" width="260" height="20" fill="var(--papel-desenho)" stroke="none" />
        <text x="600" y="508" textAnchor="middle" className="rotulo-desenho">
          COMPRIMENTO · CONFORME O CASCO
        </text>
      </g>
    </svg>
  )
}
