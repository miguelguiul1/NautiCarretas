import { useEffect, useState } from 'react'
import { MENSAGEM_PADRAO, whatsappUrl } from '../config'
import { cn } from '../lib/cn'
import { IconeMenu, IconeWhatsApp } from './Icones'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

const LINKS = [
  { href: '#o-que-fazemos', rotulo: 'O que fazemos' },
  { href: '#anatomia', rotulo: 'Peça por peça' },
  { href: '#oficina', rotulo: 'Oficina' },
  { href: '#quem-faz', rotulo: 'Quem faz' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        // Fundo sólido #0B1023, a mesma cor embutida no arquivo da logo: assim não aparece retângulo em volta dela
        'fixed inset-x-0 top-0 z-40 border-b bg-noite transition-[border-color] duration-300',
        rolou ? 'border-linha/70' : 'border-transparent',
      )}
    >
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <a href="#topo" className="flex shrink-0 items-center" aria-label="Nauticarretas, voltar ao início">
          {/* Logo com fundo #0B1023 embutido, aplicada sobre a mesma cor */}
          <img
            src="/media/logo-300.webp"
            alt=""
            width={300}
            height={139}
            className="h-14 w-auto bg-noite sm:h-16"
          />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nota py-2 text-[0.72rem] text-nevoa transition-colors hover:text-papel"
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#orcamento" className="btn btn-ouro hidden !min-h-10 !px-4 !py-2 !text-sm sm:inline-flex">
            Pedir orçamento
          </a>
          <a
            href={whatsappUrl(MENSAGEM_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center text-papel transition-colors hover:text-ouro-claro sm:hidden"
            aria-label="Conversar no WhatsApp"
          >
            <IconeWhatsApp />
          </a>

          <Dialog open={menuAberto} onOpenChange={setMenuAberto}>
            <DialogTrigger
              className="grid h-11 w-11 place-items-center text-papel lg:hidden"
              aria-label="Abrir menu"
            >
              <IconeMenu />
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              rotuloFechar="Fechar menu"
              className="inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col border-l border-linha bg-noite-2 px-6 pt-20 pb-8"
            >
              <DialogTitle className="nota mb-6 text-ouro">Menu</DialogTitle>
              <ul className="flex flex-col">
                {LINKS.map((l, i) => (
                  <li key={l.href} className="border-b border-linha">
                    <a
                      href={l.href}
                      onClick={() => setMenuAberto(false)}
                      className="flex items-baseline gap-4 py-4 text-lg"
                    >
                      <span className="nota text-ouro/80">0{i + 1}</span>
                      <span className="titulo-medio">{l.rotulo}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#orcamento" onClick={() => setMenuAberto(false)} className="btn btn-ouro mt-auto">
                Pedir orçamento
              </a>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
