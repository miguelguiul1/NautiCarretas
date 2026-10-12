import type { ImgHTMLAttributes } from 'react'

type Props = {
  /** caminho sem extensão, ex.: /media/rodoviaria-lateral */
  src: string
  alt: string
  largura: number
  altura: number
  /** existe variante -720 para telas pequenas */
  pequena?: boolean
  sizes?: string
  prioridade?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>

export function Foto({
  src,
  alt,
  largura,
  altura,
  pequena,
  sizes = '100vw',
  prioridade,
  className,
  ...resto
}: Props) {
  const srcset = (ext: string) =>
    pequena ? `${src}-720.${ext} 720w, ${src}.${ext} ${largura}w` : `${src}.${ext} ${largura}w`
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`${src}.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        width={largura}
        height={altura}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        {...resto}
      />
    </picture>
  )
}
