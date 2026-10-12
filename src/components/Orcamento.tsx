import { useId, useMemo, useState, type ReactNode } from 'react'
import { whatsappUrl } from '../config'
import { PARTES } from '../data/anatomia'
import { cn } from '../lib/cn'
import { IconeWhatsApp } from './Icones'

const TIPOS = [
  'Rodoviária',
  'De encalhe · jet ski',
  'De encalhe · lancha',
  'De encalhe · bote inflável',
  'De encalhe · veleiro',
  'Ainda não sei',
] as const

const PEDIDOS = [
  { valor: 'Fabricar uma carreta nova', curto: 'Carreta nova' },
  { valor: 'Reformar a minha carreta', curto: 'Reforma' },
  { valor: 'Manutenção', curto: 'Manutenção' },
] as const

type Pedido = (typeof PEDIDOS)[number]['valor']

function Opcao({
  name,
  value,
  checked,
  onChange,
  type = 'radio',
  children,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  type?: 'radio' | 'checkbox'
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        'relative flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-[0.95rem] transition-colors',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ouro-claro',
        checked ? 'border-ouro bg-ouro/10 text-papel' : 'border-linha text-papel/85 hover:border-papel/40',
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          'grid h-4 w-4 shrink-0 place-items-center border',
          type === 'radio' && 'rounded-full',
          checked ? 'border-ouro' : 'border-papel/40',
        )}
      >
        {checked && <span className={cn('h-2 w-2 bg-ouro', type === 'radio' && 'rounded-full')} />}
      </span>
      {children}
    </label>
  )
}

