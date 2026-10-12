import { useEffect, useRef, useState } from 'react'
import { GALERIA, type ItemGaleria } from '../data/galeria'
import { cn } from '../lib/cn'
import { useNaTela, usePrefersReducedMotion } from '../lib/hooks'
import { Foto } from './Foto'
import { IconeChevron, IconePlay } from './Icones'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'

// Posição de cada item na grade (desktop, 12 colunas). Mesmo índice de GALERIA.
const LAYOUT = [
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-6 lg:row-span-2',
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-4 lg:row-span-2',
]

function VideoMiniatura({ item }: { item: Extract<ItemGaleria, { tipo: 'video' }> }) {
  const reduzir = usePrefersReducedMotion()
  const { ref, visivel } = useNaTela<HTMLDivElement>('0px')
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (visivel && !reduzir) v.play().catch(() => undefined)
    else v.pause()
  }, [visivel, reduzir])

  return (
    <div ref={ref} className="h-full w-full">
      <video
        ref={video}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={`${item.src}-poster.webp`}
        aria-hidden="true"
      >
        <source src={`${item.src}.webm`} type="video/webm" />
        <source src={`${item.src}.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

export function Oficina() {
  const [aberto, setAberto] = useState<number | null>(null)
  const item = aberto === null ? null : GALERIA[aberto]

  const mover = (delta: number) =>
    setAberto((i) => (i === null ? i : (i + delta + GALERIA.length) % GALERIA.length))

  return (
    <section id="oficina" aria-labelledby="oficina-titulo" className="py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 border-t border-linha pt-8 lg:grid-cols-12">
          <h2 id="oficina-titulo" className="titulo text-3xl sm:text-5xl lg:col-span-6">
            Saiu da oficina.
          </h2>
          <p className="max-w-md text-nevoa lg:col-span-4 lg:col-start-9 lg:self-end">
            Madeira, aço, verniz e berço revestido. Carretas feitas e reformadas aqui, do jeito que saíram do
            galpão.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:auto-rows-[200px] lg:grid-cols-12">
          {GALERIA.map((g, i) => (
            <li
              key={g.src}
              className={cn(
                'relative aspect-[3/4] lg:aspect-auto',
                LAYOUT[i],
                i === 0 && 'col-span-2 aspect-[4/5] sm:col-span-1 sm:aspect-[3/4]',
                i === GALERIA.length - 1 &&
                  'col-span-2 aspect-[16/10] sm:col-span-3 sm:aspect-[16/7] lg:aspect-auto',
              )}
            >
              <button
                type="button"
                onClick={() => setAberto(i)}
                className="group relative block h-full w-full overflow-hidden bg-aco text-left"
                aria-label={`Ampliar: ${g.legenda}`}
              >
                {g.tipo === 'video' ? (
                  <VideoMiniatura item={g} />
                ) : (
                  <Foto
                    src={g.src}
                    pequena={g.pequena}
                    largura={g.largura}
                    altura={g.altura}
                    alt=""
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-noite/85 to-transparent px-3 pt-10 pb-2.5">
                  <span className="nota text-[0.62rem] leading-snug text-papel/90">{g.legenda}</span>
                  {g.tipo === 'video' && (
                    <span className="nota flex shrink-0 items-center gap-1 text-[0.6rem] text-ouro-claro">
                      <IconePlay width={9} height={9} /> vídeo
                    </span>
                  )}
                </span>
                <span className="nota pointer-events-none absolute top-2 left-2 bg-noite/70 px-1.5 py-0.5 text-[0.58rem] text-papel/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={item !== null} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent
          className="inset-0 flex flex-col items-center justify-center p-4 pt-16 sm:p-10"
          rotuloFechar="Fechar galeria"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') mover(1)
            if (e.key === 'ArrowLeft') mover(-1)
          }}
        >
          {item && aberto !== null && (
            <>
              <DialogTitle className="sr-only">{item.legenda}</DialogTitle>
              <DialogDescription className="sr-only">{item.alt}</DialogDescription>
              <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                {item.tipo === 'video' ? (
                  <video
                    key={item.src}
                    className="max-h-full max-w-full"
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                    poster={`${item.src}-poster.webp`}
                  >
                    <source src={`${item.src}.webm`} type="video/webm" />
                    <source src={`${item.src}.mp4`} type="video/mp4" />
                  </video>
                ) : (
                  <Foto
                    key={item.src}
                    src={item.src}
                    largura={item.largura}
                    altura={item.altura}
                    alt={item.alt}
                    prioridade
                    className="max-h-[calc(100svh-10rem)] w-auto max-w-full object-contain"
                  />
                )}
              </div>
              <div className="mt-4 flex w-full max-w-3xl items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => mover(-1)}
                  className="grid h-12 w-12 place-items-center border border-linha text-papel hover:border-ouro"
                  aria-label="Anterior"
                >
                  <IconeChevron direcao="esq" />
                </button>
                <p className="nota text-center text-[0.7rem] text-nevoa">
                  <span className="text-ouro">
                    {String(aberto + 1).padStart(2, '0')}/{String(GALERIA.length).padStart(2, '0')}
                  </span>{' '}
                  · {item.legenda}
                </p>
                <button
                  type="button"
                  onClick={() => mover(1)}
                  className="grid h-12 w-12 place-items-center border border-linha text-papel hover:border-ouro"
                  aria-label="Próxima"
                >
                  <IconeChevron />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
