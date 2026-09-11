import { useState } from 'react'
import { STAGES } from '../config/experience'
import CodeInput from './CodeInput'

/**
 * Vista de detalle de una etapa.
 *
 * Muestra el teaser, la persona involucrada y el input de código.
 *
 * Props:
 * - stageId: string
 * - state: 'AVAILABLE' | 'COMPLETED'
 * - onValidateCode: (stageId, code) => boolean
 * - onUnlock: (stageId) => void
 * - onBack: () => void
 */
export default function StageView({ stageId, state, onValidateCode, onUnlock, onBack }) {
  const [unlocking, setUnlocking] = useState(false)
  const stage = STAGES.find((s) => s.id === stageId)

  if (!stage) return null

  const isLastStage = stageId === 'date'

  const handleCodeSubmit = (code) => {
    const isValid = onValidateCode(stageId, code)
    if (isValid) {
      setUnlocking(true)
      // Pequeño delay para la animación de desbloqueo
      setTimeout(() => {
        onUnlock(stageId)
      }, 1500)
      return true
    }
    return false
  }

  if (state === 'COMPLETED') {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center animate-fade-in">
          <span className="text-champagne text-3xl mb-4 block">✓</span>
          <p className="font-display text-display-sm text-linen-800">
            Ya completaste este momento
          </p>
          <button onClick={onBack} className="mt-8 text-sm text-linen-500 font-body underline underline-offset-4">
            Volver al recorrido
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
      {/* Botón regresar */}
      <button
        onClick={onBack}
        className="
          fixed top-6 left-6 z-20
          font-body text-sm text-linen-500
          hover:text-linen-700
          transition-colors
          focus:outline-none focus:text-linen-700
          bg-linen-50/80 backdrop-blur-sm
          py-2 px-3 rounded-sm
        "
        aria-label="Volver al recorrido"
      >
        ← Volver
      </button>

      <div className="max-w-md w-full text-center">
        {/* Ícono de etapa */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-block text-2xl text-champagne mb-6">{stage.icon}</span>

          <h2 className="font-display text-display-md text-linen-800 mb-6">
            {stage.teaser.heading}
          </h2>

          <div className="space-y-3 mb-10">
            {stage.teaser.lines.map((line, i) => (
              <p
                key={i}
                className="font-body text-base text-linen-600 leading-relaxed animate-slide-up"
                style={{ animationDelay: `${300 + i * 200}ms` }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Persona involucrada */}
          {stage.person && (
            <p
              className="font-body text-xs tracking-[0.2em] uppercase text-linen-400 mb-10 animate-fade-in"
              style={{ animationDelay: '800ms' }}
            >
              {stage.person}
            </p>
          )}
        </div>

        {/* Animación de desbloqueo */}
        {unlocking ? (
          <div className="animate-scale-in text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-champagne/10 flex items-center justify-center mb-4">
              <span className="text-2xl animate-heart-beat">✦</span>
            </div>
            <p className="font-display text-lg text-champagne-dark italic">
              {isLastStage ? 'Ahora comienza todo…' : 'Desbloqueando…'}
            </p>
          </div>
        ) : (
          <div style={{ animationDelay: '1000ms' }} className="animate-fade-in">
            <CodeInput onSubmit={handleCodeSubmit} disabled={unlocking} />
          </div>
        )}
      </div>
    </div>
  )
}
