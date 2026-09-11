import { useState, useCallback } from 'react'
import { STAGES } from '../config/experience'
import MemoryCard from './MemoryCard'
import AnimatedText from './AnimatedText'

/**
 * Vista narrativa post-desbloqueo.
 *
 * Muestra la cápsula de recuerdo y la secuencia de texto
 * para cada etapa completada.
 *
 * Props:
 * - stageId: string
 * - onContinue: () => void
 */
export default function NarrativeView({ stageId, onContinue }) {
  const [showNarrative, setShowNarrative] = useState(false)
  const [narrativeComplete, setNarrativeComplete] = useState(false)
  const stage = STAGES.find((s) => s.id === stageId)

  if (!stage) return null

  // Etapa sin narrativa (la última): ir directamente al continue
  if (!stage.narrative && !stage.memory) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-fade-in text-center">
          <p className="font-display text-display-sm text-linen-800 mb-8">
            El siguiente capítulo te espera
          </p>
          <ContinueButton onClick={onContinue} />
        </div>
      </div>
    )
  }

  // Determinar líneas con énfasis (humor sutil)
  const emphasisIndices = getEmphasisLines(stageId)

  const handleNarrativeComplete = useCallback(() => {
    setNarrativeComplete(true)
  }, [])

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full">
        {/* Recuerdo (foto + año + caption) */}
        {stage.memory && !showNarrative && (
          <div className="animate-fade-in-slow">
            <MemoryCard
              imageKey={stage.image}
              year={stage.memory.year}
              caption={stage.memory.caption}
            />

            {stage.narrative && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowNarrative(true)}
                  className="
                    font-body text-sm text-linen-500
                    hover:text-linen-700
                    transition-colors
                    underline underline-offset-4
                    focus:outline-none focus:text-linen-700
                  "
                >
                  Continuar la historia →
                </button>
              </div>
            )}

            {!stage.narrative && (
              <div className="text-center mt-10">
                <ContinueButton onClick={onContinue} />
              </div>
            )}
          </div>
        )}

        {/* Narrativa (textos en secuencia) */}
        {stage.narrative && (showNarrative || !stage.memory) && (
          <div>
            <AnimatedText
              lines={stage.narrative}
              delayBetween={1400}
              initialDelay={600}
              className="text-center"
              lineClassName="font-display text-xl sm:text-display-sm text-linen-800 leading-relaxed"
              emphasisLines={emphasisIndices}
              onComplete={handleNarrativeComplete}
            />

            <div
              className={`
                text-center mt-12
                transition-all duration-700
                ${narrativeComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <ContinueButton onClick={onContinue} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ContinueButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        font-body text-sm font-medium tracking-[0.15em] uppercase
        text-linen-50 bg-linen-800 hover:bg-linen-900
        py-3.5 px-10 rounded-sm
        active:scale-[0.98]
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-linen-50
      "
    >
      Continuar
    </button>
  )
}

/**
 * Líneas con énfasis/humor por etapa.
 * Los índices corresponden a las posiciones en el array narrative.
 */
function getEmphasisLines(stageId) {
  switch (stageId) {
    case 'hair':
      // "Te lo dije." / "…y me despachaste." / "Y dijiste que no." / "…me buscaste tú."
      return [2, 3, 8, 10]
    default:
      return []
  }
}
