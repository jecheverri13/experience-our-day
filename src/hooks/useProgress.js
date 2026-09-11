import { useState, useCallback, useMemo } from 'react'
import { STAGES } from '../config/experience'
import { loadProgress, saveProgress, initProgress, resetProgress } from '../utils/storage'

const STAGE_ORDER = STAGES.map((s) => s.id)

/**
 * Determina el estado de cada etapa según el progreso actual.
 */
function computeStageStates(completedActivities, currentStep) {
  const states = {}
  for (let i = 0; i < STAGE_ORDER.length; i++) {
    const id = STAGE_ORDER[i]
    if (completedActivities.includes(id)) {
      states[id] = 'COMPLETED'
    } else if (id === currentStep) {
      states[id] = 'AVAILABLE'
    } else {
      states[id] = 'LOCKED'
    }
  }
  return states
}

/**
 * Hook principal de progreso.
 *
 * Maneja:
 * - Estado de las etapas (LOCKED / AVAILABLE / COMPLETED)
 * - Validación de códigos
 * - Avance de progreso
 * - Persistencia
 */
export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = loadProgress()
    return saved || null
  })

  const isReturning = progress !== null
  const isComplete = progress?.currentStep === 'complete'

  const stageStates = useMemo(() => {
    if (!progress) return computeStageStates([], 'nails')
    return computeStageStates(progress.completedActivities, progress.currentStep)
  }, [progress])

  /**
   * Inicia la experiencia (primera vez).
   */
  const startExperience = useCallback(() => {
    const fresh = initProgress()
    setProgress(fresh)
  }, [])

  /**
   * Valida un código para una etapa específica.
   * Devuelve true si es correcto.
   */
  const validateCode = useCallback(
    (stageId, inputCode) => {
      const stage = STAGES.find((s) => s.id === stageId)
      if (!stage) return false

      // Normalizar: quitar espacios, convertir a mayúsculas
      const normalized = inputCode.trim().toUpperCase()
      const expected = stage.code.trim().toUpperCase()

      return normalized === expected
    },
    []
  )

  /**
   * Completa una etapa y avanza a la siguiente.
   */
  const completeStage = useCallback(
    (stageId) => {
      if (!progress) return

      const currentIndex = STAGE_ORDER.indexOf(stageId)
      if (currentIndex === -1) return

      const nextStep =
        currentIndex < STAGE_ORDER.length - 1
          ? STAGE_ORDER[currentIndex + 1]
          : 'complete'

      const updated = {
        ...progress,
        completedActivities: [...progress.completedActivities, stageId],
        currentStep: nextStep,
      }

      setProgress(updated)
      saveProgress(updated)
    },
    [progress]
  )

  /**
   * Reinicia toda la experiencia desde cero.
   * Borra localStorage y recarga la página.
   */
  const resetExperience = useCallback(() => {
    resetProgress()
    window.location.reload()
  }, [])

  return {
    progress,
    isReturning,
    isComplete,
    stageStates,
    startExperience,
    validateCode,
    completeStage,
    resetExperience,
  }
}
