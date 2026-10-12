import { useEffect, useRef, useState } from 'react'
import { MENSAGEM_PADRAO, NEGOCIO, whatsappUrl } from '../config'
import { usePrefersReducedMotion } from '../lib/hooks'
import { IconePause, IconePlay, IconeSeta, IconeWhatsApp } from './Icones'

/*
  Opções de headline (a partir da bio):
  1. "Do engate ao berço: a gente faz, reforma e mantém."   ← escolhida
  2. "Carreta rodoviária, carreta de encalhe. Nova, reformada ou revisada."
  3. "Seu barco vai para a água em cima do nosso trabalho."
*/

export function Hero() {
  const video = useRef<HTMLVideoElement>(null)
  const reduzir = usePrefersReducedMotion()
  const [tocando, setTocando] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduzir) {
      v.pause()
      return
    }
    v.play().catch(() => setTocando(false))
  }, [reduzir])

  const alternar = () => {
    const v = video.current
    if (!v) return
    if (v.paused) v.play().catch(() => undefined)
    else v.pause()
  }

  return (
    <section id="topo" aria-labelledby="hero-titulo" className="relative isolate overflow-hidden pt-20">
      {/* Grade técnica de fundo, bem sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #eceef3 1px, transparent 1px), linear-gradient(to bottom, #eceef3 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-site relative grid min-h-[calc(100svh-5rem)] content-end gap-10 pt-8 pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:content-center lg:items-center lg:gap-16 lg:py-12">
        <div className="relative z-10">
          <p className="nota mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-papel/80 lg:text-nevoa">
            <span className="text-ouro">Oficina</span>
            <span aria-hidden="true" className="h-px w-6 bg-linha" />
            <span>{NEGOCIO.endereco.bairro}</span>
            <span aria-hidden="true">·</span>
            <span>{NEGOCIO.endereco.regiao}</span>
          </p>

          <h1 id="hero-titulo" className="titulo text-[2.55rem] sm:text-6xl xl:text-[5.4rem]">
            Do engate
            <br />
            ao berço<span className="text-ouro">:</span>
            <span className="mt-3 block text-[0.52em] leading-[1.08] font-bold text-papel/90 [font-stretch:115%]">
              a gente faz, reforma e mantém a sua carreta.
            </span>
          </h1>

          <ul className="mt-8 hidden max-w-xl gap-px overflow-hidden border border-linha bg-linha sm:grid sm:grid-cols-3">
            {['Rodoviárias e de encalhe', 'Reformas e manutenção', 'Náuticas sob medida'].map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 bg-noite px-4 py-3">
                <span className="nota text-ouro">0{i + 1}</span>
                <span className="text-sm leading-snug text-papel/90">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-sm text-papel/85 sm:hidden">{NEGOCIO.bio}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-9">
            <a href="#orcamento" className="btn btn-ouro">
              Pedir orçamento
              <IconeSeta />
            </a>
            <a
              href={whatsappUrl(MENSAGEM_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-linha bg-noite/40 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
            >
              <IconeWhatsApp />
              {NEGOCIO.whatsappExibicao}
            </a>
          </div>
        </div>

        {/* Vídeo da oficina: fundo de tela cheia no celular, moldura vertical anotada no desktop */}
        <div className="absolute inset-0 lg:relative lg:inset-auto">
          <figure className="relative h-full lg:mx-auto lg:h-auto lg:max-w-[460px]">
            <div className="relative h-full lg:h-auto">
              <div className="relative h-full w-full overflow-hidden bg-aco lg:aspect-[720/1100] lg:h-auto lg:max-h-[78svh]">
                <video
                  ref={video}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={!reduzir}
                  preload="auto"
                  poster="/media/hero-oficina-poster.webp"
                  onPlay={() => setTocando(true)}
                  onPause={() => setTocando(false)}
                  aria-label="Carreta de encalhe de madeira na oficina: engate, placa Nauticarretas e longarinas envernizadas"
                >
                  <source src="/media/hero-oficina.webm" type="video/webm" />
                  <source src="/media/hero-oficina.mp4" type="video/mp4" />
                </video>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noite via-noite/80 to-noite/20 lg:inset-x-0 lg:top-auto lg:h-1/3 lg:from-noite/80 lg:via-transparent lg:to-transparent"
                />
                <button
                  type="button"
                  onClick={alternar}
                  className="nota absolute top-24 right-4 z-20 flex min-h-11 items-center gap-2 border border-papel/30 bg-noite/70 px-3 text-[0.68rem] text-papel backdrop-blur transition-colors hover:border-ouro lg:top-auto lg:right-3 lg:bottom-3"
                  aria-label={tocando ? 'Pausar vídeo' : 'Tocar vídeo'}
                >
                  {tocando ? <IconePause /> : <IconePlay />}
                  {tocando ? 'Pausar' : 'Tocar'}
                </button>
              </div>
              {/* cantoneiras */}
              <span
                aria-hidden="true"
                className="absolute -top-2 -left-2 hidden h-5 w-5 border-t border-l border-ouro lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute -right-2 -bottom-2 hidden h-5 w-5 border-r border-b border-ouro lg:block"
              />
            </div>
            <figcaption className="nota mt-4 hidden justify-between gap-4 text-[0.68rem] text-nevoa lg:flex">
              <span>Encalhe em madeira · na oficina</span>
              <span className="text-ouro/80">Ref. 01</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
