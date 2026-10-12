import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { useNaTela } from '../lib/hooks'

type Props = {
  as?: ElementType
  className?: string
  atraso?: number
  children: ReactNode
}

export function Revelar({ as: Tag = 'div', className, atraso = 0, children }: Props) {
  const { ref, visivel } = useNaTela<HTMLDivElement>()
  return (
    <Tag
      ref={ref}
      className={cn('revelar', visivel && 'visivel', className)}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
