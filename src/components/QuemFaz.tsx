import { NEGOCIO } from '../config'
import { Foto } from './Foto'
import { Pendente } from './Pendente'
import { Revelar } from './Revelar'

export function QuemFaz() {
  return (
    <section id="quem-faz" aria-labelledby="quem-titulo" className="bg-noite-2 py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="nota mb-4 text-[0.7rem] text-nevoa">Quem faz</p>
          <h2 id="quem-titulo" className="titulo text-3xl sm:text-5xl">
            A mesma mão na produção.
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-papel/85">
            <p>
              A {NEGOCIO.nome} é a empresa do{' '}
              <strong className="font-semibold text-papel">{NEGOCIO.responsavel}</strong>. Ele era o
              responsável pela produção da Estrela Náutica Carretas.
            </p>
            <p>
              Quando a Estrela Náutica Carretas encerrou as atividades, o Fábio seguiu com a produção na
              própria empresa. Quem cuidava das carretas lá é quem faz as carretas aqui.
            </p>
            <p>
              {/* TODO-CONFIRMAR: relação atual com a Estrela Náutica (venda de barcos + carretas). */}
              <Pendente>
                A Estrela Náutica continua vendendo barcos, e as carretas que equipam esses barcos saem da{' '}
                {NEGOCIO.nome}.
              </Pendente>
            </p>
          </div>
        </div>

        <Revelar className="lg:col-span-4 lg:col-start-9">
          <figure className="border border-linha p-3">
            <Foto
              src="/media/placa-nauticarretas"
              largura={720}
              altura={720}
              sizes="(min-width: 1024px) 30vw, 90vw"
              alt="Placa da Nauticarretas com logo, WhatsApp e Instagram, fixada na lança de madeira de uma carreta"
              className="aspect-square w-full object-cover"
            />
            <figcaption className="nota mt-3 flex justify-between text-[0.64rem] text-nevoa">
              <span>Placa de identificação</span>
              <span className="text-ouro/80">{NEGOCIO.razaoSocial}</span>
            </figcaption>
          </figure>
        </Revelar>
      </div>
    </section>
  )
}
