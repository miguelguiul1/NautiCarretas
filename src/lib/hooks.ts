import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduzir, setReduzir] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduzir(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduzir
}

/** Marca o elemento como visível quando entra na tela (uma vez só). */
export function useNaTela<T extends Element>(margem = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visivel) return
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          io.disconnect()
        }
      },
      { rootMargin: margem },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margem, visivel])
  return { ref, visivel }
}
