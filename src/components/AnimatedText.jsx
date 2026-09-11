import { useState, useEffect, useRef } from 'react'

/**
 * Revela líneas de texto una por una con animación de fade-in.
 *
 * Props:
 * - lines: string[] — textos a mostrar en secuencia
 * - delayBetween: ms entre cada línea (default 1200)
 * - initialDelay: ms antes de comenzar (default 400)
 * - className: clase CSS para el contenedor
 * - lineClassName: clase CSS para cada línea
 * - onComplete: callback al terminar todas las líneas
 * - emphasisLines: índices de líneas con énfasis visual (ej. humor)
 */
export default function AnimatedText({
  lines,
  delayBetween = 1200,
  initialDelay = 400,
  className = '',
  lineClassName = '',
  onComplete,
  emphasisLines = [],
}) {
  const [visibleCount, setVisibleCount] = useState(0)
  const completedRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion && !completedRef.current) {
      setVisibleCount(lines.length)
      completedRef.current = true
      onComplete?.()
      return
    }

    if (visibleCount >= lines.length) {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }
      return
    }

    const delay = visibleCount === 0 ? initialDelay : delayBetween
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [visibleCount, lines.length, delayBetween, initialDelay, prefersReducedMotion, onComplete])

  return (
    <div className={`space-y-5 ${className}`}>
      {lines.slice(0, visibleCount).map((line, i) => (
        <p
          key={i}
          className={`
            animate-slide-up
            ${emphasisLines.includes(i) ? 'italic text-champagne-dark' : ''}
            ${lineClassName}
          `}
          style={{ animationDelay: '0ms' }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

/**
 * Detecta prefers-reduced-motion.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
