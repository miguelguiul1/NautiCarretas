// Primitivo de diálogo no padrão shadcn/ui (Radix), reestilizado para o site.
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/cn'
import { IconeFechar } from '../Icones'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

type ContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  overlayClassName?: string
  rotuloFechar?: string
}

export function DialogContent({
  className,
  overlayClassName,
  children,
  rotuloFechar = 'Fechar',
  ...props
}: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn('fixed inset-0 z-50 bg-noite/92 backdrop-blur-sm', overlayClassName)}
      />
      <DialogPrimitive.Content className={cn('fixed z-50 focus:outline-none', className)} {...props}>
        {children}
        <DialogPrimitive.Close
          className="absolute top-3 right-3 grid h-11 w-11 place-items-center text-papel/80 transition-colors hover:text-ouro-claro"
          aria-label={rotuloFechar}
        >
          <IconeFechar />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