export function Orcamento() {
  const [tipo, setTipo] = useState<string>('')
  const [pedido, setPedido] = useState<Pedido | ''>('')
  const [itens, setItens] = useState<string[]>([])
  const [detalhes, setDetalhes] = useState('')
  const [nome, setNome] = useState('')
  const [local, setLocal] = useState('')
  const idDetalhes = useId()
  const idNome = useId()
  const idLocal = useId()

  const precisaItens = pedido === 'Reformar a minha carreta' || pedido === 'Manutenção'
  const pronto = Boolean(tipo && pedido)

  const mensagem = useMemo(() => {
    const linhas = ['Olá, Nauticarretas! Vim pelo site e queria um orçamento.', '']
    linhas.push(`Carreta: ${tipo || '(escolher)'}`)
    linhas.push(`Preciso de: ${pedido || '(escolher)'}`)
    if (precisaItens && itens.length) linhas.push(`Itens: ${itens.join('; ')}`)
    if (detalhes.trim()) linhas.push(`Detalhes: ${detalhes.trim()}`)
    if (nome.trim()) linhas.push(`Nome: ${nome.trim()}`)
    if (local.trim()) linhas.push(`Bairro/cidade: ${local.trim()}`)
    linhas.push('')
    linhas.push(
      pedido === 'Fabricar uma carreta nova'
        ? 'Vou mandar fotos do barco (e as medidas que eu tiver) aqui na conversa.'
        : 'Vou mandar fotos da carreta aqui na conversa.',
    )
    return linhas.join('\n')
  }, [tipo, pedido, itens, detalhes, nome, local, precisaItens])

  const alternarItem = (s: string) =>
    setItens((atual) => (atual.includes(s) ? atual.filter((x) => x !== s) : [...atual, s]))

  return (
    <section id="orcamento" aria-labelledby="orc-titulo" className="py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 border-t border-linha pt-8 lg:grid-cols-12">
          <h2 id="orc-titulo" className="titulo text-3xl sm:text-5xl lg:col-span-7">
            Monte o pedido. A conversa segue no WhatsApp.
          </h2>
          <p className="max-w-md text-nevoa lg:col-span-4 lg:col-start-9 lg:self-end">
            Escolha o tipo de carreta e o que precisa. A mensagem fica pronta para você mandar, junto com uma
            foto da carreta. Nada é gravado neste site.
          </p>
        </div>

        <form
          className="mt-12 grid gap-10 lg:grid-cols-12"
          onSubmit={(e) => {
            e.preventDefault()
            if (pronto) window.open(whatsappUrl(mensagem), '_blank', 'noopener,noreferrer')
          }}
        >
          <div className="space-y-10 lg:col-span-7">
            <fieldset>
              <legend className="mb-4 flex items-baseline gap-3">
                <span className="nota text-ouro">1</span>
                <span className="titulo-medio text-xl">Qual carreta?</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {TIPOS.map((t) => (
                  <Opcao key={t} name="tipo" value={t} checked={tipo === t} onChange={() => setTipo(t)}>
                    {t}
                  </Opcao>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 flex items-baseline gap-3">
                <span className="nota text-ouro">2</span>
                <span className="titulo-medio text-xl">O que precisa?</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {PEDIDOS.map((p) => (
                  <Opcao
                    key={p.valor}
                    name="pedido"
                    value={p.valor}
                    checked={pedido === p.valor}
                    onChange={() => setPedido(p.valor)}
                  >
                    {p.curto}
                  </Opcao>
                ))}
              </div>
            </fieldset>

            {precisaItens && (
              <fieldset>
                <legend className="mb-4 flex items-baseline gap-3">
                  <span className="nota text-ouro">3</span>
                  <span className="titulo-medio text-xl">
                    Quais itens? <span className="text-base font-normal text-nevoa">(opcional)</span>
                  </span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PARTES.map((p) => (
                    <Opcao
                      key={p.id}
                      type="checkbox"
                      name="itens"
                      value={p.servico}
                      checked={itens.includes(p.servico)}
                      onChange={() => alternarItem(p.servico)}
                    >
                      {p.servico}
                    </Opcao>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={idDetalhes} className="nota mb-2 block text-[0.7rem] text-nevoa">
                  Conte mais (opcional) · barco, medidas, estado da carreta
                </label>
                <textarea
                  id={idDetalhes}
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  rows={3}
                  className="w-full border border-linha bg-noite-2 px-4 py-3 text-papel placeholder:text-nevoa/60 focus:border-ouro focus:outline-none"
                  placeholder="Ex.: lancha de 19 pés, carreta com o chassi enferrujado"
                />
              </div>
              <div>
                <label htmlFor={idNome} className="nota mb-2 block text-[0.7rem] text-nevoa">
                  Seu nome (opcional)
                </label>
                <input
                  id={idNome}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="name"
                  className="min-h-12 w-full border border-linha bg-noite-2 px-4 text-papel focus:border-ouro focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={idLocal} className="nota mb-2 block text-[0.7rem] text-nevoa">
                  Bairro / cidade (opcional)
                </label>
                <input
                  id={idLocal}
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  autoComplete="address-level2"
                  className="min-h-12 w-full border border-linha bg-noite-2 px-4 text-papel focus:border-ouro focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Prévia da mensagem */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="nota mb-3 flex items-center justify-between text-[0.7rem] text-nevoa">
                <span>Prévia da mensagem</span>
                <span className="text-ouro/80">WhatsApp</span>
              </p>
              <output
                aria-live="polite"
                className="block border border-linha bg-aco p-5 font-mono text-[0.82rem] leading-relaxed whitespace-pre-wrap text-papel/90"
              >
                {mensagem}
              </output>
              <div className="mt-4 flex items-start gap-3 border-l-2 border-ouro pl-4 text-sm text-nevoa">
                <span>
                  Depois de abrir a conversa,{' '}
                  <strong className="font-semibold text-papel">mande uma foto da carreta</strong> (ou do
                  barco, se for carreta nova). Ajuda a orçar certo.
                </span>
              </div>
              <button
                type="submit"
                disabled={!pronto}
                className="btn btn-ouro mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconeWhatsApp />
                Abrir no WhatsApp
              </button>
              {!pronto && (
                <p className="nota mt-3 text-center text-[0.64rem] text-nevoa">
                  Escolha a carreta e o que precisa para liberar
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
