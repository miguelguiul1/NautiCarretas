// Dados confirmados do negócio. Tudo que não estiver aqui não deve aparecer no site.
export const NEGOCIO = {
  nome: 'Nauticarretas',
  razaoSocial: 'Nauticarretas LTDA',
  responsavel: 'Fábio Roberto',
  bio: 'Carretas rodoviárias e de encalhe. Reformas e manutenção. Carretas náuticas sob medida.',
  whatsappNumero: '5511976811752',
  whatsappExibicao: '(11) 97681-1752',
  email: 'nnauticarretas@gmail.com',
  instagram: 'nauticarretas',
  endereco: {
    rua: 'Rua Moisés Melman, 95',
    bairro: 'Jardim Três Marias',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04772-020',
    regiao: 'Zona Sul de São Paulo',
  },
} as const

export const INSTAGRAM_URL = `https://www.instagram.com/${NEGOCIO.instagram}/`

export const MAPA_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${NEGOCIO.endereco.rua}, ${NEGOCIO.endereco.bairro}, ${NEGOCIO.endereco.cidade} - ${NEGOCIO.endereco.uf}, ${NEGOCIO.endereco.cep}`,
)}`

export function whatsappUrl(mensagem?: string) {
  const base = `https://wa.me/${NEGOCIO.whatsappNumero}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

export const MENSAGEM_PADRAO = 'Olá, Nauticarretas! Vim pelo site e queria um orçamento.'

// Mostra as marcas "a confirmar" nos textos provisórios (útil na apresentação da proposta).
// Antes de publicar: resolver cada TODO-CONFIRMAR e mudar para false.
export const MOSTRAR_PENDENCIAS = true
