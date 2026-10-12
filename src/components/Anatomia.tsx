import { useEffect, useState, type KeyboardEvent } from 'react'
import { whatsappUrl } from '../config'
import { PARTES, type Parte, type ParteId } from '../data/anatomia'
import { cn } from '../lib/cn'
import { Foto } from './Foto'
import { IconeSeta, IconeWhatsApp } from './Icones'
import { Pendente } from './Pendente'

const NA_FOTO = PARTES.filter((p) => p.ponto && p.rotulo)

// Zoom do painel: a imagem fica ZOOM× a largura da caixa. Converte a posição da peça (% da foto) no
// background-position que coloca essa peça no centro horizontal da caixa.
const ZOOM = 3.3
const centralizar = (p: number) => Math.min(100, Math.max(0, ((p / 100) * ZOOM - 0.5) / (ZOOM - 1)) * 100)

function mensagemDaPeca(servico: string) {
  return [
    'Olá, Nauticarretas! Vim pelo site.',
    `Quero um orçamento de: ${servico.toLowerCase()}.`,
    'Minha carreta é: (rodoviária / de encalhe para ...)',
    'Vou mandar fotos da carreta aqui na conversa.',
  ].join('\n')
}

const idFoto = (p: Parte) => `peca-${p.id}`
// a peça sem ponto na foto recebe o id "peca-" na lista, para os links #peca-xxx funcionarem
const idLista = (p: Parte) => (p.ponto ? `lista-${p.id}` : `peca-${p.id}`)

