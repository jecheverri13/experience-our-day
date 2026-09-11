/**
 * Persistencia con localStorage.
 *
 * Guarda el progreso de la experiencia.
 * Si los datos están corruptos, se reinicia limpiamente.
 */

const STORAGE_KEY = 'nuestro-dia-progress'

const createFreshState = () => ({
  startedAt: null,
  completedActivities: [],
  currentStep: 'nails',
  lastUpdated: new Date().toISOString(),
})

/**
 * Valida que el estado guardado tenga la estructura correcta.
 */
function isValidState(state) {
  if (!state || typeof state !== 'object') return false
  if (!Array.isArray(state.completedActivities)) return false
  if (typeof state.currentStep !== 'string') return false
  const validSteps = ['nails', 'hair', 'dress', 'date', 'complete']
  if (!validSteps.includes(state.currentStep)) return false
  return state.completedActivities.every((a) => validSteps.includes(a) || a === 'complete')
}

/**
 * Lee el progreso guardado. Devuelve null si no hay progreso o si está corrupto.
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!isValidState(parsed)) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

/**
 * Guarda el progreso actual.
 */
export function saveProgress(state) {
  try {
    const toSave = {
      ...state,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // Si localStorage no está disponible, la experiencia sigue funcionando
    // pero sin persistencia.
  }
}

/**
 * Inicializa el progreso (primera visita).
 */
export function initProgress() {
  const fresh = createFreshState()
  fresh.startedAt = new Date().toISOString()
  saveProgress(fresh)
  return fresh
}

/**
 * Reinicia todo el progreso.
 */
export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silenciar errores.
  }
}
