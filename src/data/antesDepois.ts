// Pares de fotos de reforma (antes → depois). A seção só aparece quando houver pelo menos um par.
// Para adicionar: coloque as fotos em public/media/ (mesmo enquadramento, mesma proporção) e inclua aqui.
//
// Exemplo:
// {
//   antes: '/media/reforma-01-antes.jpg',
//   depois: '/media/reforma-01-depois.jpg',
//   titulo: 'Carreta de lancha · reforma de chassi',
//   largura: 1080,
//   altura: 810,
// },

export type ParAntesDepois = {
  antes: string
  depois: string
  titulo: string
  largura: number
  altura: number
}

export const ANTES_DEPOIS: ParAntesDepois[] = []
