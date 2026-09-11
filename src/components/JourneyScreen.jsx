import { useRef, useState } from 'react'
import Timeline from './Timeline'

/**
 * Pantalla principal del recorrido.
 *
 * Muestra la línea de progreso vertical y permite
 * navegar a las etapas disponibles.
 *
 * Reinicio oculto: tocar el título 5 veces rápido
 * muestra una confirmación para reiniciar la experiencia.
 *
 * Props:
 * - stageStates: { [id]: 'LOCKED' | 'AVAILABLE' | 'COMPLETED' }
 * - onStageClick: (stageId) => void
 * - onReset: () => void
 */
export default function JourneyScreen({ stageStates, onStageClick, onReset }) {
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleTitleTap = () => {
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

  return (
    <div className="min-h-[100dvh] flex flex-col px-4 py-10">
      {/* Encabezado */}
      <header className="text-center mb-8 animate-fade-in">
        <h1
          onClick={handleTitleTap}
          className="font-display text-display-md text-linen-800 mb-2 select-none cursor-default"
        >
          Nuestro día
        </h1>
        <p className="font-body text-sm text-linen-500">
          Sigue el camino, un paso a la vez
        </p>

      </header>

      {/* Timeline */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <Timeline stageStates={stageStates} onStageClick={onStageClick} />
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