export function Anatomia() {
  const [ativa, setAtiva] = useState<ParteId>('catraca')

  // Links "#peca-xxx" (ex.: lista de serviços) selecionam a peça.
  useEffect(() => {
    const ler = () => {
      const m = window.location.hash.match(/^#peca-(\w+)/)
      if (m && PARTES.some((p) => p.id === m[1])) setAtiva(m[1] as ParteId)
    }
    ler()
    window.addEventListener('hashchange', ler)
    return () => window.removeEventListener('hashchange', ler)
  }, [])

  const parte = PARTES.find((p) => p.id === ativa) ?? PARTES[0]

  // Setas do teclado percorrem o grupo (pontos da foto ou lista) a partir do botão em foco e levam o foco junto.
  const navegar = (e: KeyboardEvent, grupo: Parte[], id: (p: Parte) => string, atual: ParteId) => {
    const delta =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? -1
          : 0
    if (!delta) return
    e.preventDefault()
    const i = Math.max(
      0,
      grupo.findIndex((p) => p.id === atual),
    )
    const prox = grupo[(i + delta + grupo.length) % grupo.length]
    setAtiva(prox.id)
    document.getElementById(id(prox))?.focus()
  }

  return (
    <section
      id="anatomia"
      aria-labelledby="anatomia-titulo"
      className="relative bg-galva-2 py-20 text-noite sm:py-28"
    >
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="nota mb-4 text-[0.7rem] text-noite/60">
              Folha 01 · Carreta de encalhe para jet ski
            </p>
            <h2 id="anatomia-titulo" className="titulo text-3xl sm:text-5xl">
              Peça por peça.
            </h2>
          </div>
          <p className="max-w-md text-noite/75 lg:col-span-4 lg:col-start-9 lg:self-end">
            Toque numa letra da foto (ou na lista abaixo) pra ver o que a gente faz naquela parte da carreta e
            pedir o orçamento só daquilo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Prancha: foto real com pontos */}
          <div className="min-w-0 lg:col-span-8">
            <figure className="border border-noite/25 bg-noite">
              <div className="relative" role="group" aria-label="Foto da carreta com pontos clicáveis">
                <Foto
                  src="/media/anatomia-jetski"
                  pequena
                  largura={1080}
                  altura={660}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  alt="Carreta de encalhe para jet ski, preta, vista de lado no gramado: lança com engate e catraca à direita, rodas e berços à esquerda"
                  className="block aspect-[1080/660] w-full object-cover"
                />
                {/* Linhas-guia do ponto até a letra */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  {NA_FOTO.map((p) => {
                    const sel = p.id === ativa
                    const l = { x1: p.ponto!.x, y1: p.ponto!.y, x2: p.rotulo!.x, y2: p.rotulo!.y }
                    return (
                      <g key={p.id} className="transition-opacity" opacity={sel ? 1 : 0.7}>
                        <line
                          {...l}
                          stroke="#0b1023"
                          strokeOpacity="0.55"
                          strokeWidth={sel ? 4 : 3}
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          {...l}
                          stroke={sel ? '#f0d59c' : '#d8b676'}
                          strokeWidth={sel ? 1.8 : 1.2}
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    )
                  })}
                </svg>
                {/* Ponto exato da peça */}
                {NA_FOTO.map((p) => (
                  <span
                    key={p.id}
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ouro bg-noite',
                      p.id === ativa && 'h-3.5 w-3.5 border-ouro-claro bg-ouro',
                    )}
                    style={{ left: `${p.ponto!.x}%`, top: `${p.ponto!.y}%` }}
                  />
                ))}
                {/* Letras clicáveis (alvo de 44 px) */}
                {NA_FOTO.map((p) => {
                  const sel = p.id === ativa
                  const nomeAEsquerda = p.rotulo!.x > 70
                  return (
                    <button
                      key={p.id}
                      id={idFoto(p)}
                      type="button"
                      aria-pressed={sel}
                      aria-label={`${p.codigo}: ${p.nome}`}
                      onClick={() => setAtiva(p.id)}
                      onKeyDown={(e) => navegar(e, NA_FOTO, idFoto, p.id)}
                      className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 scroll-mt-40 place-items-center"
                      style={{ left: `${p.rotulo!.x}%`, top: `${p.rotulo!.y}%` }}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'nota grid h-7 w-7 place-items-center rounded-full border text-[0.72rem] font-medium transition-colors',
                          sel
                            ? 'border-ouro-claro bg-ouro text-noite'
                            : 'border-ouro bg-noite text-ouro-claro group-hover:bg-ouro group-hover:text-noite',
                        )}
                      >
                        {p.codigo}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'nota pointer-events-none absolute top-1/2 hidden -translate-y-1/2 bg-noite/85 px-2 py-1 text-[0.62rem] whitespace-nowrap sm:block',
                          nomeAEsquerda ? 'right-full mr-0.5' : 'left-full ml-0.5',
                          sel ? 'text-ouro-claro' : 'text-papel/90',
                        )}
                      >
                        {p.nome}
                        {p.indicacao && <span className="text-nevoa"> · {p.indicacao}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
              {/* Carimbo */}
              <figcaption className="nota grid grid-cols-2 border-t border-noite/25 bg-galva-2 text-[0.64rem] text-noite/70 sm:grid-cols-4">
                <span className="border-r border-noite/25 px-3 py-2">Nauticarretas</span>
                <span className="px-3 py-2 sm:border-r sm:border-noite/25">Encalhe · jet ski</span>
                <span className="border-t border-r border-noite/25 px-3 py-2 sm:border-t-0">Foto real</span>
                <span className="border-t border-noite/25 px-3 py-2 sm:border-t-0">Folha 01/01</span>
              </figcaption>
            </figure>
          </div>

          {/* Painel da peça: no desktop tem exatamente a altura da foto (o zoom ocupa o espaço que sobra) */}
          <div className="relative lg:col-span-4">
            <div
              aria-live="polite"
              className="flex flex-col bg-noite p-5 text-papel sm:p-7 lg:absolute lg:inset-0"
            >
              {/* Zoom da própria foto na peça escolhida */}
              <div
                aria-hidden="true"
                className="relative aspect-[2/1] shrink-0 overflow-hidden border border-linha bg-aco bg-no-repeat lg:aspect-auto lg:min-h-[120px] lg:flex-1 lg:shrink"
                style={{
                  backgroundImage: 'url(/media/anatomia-jetski-720.webp)',
                  backgroundSize: parte.ponto ? `${ZOOM * 100}%` : 'cover',
                  backgroundPosition: parte.ponto
                    ? `${centralizar(parte.ponto.x)}% ${parte.ponto.y}%`
                    : 'center',
                }}
              >
                <span className="titulo absolute top-2 left-3 text-4xl leading-none text-ouro drop-shadow-[0_1px_6px_rgb(11_16_35/0.9)]">
                  {parte.codigo}
                </span>
                <span className="nota absolute right-0 bottom-0 bg-noite/85 px-2 py-1 text-[0.6rem] text-nevoa">
                  {parte.ponto ? `Detalhe ${parte.codigo}` : 'Estrutura toda'} ·{' '}
                  {PARTES.findIndex((p) => p.id === parte.id) + 1}/{PARTES.length}
                </span>
                <span className="absolute top-1.5 right-1.5 h-3 w-3 border-t border-r border-ouro" />
                <span className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b border-l border-ouro" />
              </div>

              <h3 className="titulo-medio mt-5 text-2xl">{parte.nome}</h3>
              <p className="nota mt-2 text-[0.7rem] text-ouro-claro">
                <Pendente>{parte.servico}</Pendente>
              </p>
              <p className="mt-3 text-papel/85">{parte.descricao}</p>
              {!parte.ponto && (
                <p className="nota mt-3 border-l-2 border-ouro pl-3 text-[0.66rem] leading-relaxed text-nevoa">
                  Serviço geral: vale pra estrutura toda, por isso não tem um ponto na foto.
                </p>
              )}

              <div className="mt-6 flex shrink-0 flex-col gap-2">
                <a
                  href={whatsappUrl(mensagemDaPeca(parte.servico))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ouro"
                >
                  <IconeWhatsApp />
                  Pedir orçamento disso
                </a>
                <a
                  href="#orcamento"
                  className="nota flex items-center gap-2 py-2 text-[0.68rem] text-nevoa hover:text-papel"
                >
                  Ou montar o pedido completo <IconeSeta />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Índice das peças: mesma escolha em lista (inclui a peça "geral", sem ponto na foto) */}
        <ul className="mt-6 grid grid-cols-2 gap-px border border-noite/25 bg-noite/25 sm:grid-cols-4 lg:grid-cols-7">
          {PARTES.map((p) => (
            <li key={p.id} className="bg-galva-2 last:col-span-2 lg:last:col-span-1">
              <button
                id={idLista(p)}
                type="button"
                onClick={() => setAtiva(p.id)}
                onKeyDown={(e) => navegar(e, PARTES, idLista, p.id)}
                aria-pressed={p.id === ativa}
                className={cn(
                  'flex h-full min-h-12 w-full items-baseline gap-2 px-3 py-3 text-left text-sm transition-colors',
                  p.id === ativa ? 'bg-noite text-papel' : 'hover:bg-galva',
                )}
              >
                <span className={cn('nota', p.id === ativa ? 'text-ouro' : 'text-noite/60')}>{p.codigo}</span>
                {p.nome}
                {!p.ponto && (
                  <span
                    className={cn(
                      'nota ml-auto text-[0.6rem]',
                      p.id === ativa ? 'text-nevoa' : 'text-noite/55',
                    )}
                  >
                    geral
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
