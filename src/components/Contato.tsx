import { INSTAGRAM_URL, MAPA_URL, MENSAGEM_PADRAO, NEGOCIO, whatsappUrl } from '../config'
import { IconeInstagram, IconeSeta, IconeWhatsApp } from './Icones'

export function Contato() {
  const e = NEGOCIO.endereco
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-noite-2 py-20 sm:py-28">
      <div className="container-site">
        <h2 id="contato-titulo" className="titulo text-3xl sm:text-5xl">
          Fale com a oficina.
        </h2>

        <div className="mt-12 grid gap-px border border-linha bg-linha md:grid-cols-2 lg:grid-cols-12">
          <a
            href={whatsappUrl(MENSAGEM_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-10 bg-noite p-6 transition-colors hover:bg-noite-3 sm:p-8 md:col-span-2 lg:col-span-5"
          >
            <span className="nota flex items-center gap-2 text-[0.7rem] text-ouro">
              <IconeWhatsApp width={16} height={16} /> WhatsApp
            </span>
            <span>
              <span className="titulo block text-[2rem] whitespace-nowrap sm:text-5xl">
                {NEGOCIO.whatsappExibicao}
              </span>
              <span className="mt-3 flex items-center gap-2 text-nevoa group-hover:text-papel">
                Abrir conversa <IconeSeta />
              </span>
            </span>
          </a>

          <div className="flex flex-col justify-between gap-8 bg-noite p-6 sm:p-8 lg:col-span-4">
            <span className="nota text-[0.7rem] text-ouro">Endereço</span>
            <address className="text-lg leading-relaxed not-italic">
              {e.rua}
              <br />
              {e.bairro} · {e.cidade}/{e.uf}
              <br />
              <span className="nota text-[0.75rem] text-nevoa">CEP {e.cep}</span>
            </address>
            <a
              href={MAPA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-nevoa hover:text-papel"
            >
              Abrir no mapa <IconeSeta />
            </a>
          </div>

          <div className="flex flex-col gap-px bg-linha lg:col-span-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 flex-col justify-between gap-6 bg-noite p-6 transition-colors hover:bg-noite-3 sm:p-8"
            >
              <span className="nota flex items-center gap-2 text-[0.7rem] text-ouro">
                <IconeInstagram width={16} height={16} /> Instagram
              </span>
              <span className="text-lg">@{NEGOCIO.instagram}</span>
            </a>
            <a
              href={`mailto:${NEGOCIO.email}`}
              className="flex flex-1 flex-col justify-between gap-6 bg-noite p-6 transition-colors hover:bg-noite-3 sm:p-8"
            >
              <span className="nota text-[0.7rem] text-ouro">E-mail</span>
              <span className="text-[0.95rem] break-all">{NEGOCIO.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
