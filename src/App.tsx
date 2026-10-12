import { useEffect } from 'react'
import { Anatomia } from './components/Anatomia'
import { AntesDepois } from './components/AntesDepois'
import { Cabecalho } from './components/Cabecalho'
import { Contato } from './components/Contato'
import { Frentes } from './components/Frentes'
import { Hero } from './components/Hero'
import { Oficina } from './components/Oficina'
import { Orcamento } from './components/Orcamento'
import { QuemFaz } from './components/QuemFaz'
import { Rodape } from './components/Rodape'
import { WhatsFlutuante } from './components/WhatsFlutuante'

export default function App() {
  // Link com âncora aberto direto (ex.: /#orcamento): rola depois que a página monta
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 bg-ouro px-4 py-2 text-noite focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Hero />
        <Frentes />
        <Anatomia />
        <Oficina />
        <AntesDepois />
        <QuemFaz />
        <Orcamento />
        <Contato />
      </main>
      <Rodape />
      <WhatsFlutuante />
    </>
  )
}
