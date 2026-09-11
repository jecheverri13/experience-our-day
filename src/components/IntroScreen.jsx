import { useState, useEffect } from 'react'
import { CONFIG, TEXTS } from '../config/experience'

/**
 * Pantalla de bienvenida — primera visita.
 *
 * Secuencia:
 * 1. Fotografía aparece suavemente
 * 2. Textos aparecen uno tras otro
 * 3. Botón aparece al final
 *
 * Props:
 * - onStart: () => void — cuando presiona "Comenzar"
 */
export default function IntroScreen({ onStart }) {
  const [step, setStep] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const totalSteps = TEXTS.intro.lines.length + 2 // photo + lines + button

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setStep(totalSteps)
      return
    }

    if (step >= totalSteps) return

    const delays = [
      800,   // después de foto
      1200,  // línea 1
      1200,  // línea 2
      1200,  // línea 3
      1000,  // línea 4
      800,   // botón
    ]

    const delay = delays[step] || 1000
    const timer = setTimeout(() => setStep((s) => s + 1), delay)
    return () => clearTimeout(timer)
  }, [step, totalSteps])

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
      {/* Fotografía */}
      <div
        className={`
          relative w-56 h-72 sm:w-64 sm:h-80 rounded-sm overflow-hidden mb-10
          transition-all duration-1000 ease-out
          ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {!imageError ? (
          <img
            src={CONFIG.images.intro}
            alt="Nuestra historia"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`
              w-full h-full object-cover
              transition-opacity duration-700
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ) : null}

        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-linen-200">
            <span className="text-4xl opacity-20">✦</span>
          </div>
        )}
      </div>

      {/* Textos narrativos */}
      <div className="text-center max-w-md space-y-4 mb-10">
        {TEXTS.intro.lines.map((line, i) => (
          <p
            key={i}
            className={`
              font-display text-display-sm text-linen-800 leading-relaxed
              transition-all duration-700 ease-out
              ${step >= i + 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Botón de inicio */}
      <div
        className={`
          transition-all duration-700 ease-out
          ${step >= totalSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <button
          onClick={onStart}
          className="
            font-body text-sm font-medium tracking-[0.15em] uppercase
            text-linen-50 bg-linen-800 hover:bg-linen-900
            py-4 px-10 rounded-sm
            active:scale-[0.98]
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-linen-50
          "
        >
          {TEXTS.intro.cta}
        </button>
      </div>
    </div>
  )
}
