import { useState, useCallback } from 'react'
import { useProgress } from './hooks/useProgress'
import { TEXTS } from './config/experience'
import IntroScreen from './components/IntroScreen'
import JourneyScreen from './components/JourneyScreen'
import StageView from './components/StageView'
import NarrativeView from './components/NarrativeView'
import FinalScreen from './components/FinalScreen'

/**
 * ═══════════════════════════════════════════════════
 * "Nuestro día" — App principal
 * ═══════════════════════════════════════════════════
 *
 * Flujo de vistas:
 *
 *   Primera visita:
 *     intro → journey → stage → narrative → journey → ... → final
 *
 *   Regreso con progreso:
 *     return → journey (en la etapa correcta)
 *
 *   Regreso completado:
 *     final (inmediato)
 */

// Vistas posibles
// 'intro'     — Primera visita, pantalla de bienvenida
// 'return'    — Regreso con progreso guardado
// 'journey'   — Timeline con las etapas
// 'stage'     — Detalle de una etapa (con input de código)
// 'narrative' — Historia post-desbloqueo
// 'final'     — Cierre de la experiencia

export default function App() {
  const {
    progress,
    isReturning,
    isComplete,
    stageStates,
    startExperience,
    validateCode,
    completeStage,
    resetExperience,
  } = useProgress()

  // Determinar vista inicial
  const initialView = isComplete ? 'final' : isReturning ? 'return' : 'intro'
  const [view, setView] = useState(initialView)
  const [activeStageId, setActiveStageId] = useState(null)
  const [lastCompletedStage, setLastCompletedStage] = useState(null)

  // ─── Navegación ─────────────────────────────────

  const handleStart = useCallback(() => {
    startExperience()
    setView('journey')
  }, [startExperience])

  const handleContinue = useCallback(() => {
    setView('journey')
  }, [])

  const handleStageClick = useCallback(
    (stageId) => {
      const state = stageStates[stageId]
      if (state === 'LOCKED') return
      setActiveStageId(stageId)
      setView('stage')
    },
    [stageStates]
  )

  const handleValidateCode = useCallback(
    (stageId, code) => {
      return validateCode(stageId, code)
    },
    [validateCode]
  )

  const handleUnlock = useCallback(
    (stageId) => {
      completeStage(stageId)
      setLastCompletedStage(stageId)

      // Si es la última etapa, ir directamente al final
      if (stageId === 'date') {
        setView('final')
      } else {
        setView('narrative')
      }
    },
    [completeStage]
  )

  const handleNarrativeContinue = useCallback(() => {
    setView('journey')
    setActiveStageId(null)
    setLastCompletedStage(null)
  }, [])

  const handleBack = useCallback(() => {
    setView('journey')
    setActiveStageId(null)
  }, [])

  // ─── Render ─────────────────────────────────────

  return (
    <main className="min-h-[100dvh] bg-linen-50 text-linen-900 selection:bg-champagne/20">
      {/* Transición entre vistas */}
      <div className="animate-fade-in" key={view + (activeStageId || '')}>
        {view === 'intro' && <IntroScreen onStart={handleStart} />}

        {view === 'return' && (
          <ReturnScreen onContinue={handleContinue} />
        )}

        {view === 'journey' && (
          <JourneyScreen
            stageStates={stageStates}
            onStageClick={handleStageClick}
            onReset={resetExperience}
          />
        )}

        {view === 'stage' && activeStageId && (
          <StageView
            stageId={activeStageId}
            state={stageStates[activeStageId]}
            onValidateCode={handleValidateCode}
            onUnlock={handleUnlock}
            onBack={handleBack}
          />
        )}

        {view === 'narrative' && lastCompletedStage && (
          <NarrativeView
            stageId={lastCompletedStage}
            onContinue={handleNarrativeContinue}
          />
        )}

        {view === 'final' && <FinalScreen immediate={isComplete && initialView === 'final'} onReset={resetExperience} />}
      </div>
    </main>
  )
}

/**
 * Pantalla de regreso — cuando hay progreso guardado.
 */
function ReturnScreen({ onContinue }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center animate-fade-in">
        <p className="font-display text-display-md text-linen-800 mb-4">
          {TEXTS.returning.greeting}
        </p>
        <p className="font-body text-base text-linen-600 mb-10">
          {TEXTS.returning.message}
        </p>
        <button
          onClick={onContinue}
          className="
            font-body text-sm font-medium tracking-[0.15em] uppercase
            text-linen-50 bg-linen-800 hover:bg-linen-900
            py-4 px-10 rounded-sm
            active:scale-[0.98]
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-linen-50
          "
        >
          {TEXTS.returning.cta}
        </button>
      </div>
    </div>
  )
}
