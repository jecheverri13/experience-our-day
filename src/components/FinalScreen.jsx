import { useState, useCallback, useRef } from 'react'
import { CONFIG, TEXTS } from '../config/experience'
import AnimatedText from './AnimatedText'

/**
 * Pantalla final — cierre de la experiencia.
 *
 * Se muestra después de completar las cuatro etapas.
 * Construye emocionalmente hacia el encuentro presencial.
 * NO revela la propuesta de matrimonio.
 *
 * Reinicio oculto: tocar 5 veces rápido "Te espero. ❤️"
 *
 * Props:
 * - immediate: boolean — si true, no anima (para usuarios que regresan)
 * - onReset: () => void
 */
export default function FinalScreen({ immediate = false, onReset }) {
  const [phase, setPhase] = useState(immediate ? 'closing' : 'narrative')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const tapCountRef = useRef(0)
  const tapTimerRef = useRef(null)

  const handleHeartTap = () => {
    tapCountRef.current += 1
    clearTimeout(tapTimerRef.current)
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0
    }, 1500)
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0
      setShowResetConfirm(true)
    }
  }

  const handleNarrativeComplete = useCallback(() => {
    setTimeout(() => setPhase('closing'), 1500)
  }, [])

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full">
        {/* Fase 1: Narrativa final */}
        {phase === 'narrative' && (
          <AnimatedText
            lines={TEXTS.final.sequence}
            delayBetween={2000}
            initialDelay={800}
            className="text-center"
            lineClassName="font-display text-xl sm:text-display-sm text-linen-800 leading-relaxed"
            onComplete={handleNarrativeComplete}
          />
        )}

        {/* Fase 2: Cierre con foto + mensaje final */}
        {phase === 'closing' && (
          <div className="text-center animate-fade-in-slow">
            {/* Fotografía final */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-sm overflow-hidden mb-10">
              {!imageError ? (
                <img
                  src={CONFIG.images.final}
                  alt="Nosotros"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`
                    w-full h-full object-cover
                    transition-opacity duration-1000
                    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              ) : null}

              {(!imageLoaded || imageError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-linen-200">
                  <span className="text-4xl opacity-20">♥</span>
                </div>
              )}
            </div>

            {/* Versículo bíblico (si está configurado) */}
            {CONFIG.verse.enabled && CONFIG.verse.text && (
              <div className="mb-10 px-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <p className="font-display text-base italic text-linen-600 leading-relaxed">
                  "{CONFIG.verse.text}"
                </p>
                {CONFIG.verse.reference && (
                  <p className="font-body text-xs text-linen-400 mt-2">
                    — {CONFIG.verse.reference}
                  </p>
                )}
              </div>
            )}

            {/* Mensaje de cierre */}
            <div className="space-y-6">
              <p
                className="font-display text-display-md text-linen-800 animate-slide-up"
                style={{ animationDelay: '600ms' }}
              >
                {TEXTS.final.closing}
              </p>

              <p
                onClick={handleHeartTap}
                className="font-display text-display-sm text-champagne-dark animate-slide-up select-none cursor-default"
                style={{ animationDelay: '1200ms' }}
              >
                {TEXTS.final.heart}
              </p>
            </div>

            {/* Botón de ubicación (si está configurado) */}
            {CONFIG.finalDestination.enabled && CONFIG.finalDestination.mapsUrl && (
              <div className="mt-12 animate-fade-in" style={{ animationDelay: '2000ms' }}>
                <a
                  href={CONFIG.finalDestination.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    font-body text-sm font-medium tracking-[0.15em] uppercase
                    text-linen-50 bg-linen-800 hover:bg-linen-900
                    py-4 px-10 rounded-sm
                    active:scale-[0.98]
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-linen-50
                  "
                >
                  {TEXTS.final.locationCta}
                </a>

                {CONFIG.finalDestination.label && (
                  <p className="font-body text-xs text-linen-400 mt-3">
                    {CONFIG.finalDestination.label}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmación de reinicio */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linen-950/40 backdrop-blur-sm px-6">
          <div className="bg-linen-50 rounded-sm p-8 max-w-xs w-full text-center shadow-xl animate-scale-in">
            <p className="font-display text-lg text-linen-800 mb-2">
              ¿Reiniciar la experiencia?
            </p>
            <p className="font-body text-sm text-linen-500 mb-8">
              Se borrará todo el progreso.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="
                  flex-1 py-3 font-body text-sm
                  text-linen-600 bg-linen-200 hover:bg-linen-300
                  rounded-sm transition-colors
                "
              >
                Cancelar
              </button>
              <button
                onClick={onReset}
                className="
                  flex-1 py-3 font-body text-sm font-medium
                  text-linen-50 bg-linen-800 hover:bg-linen-900
                  rounded-sm transition-colors
                "
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
