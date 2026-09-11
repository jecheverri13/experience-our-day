import { STAGES, TEXTS } from '../config/experience'

/**
 * Línea de progreso vertical con nodos por cada etapa.
 *
 * Props:
 * - stageStates: { [id]: 'LOCKED' | 'AVAILABLE' | 'COMPLETED' }
 * - onStageClick: (stageId) => void
 */
export default function Timeline({ stageStates, onStageClick }) {
  return (
    <div className="relative py-8" role="list" aria-label="Recorrido del día">
      {/* Línea vertical central */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linen-300 -translate-x-1/2" />

      {/* Marca superior */}
      <div className="relative flex justify-center mb-10">
        <span className="relative z-10 w-3 h-3 rounded-full bg-champagne-light" />
      </div>

      {/* Nodos */}
      <div className="space-y-12">
        {STAGES.map((stage, index) => {
          const state = stageStates[stage.id]
          return (
            <TimelineNode
              key={stage.id}
              stage={stage}
              state={state}
              index={index}
              onClick={() => onStageClick(stage.id)}
            />
          )
        })}
      </div>

      {/* Marca inferior */}
      <div className="relative flex justify-center mt-10">
        <span
          className={`
            relative z-10 text-lg transition-all duration-500
            ${stageStates.date === 'COMPLETED' ? 'text-champagne scale-110' : 'text-linen-300'}
          `}
        >
          ♥
        </span>
      </div>
    </div>
  )
}

function TimelineNode({ stage, state, index, onClick }) {
  const isCompleted = state === 'COMPLETED'
  const isAvailable = state === 'AVAILABLE'
  const isLocked = state === 'LOCKED'

  return (
    <div
      role="listitem"
      className={`
        relative flex items-center
        ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Nodo central */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={onClick}
          disabled={isLocked}
          aria-label={`${stage.title} — ${
            isCompleted
              ? TEXTS.stages.completed
              : isAvailable
              ? TEXTS.stages.available
              : TEXTS.stages.locked
          }`}
          className={`
            w-11 h-11 rounded-full flex items-center justify-center
            transition-all duration-500 ease-out
            focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-linen-50
            ${
              isCompleted
                ? 'bg-champagne text-white shadow-md shadow-champagne/20'
                : isAvailable
                ? 'bg-linen-50 border-2 border-champagne text-champagne shadow-sm cursor-pointer hover:shadow-md hover:scale-105 active:scale-95'
                : 'bg-linen-100 border border-linen-300 text-linen-400 cursor-not-allowed'
            }
          `}
        >
          <span className="text-sm">
            {isCompleted ? '✓' : isLocked ? '' : stage.icon}
          </span>
        </button>

        {/* Pulso en nodo disponible */}
        {isAvailable && (
          <span className="absolute inset-0 rounded-full border-2 border-champagne animate-glow-pulse" />
        )}
      </div>

      {/* Tarjeta de contenido */}
      <div
        className={`
          w-[42%]
          ${index % 2 === 0 ? 'mr-auto pl-4 sm:pl-6 text-left' : 'ml-auto pr-4 sm:pr-6 text-right'}
        `}
      >
        <button
          onClick={onClick}
          disabled={isLocked}
          className={`
            w-full text-left group
            ${index % 2 !== 0 ? 'text-right' : ''}
            ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
            focus:outline-none
          `}
        >
          <h3
            className={`
              font-display text-lg sm:text-xl leading-tight mb-1
              transition-colors duration-300
              ${
                isCompleted
                  ? 'text-linen-800'
                  : isAvailable
                  ? 'text-linen-800 group-hover:text-champagne-dark'
                  : 'text-linen-400'
              }
            `}
          >
            {stage.title}
          </h3>

          <p
            className={`
              font-body text-xs tracking-wide
              ${
                isCompleted
                  ? 'text-champagne'
                  : isAvailable
                  ? 'text-linen-500'
                  : 'text-linen-400'
              }
            `}
          >
            {isCompleted
              ? TEXTS.stages.completed
              : isAvailable
              ? TEXTS.stages.available
              : TEXTS.stages.locked}
          </p>
        </button>
      </div>
    </div>
  )
}
