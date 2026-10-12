import type { ReactNode } from 'react'
import { MOSTRAR_PENDENCIAS } from '../config'

/** Texto provisório (TODO-CONFIRMAR). Marcado visualmente enquanto MOSTRAR_PENDENCIAS = true. */
export function Pendente({ children }: { children: ReactNode }) {
  if (!MOSTRAR_PENDENCIAS) return <>{children}</>
  return (
    <span className="decoration-ouro/70 underline decoration-dashed decoration-1 underline-offset-4">
      {children}
      <span className="nota ml-2 inline-block translate-y-[-1px] border border-ouro/60 px-1.5 py-0.5 text-[0.62rem] text-ouro no-underline">
        a confirmar
      </span>
    </span>
  )
}
