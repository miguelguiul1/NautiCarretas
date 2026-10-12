// Peças da carreta marcadas sobre a foto real (seção "Peça por peça", foto anatomia-jetski 1080 × 660).
// ponto: onde a peça está na foto; rotulo: onde fica a letra clicável (área livre), ligada ao ponto por uma
// linha-guia. Ambos em % da largura/altura da foto. Peça sem `ponto` não aparece na foto, só na lista ("geral").
// TODO-CONFIRMAR: lista de serviços de manutenção a validar com o Fábio.

export type ParteId = 'engate' | 'catraca' | 'chassi' | 'bercos' | 'rodagem' | 'rolamentos' | 'galvanizacao'

export type Parte = {
  id: ParteId
  codigo: string
  nome: string
  servico: string
  descricao: string
  ponto?: { x: number; y: number }
  rotulo?: { x: number; y: number }
  /** texto curto ao lado do ponto, ex.: "no cubo" */
  indicacao?: string
}

const W = 1080
const H = 660
const pct = (x: number, y: number) => ({ x: +((x / W) * 100).toFixed(2), y: +((y / H) * 100).toFixed(2) })

export const PARTES: Parte[] = [
  {
    id: 'engate',
    codigo: 'A',
    nome: 'Engate e ganchos',
    servico: 'Instalação de ganchos',
    descricao:
      'Onde a carreta se prende ao carro. A gente instala os ganchos e confere o conjunto do engate.',
    ponto: pct(1020, 400),
    rotulo: pct(990, 600),
  },
  {
    id: 'catraca',
    codigo: 'B',
    nome: 'Catraca',
    servico: 'Manutenção de catracas',
    descricao: 'O guincho manual que puxa o barco pra cima da carreta. A gente faz a manutenção da catraca.',
    ponto: pct(935, 315),
    rotulo: pct(950, 170),
  },
  {
    id: 'chassi',
    codigo: 'C',
    nome: 'Chassi',
    servico: 'Reforma de chassi',
    descricao: 'A estrutura que carrega tudo. A gente reforma chassi de aço e também estrutura de madeira.',
    ponto: pct(640, 305),
    rotulo: pct(620, 560),
  },
  {
    id: 'bercos',
    codigo: 'D',
    nome: 'Berços',
    servico: 'Revestimento dos berços',
    descricao: 'Onde o casco apoia. A gente refaz o revestimento dos berços pro casco assentar protegido.',
    ponto: pct(330, 150),
    rotulo: pct(330, 62),
  },
  {
    id: 'rodagem',
    codigo: 'E',
    nome: 'Rodagem',
    // TODO-CONFIRMAR: o que exatamente é "rodagem central" (eixo central? roda de apoio?) e onde fica na carreta (hoje o ponto E está na roda).
    servico: 'Instalação de rodagem central',
    descricao: 'Eixo, rodas e pneus. A gente faz a instalação de rodagem central.',
    ponto: pct(540, 260),
    rotulo: pct(590, 80),
  },
  {
    id: 'rolamentos',
    codigo: 'F',
    nome: 'Rolamentos',
    servico: 'Revisão e troca de rolamentos',
    descricao:
      'Ficam dentro do cubo da roda e sofrem com água e areia. A gente revisa e troca quando precisa.',
    ponto: pct(282, 295),
    rotulo: pct(170, 560),
    indicacao: 'no cubo',
  },
  {
    id: 'galvanizacao',
    codigo: 'G',
    nome: 'Galvanização',
    servico: 'Galvanização',
    descricao: 'Proteção do aço contra a ferrugem, pensada pra quem coloca a carreta na água.',
  },
]
