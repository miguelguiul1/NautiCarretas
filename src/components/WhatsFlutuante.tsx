import { useEffect, useState } from 'react'
import { MENSAGEM_PADRAO, whatsappUrl } from '../config'
import { cn } from '../lib/cn'
import { IconeWhatsApp } from './Icones'

/** Botão discreto que aparece depois do hero e some na seção de orçamento/contato. */
export function WhatsFlutuante() {
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const passouHero = window.scrollY > window.innerHeight * 0.8
      const orc = document.getElementById('orcamento')
      const naOrcamento = orc ? orc.getBoundingClientRect().top < window.innerHeight * 0.6 : false
      setMostrar(passouHero && !naOrcamento)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <a
      href={whatsappUrl(MENSAGEM_PADRAO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      tabIndex={mostrar ? 0 : -1}
      aria-hidden={!mostrar}
      className={cn(
        'fixed right-4 bottom-4 z-30 flex h-12 items-center gap-2 border border-ouro/60 bg-noite/95 px-4 text-papel shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur transition-all duration-300 hover:border-ouro hover:text-ouro-claro sm:right-6 sm:bottom-6',
        mostrar ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <IconeWhatsApp />
      <span className="nota hidden text-[0.68rem] sm:inline">WhatsApp</span>
    </a>
  )
}
