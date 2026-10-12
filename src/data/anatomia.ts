// Peças da carreta usadas no desenho técnico (seção "Anatomia").
// x/y são coordenadas no viewBox do SVG (1200 × 520).
// TODO-CONFIRMAR: lista de serviços de manutenção a validar com o Fábio.

export type ParteId = 'engate' | 'catraca' | 'chassi' | 'bercos' | 'rodagem' | 'rolamentos' | 'galvanizacao'

export type Parte = {
  id: ParteId
  codigo: string
  nome: string
  servico: string
  descricao: string
  x: number
  y: number
}

export const PARTES: Parte[] = [
  {
    id: 'engate',
    codigo: 'A',
    nome: 'Engate e ganchos',
    servico: 'Instalação de ganchos',
    descricao:
      'Ponto onde a carreta se prende ao carro. Instalamos os ganchos e conferimos o conjunto do engate.',
    x: 92,
    y: 300,
  },
  {
    id: 'catraca',
    codigo: 'B',
    nome: 'Catraca',
    servico: 'Manutenção de catracas',
    descricao: 'O guincho manual que puxa o barco para cima da carreta. Fazemos a manutenção da catraca.',
    x: 302,
    y: 240,
  },
  {
    id: 'chassi',
    codigo: 'C',
    nome: 'Chassi',
    servico: 'Reforma de chassi',
    descricao: 'A estrutura que carrega tudo. Reformamos chassi de aço e também estruturas de madeira.',
    x: 560,
    y: 328,
  },
  {
    id: 'bercos',
    codigo: 'D',
    nome: 'Berços',
    servico: 'Revestimento dos berços',
    descricao: 'Onde o casco apoia. Refazemos o revestimento dos berços para o casco assentar protegido.',
    x: 680,
    y: 284,
  },
  {
    id: 'rodagem',
    codigo: 'E',
    nome: 'Rodagem',
    // TODO-CONFIRMAR: o que exatamente é "rodagem central" (eixo central? roda de apoio?) e onde fica no desenho.
    servico: 'Instalação de rodagem central',
    descricao: 'Eixo, rodas e pneus. Fazemos a instalação de rodagem central.',
    x: 892,
    y: 458,
  },
  {
    id: 'rolamentos',
    codigo: 'F',
    nome: 'Rolamentos',
    servico: 'Revisão e troca de rolamentos',
    descricao: 'Ficam dentro do cubo da roda e sofrem com água e areia. Revisamos e trocamos quando precisa.',
    x: 840,
    y: 410,
  },
  {
    id: 'galvanizacao',
    codigo: 'G',
    nome: 'Galvanização',
    servico: 'Galvanização',
    descricao: 'Proteção do aço contra a ferrugem, pensada para quem coloca a carreta na água.',
    x: 1074,
    y: 328,
  },
]
