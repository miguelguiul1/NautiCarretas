import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config'
import { PARTES, type ParteId } from '../data/anatomia'
import { cn } from '../lib/cn'
import { useNaTela, usePrefersReducedMotion } from '../lib/hooks'
import { DesenhoCarreta } from './DesenhoCarreta'
import { IconeSeta, IconeWhatsApp } from './Icones'
import { Pendente } from './Pendente'

// mesmo recorte do viewBox do desenho (0 110 1200 410)
const LARGURA = 1200
const TOPO = 110
const ALTURA = 410

function mensagemDaPeca(servico: string) {
  return [
    'Olá, Nauticarretas! Vim pelo site.',
    `Quero um orçamento de: ${servico.toLowerCase()}.`,
    'Minha carreta é: (rodoviária / de encalhe para ...)',
    'Vou mandar fotos da carreta aqui na conversa.',
  ].join('\n')
}

export function Anatomia() {
  const [ativa, setAtiva] = useState<ParteId>('rolamentos')
  const { ref, visivel } = useNaTela<HTMLDivElement>('0px 0px -20% 0px')
  const reduzir = usePrefersReducedMotion()
  const rolagem = useRef<HTMLDivElement>(null)

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

  // No celular o desenho rola na horizontal: centraliza a peça escolhida.
  useEffect(() => {
    const el = rolagem.current
    const p = PARTES.find((x) => x.id === ativa)
    if (!el || !p || el.scrollWidth <= el.clientWidth) return
    el.scrollTo({
      left: (p.x / LARGURA) * el.scrollWidth - el.clientWidth / 2,
      behavior: reduzir ? 'auto' : 'smooth',
    })
  }, [ativa, reduzir])

  const parte = PARTES.find((p) => p.id === ativa) ?? PARTES[0]

  const mover = (delta: number) => {
    const i = PARTES.findIndex((p) => p.id === ativa)
    const prox = PARTES[(i + delta + PARTES.length) % PARTES.length]
    setAtiva(prox.id)
    document.getElementById(`peca-${prox.id}`)?.focus()
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
              Folha 01 · Carreta de encalhe · Vista lateral
            </p>
            <h2 id="anatomia-titulo" className="titulo text-3xl sm:text-5xl">
              Peça por peça.
            </h2>
          </div>
          <p className="max-w-md text-noite/75 lg:col-span-4 lg:col-start-9 lg:self-end">
            Toque numa letra do desenho para ver o que a gente faz naquela parte da carreta e pedir o
            orçamento só daquilo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Prancha */}
          <div className="min-w-0 lg:col-span-8">
            <div className="border border-noite/25 bg-galva-2">
              <div
                ref={rolagem}
                className="overflow-x-auto overscroll-x-contain"
                role="group"
                aria-label="Desenho com pontos clicáveis"
              >
                <div ref={ref} className="relative min-w-[720px] lg:min-w-0">
                  <DesenhoCarreta ativa={ativa} animar={visivel && !reduzir} />
                  {PARTES.map((p) => {
                    const sel = p.id === ativa
                    return (
                      <button
                        key={p.id}
                        id={`peca-${p.id}`}
                        type="button"
                        aria-pressed={sel}
                        aria-label={`${p.codigo}: ${p.nome}`}
                        onClick={() => setAtiva(p.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                            e.preventDefault()
                            mover(1)
                          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                            e.preventDefault()
                            mover(-1)
                          }
                        }}
                        className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center scroll-mt-40"
                        style={{
                          left: `${(p.x / LARGURA) * 100}%`,
                          top: `${((p.y - TOPO) / ALTURA) * 100}%`,
                        }}
                      >
                        {!sel && (
                          <span
                            aria-hidden="true"
                            className="marcador-pulso absolute h-7 w-7 rounded-full border border-noite/50"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'nota relative grid h-7 w-7 place-items-center rounded-full border text-[0.72rem] font-medium transition-all',
                            sel
                              ? 'scale-110 border-noite bg-noite text-ouro-claro'
                              : 'border-noite bg-galva-2 text-noite group-hover:bg-noite group-hover:text-galva-2',
                          )}
                        >
                          {p.codigo}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* Carimbo */}
              <div className="nota grid grid-cols-2 border-t border-noite/25 text-[0.64rem] text-noite/70 sm:grid-cols-4">
                <span className="border-r border-noite/25 px-3 py-2">Nauticarretas</span>
                <span className="px-3 py-2 sm:border-r sm:border-noite/25">Encalhe · lateral</span>
                <span className="border-t border-r border-noite/25 px-3 py-2 sm:border-t-0">Sem escala</span>
                <span className="border-t border-noite/25 px-3 py-2 sm:border-t-0">Folha 01/01</span>
              </div>
            </div>
            <p className="nota mt-3 text-[0.64rem] text-noite/60 lg:hidden">
              ← Arraste o desenho para os lados →
            </p>
          </div>

          {/* Painel da peça */}
          <div className="lg:col-span-4">
            <div aria-live="polite" className="relative flex h-full flex-col bg-noite p-6 text-papel sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="titulo text-6xl leading-none text-ouro">{parte.codigo}</span>
                <span className="nota pt-2 text-right text-[0.64rem] text-nevoa">
                  Detalhe {parte.codigo}
                  <br />
                  {PARTES.findIndex((p) => p.id === parte.id) + 1}/{PARTES.length}
                </span>
              </div>
              <h3 className="titulo-medio mt-6 text-2xl">{parte.nome}</h3>
              <p className="nota mt-2 text-[0.7rem] text-ouro-claro">
                <Pendente>{parte.servico}</Pendente>
              </p>
              <p className="mt-4 text-papel/85">{parte.descricao}</p>

              <div className="mt-8 flex flex-col gap-3 lg:mt-auto lg:pt-8">
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

        {/* Índice das peças: alternativa em lista ao desenho */}
        <ul className="mt-6 grid grid-cols-2 gap-px border border-noite/25 bg-noite/25 sm:grid-cols-4 lg:grid-cols-7">
          {PARTES.map((p) => (
            <li key={p.id} className="bg-galva-2 last:col-span-2 lg:last:col-span-1">
              <button
                type="button"
                onClick={() => setAtiva(p.id)}
                aria-pressed={p.id === ativa}
                className={cn(
                  'flex h-full min-h-12 w-full items-baseline gap-2 px-3 py-3 text-left text-sm transition-colors',
                  p.id === ativa ? 'bg-noite text-papel' : 'hover:bg-galva',
                )}
              >
                <span className={cn('nota', p.id === ativa ? 'text-ouro' : 'text-noite/60')}>{p.codigo}</span>
                {p.nome}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
