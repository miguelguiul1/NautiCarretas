import { PARTES } from '../data/anatomia'
import { Foto } from './Foto'
import { IconeSeta } from './Icones'
import { Pendente } from './Pendente'
import { Revelar } from './Revelar'

function Material({ cor, nome }: { cor: string; nome: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span aria-hidden="true" className="h-3.5 w-7 border border-papel/20" style={{ background: cor }} />
      <span className="nota text-[0.68rem] text-nevoa">{nome}</span>
    </li>
  )
}

function Numero({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      className="titulo block text-[4.5rem] leading-none text-transparent sm:text-[6.5rem]"
      style={{ WebkitTextStroke: '1px var(--color-ouro)' }}
    >
      {n}
    </span>
  )
}

export function Frentes() {
  return (
    <section id="o-que-fazemos" aria-labelledby="frentes-titulo" className="relative py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 border-t border-linha pt-8 lg:grid-cols-12">
          <h2 id="frentes-titulo" className="titulo text-3xl sm:text-5xl lg:col-span-7">
            Três frentes de trabalho, uma oficina só.
          </h2>
          <p className="max-w-md text-nevoa lg:col-span-4 lg:col-start-9 lg:self-end">
            A gente fabrica carreta nova, reforma a que já existe e faz a manutenção que deixa ela pronta pra
            estrada e pra rampa.
          </p>
        </div>

        {/* 01 · Rodoviárias */}
        <article className="mt-16 grid gap-8 sm:mt-24 lg:grid-cols-12 lg:gap-10" aria-labelledby="f1">
          <Revelar className="relative lg:col-span-8">
            <Foto
              src="/media/rodoviaria-lateral"
              pequena
              largura={1080}
              altura={780}
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt="Carreta rodoviária com carroceria de madeira envernizada e estrutura de aço preto, estacionada no gramado"
              className="aspect-[1080/780] w-full object-cover"
            />
            <div className="absolute -bottom-10 -left-2 hidden w-[30%] border-4 border-noite sm:block lg:-left-8">
              <Foto
                src="/media/rodoviaria-traseira"
                pequena
                largura={1080}
                altura={1435}
                sizes="25vw"
                alt="Tampa traseira da carreta rodoviária com a placa da Nauticarretas"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </Revelar>
          <div className="flex flex-col lg:col-span-4 lg:pt-6">
            <Numero n="01" />
            <h3 id="f1" className="titulo-medio mt-2 text-3xl sm:text-4xl">
              Rodoviárias
            </h3>
            <p className="mt-4 text-lg text-papel/85">
              Carroceria de madeira envernizada sobre estrutura de aço preto. A gente fabrica e reforma.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3" aria-label="Materiais">
              <Material cor="linear-gradient(90deg,#b56d22,#e3a557,#c47f2c)" nome="Madeira envernizada" />
              <Material cor="#111317" nome="Aço preto" />
            </ul>
          </div>
        </article>

        {/* 02 · De encalhe */}
        <article className="mt-24 grid gap-8 sm:mt-36 lg:grid-cols-12 lg:gap-10" aria-labelledby="f2">
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-4 lg:pt-24">
            <Numero n="02" />
            <h3 id="f2" className="titulo-medio mt-2 text-3xl sm:text-4xl">
              De encalhe
            </h3>
            <p className="mt-4 text-lg text-papel/85">
              A carreta que leva o barco até a água e traz de volta. Feita pro casco que vai em cima,
              inclusive com estrutura de madeira.
            </p>
            <ul className="mt-6 border-t border-linha">
              {['Jet ski', 'Lancha', 'Bote inflável', 'Veleiro'].map((t, i) => (
                <li key={t} className="flex items-baseline justify-between border-b border-linha py-3">
                  <span className="text-papel">{t}</span>
                  <span className="nota text-[0.68rem] text-nevoa">E-0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 grid grid-cols-5 gap-3 sm:gap-4 lg:order-2 lg:col-span-8">
            <Revelar className="col-span-3">
              <Foto
                src="/media/jetski-perfil"
                pequena
                largura={1080}
                altura={1436}
                sizes="(min-width: 1024px) 38vw, 60vw"
                alt="Carreta de jet ski preta no gramado de uma garagem náutica, com barcos cobertos ao fundo"
                className="aspect-[3/4] w-full object-cover"
              />
            </Revelar>
            <Revelar className="col-span-2 mt-16 sm:mt-28" atraso={120}>
              <Foto
                src="/media/encalhe-madeira-verniz"
                largura={640}
                altura={948}
                sizes="(min-width: 1024px) 25vw, 40vw"
                alt="Carreta de encalhe toda em madeira, com berços revestidos, recebendo verniz"
                className="aspect-[640/948] w-full object-cover"
              />
              <p className="nota mt-3 text-[0.66rem] text-nevoa">Estrutura de madeira · verniz</p>
            </Revelar>
          </div>
        </article>

        {/* 03 · Reforma e manutenção */}
        <article className="relative mt-24 bg-aco px-5 py-10 sm:mt-36 sm:px-10 sm:py-14" aria-labelledby="f3">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Numero n="03" />
              <h3 id="f3" className="titulo-medio mt-2 text-3xl sm:text-4xl">
                Reforma e manutenção
              </h3>
              <p className="mt-4 text-lg text-papel/85">
                Carreta que já roda também passa pela oficina: reforma da estrutura e manutenção peça por
                peça.
              </p>
              <Revelar className="mt-8 hidden lg:block">
                <Foto
                  src="/media/rodoviaria-frente"
                  pequena
                  largura={1080}
                  altura={1435}
                  sizes="30vw"
                  alt="Frente de carreta rodoviária de madeira com engate de alça vermelha"
                  className="aspect-[4/3] w-full object-cover"
                />
              </Revelar>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="nota mb-3 text-[0.68rem] text-galva-escuro">
                <Pendente>Serviços</Pendente>
              </p>
              <ol className="border-t border-papel/15">
                {PARTES.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#peca-${p.id}`}
                      className="group flex items-center gap-4 border-b border-papel/15 py-4 transition-colors hover:text-ouro-claro"
                    >
                      <span className="nota w-6 text-ouro">{p.codigo}</span>
                      <span className="flex-1 text-[1.05rem]">{p.servico}</span>
                      <span className="nota hidden text-[0.66rem] text-galva-escuro group-hover:text-ouro-claro sm:inline">
                        ver na carreta
                      </span>
                      <IconeSeta className="text-galva-escuro transition-transform group-hover:translate-x-1 group-hover:text-ouro-claro" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
