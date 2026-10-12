// Mídias da seção "Oficina". Só material sem pessoas identificáveis e nítido: poucos itens, de propósito.
// Quadros de vídeo saem no instante mais nítido (ver scripts/process-assets.sh).
export type ItemGaleria =
  | {
      tipo: 'foto'
      src: string // caminho sem extensão em /media (há .webp e .jpg)
      alt: string
      legenda: string
      largura: number
      altura: number
      pequena?: boolean // existe versão -720
    }
  | {
      tipo: 'video'
      src: string
      alt: string
      legenda: string
      largura: number
      altura: number
    }

export const GALERIA: ItemGaleria[] = [
  {
    tipo: 'video',
    src: '/media/encalhe-bercos',
    alt: 'Carreta de encalhe de madeira com berços estofados e rodagem dupla, na oficina',
    legenda: 'Encalhe em madeira · berços revestidos',
    largura: 720,
    altura: 1040,
  },
  {
    tipo: 'foto',
    src: '/media/encalhe-madeira-verniz',
    alt: 'Estrutura de carreta de encalhe toda em madeira recebendo verniz na oficina',
    legenda: 'Estrutura de madeira no verniz',
    largura: 640,
    altura: 948,
  },
  {
    tipo: 'foto',
    src: '/media/encalhe-madeira-engate',
    alt: 'Lança de madeira envernizada com engate de alça vermelha, apoiada em cavaletes na oficina',
    legenda: 'Lança e engate',
    largura: 720,
    altura: 1040,
  },
  {
    tipo: 'foto',
    src: '/media/jetski-frente',
    alt: 'Carreta de jet ski preta vista de frente, com catraca, engate e roletes',
    legenda: 'Jet ski · vista de frente',
    largura: 1080,
    altura: 1436,
    pequena: true,
  },
  {
    tipo: 'video',
    src: '/media/bote-carreta',
    alt: 'Bote inflável assentado sobre carreta de encalhe no gramado',
    legenda: 'Bote inflável na carreta',
    largura: 720,
    altura: 1040,
  },
  {
    tipo: 'foto',
    src: '/media/rodoviaria-lago',
    alt: 'Carreta rodoviária de madeira e aço preto ao lado de um barco, à beira da represa',
    legenda: 'Rodoviária · na beira da represa',
    largura: 1080,
    altura: 1435,
    pequena: true,
  },
  {
    tipo: 'foto',
    src: '/media/rodoviaria-traseira',
    alt: 'Tampa traseira de carreta rodoviária de madeira com a placa da Nauticarretas',
    legenda: 'Rodoviária · tampa traseira',
    largura: 1080,
    altura: 1435,
    pequena: true,
  },
]
