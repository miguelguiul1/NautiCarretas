import { useId, useState } from 'react'
import { ANTES_DEPOIS, type ParAntesDepois } from '../data/antesDepois'

function Comparador({ par }: { par: ParAntesDepois }) {
  const [pos, setPos] = useState(50)
  const id = useId()
  return (
    <figure>
      <div
        className="relative overflow-hidden bg-aco select-none"
        style={{ aspectRatio: `${par.largura} / ${par.altura}` }}
      >
        <img
          src={par.depois}
          alt={`Depois: ${par.titulo}`}
          width={par.largura}
          height={par.altura}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={par.antes}
          alt={`Antes: ${par.titulo}`}
          width={par.largura}
          height={par.altura}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-ouro"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ouro bg-noite text-ouro">
            ⇆
          </span>
        </div>
        <span className="nota absolute top-3 left-3 bg-noite/80 px-2 py-1 text-[0.62rem]">Antes</span>
        <span className="nota absolute top-3 right-3 bg-noite/80 px-2 py-1 text-[0.62rem] text-ouro">
          Depois
        </span>
        <label htmlFor={id} className="sr-only">
          Comparar antes e depois: {par.titulo}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="nota mt-3 text-[0.68rem] text-nevoa">{par.titulo}</figcaption>
    </figure>
  )
}

/** Só renderiza quando houver pares cadastrados em src/data/antesDepois.ts */
export function AntesDepois() {
  if (ANTES_DEPOIS.length === 0) return null
  return (
    <section id="antes-e-depois" aria-labelledby="ad-titulo" className="py-20 sm:py-28">
      <div className="container-site">
        <h2 id="ad-titulo" className="titulo border-t border-linha pt-8 text-3xl sm:text-5xl">
          Antes e depois.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {ANTES_DEPOIS.map((par) => (
            <Comparador key={par.antes} par={par} />
          ))}
        </div>
      </div>
    </section>
  )
}
