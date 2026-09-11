import { useState } from 'react'
import { CONFIG } from '../config/experience'

/**
 * Cápsula de recuerdo: fotografía + año + frase.
 *
 * Props:
 * - imageKey: clave en CONFIG.images
 * - year: año del recuerdo (opcional)
 * - caption: frase del recuerdo
 * - className: clases adicionales
 */
export default function MemoryCard({ imageKey, year, caption, className = '' }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const src = CONFIG.images[imageKey]

  return (
    <div className={`animate-fade-in ${className}`}>
      {year && (
        <p className="text-center font-display text-display-sm text-linen-500 mb-4">
          {year}
        </p>
      )}

      <div className="relative aspect-[4/5] max-w-xs mx-auto rounded-sm overflow-hidden bg-linen-200">
        {!imageError ? (
          <img
            src={src}
            alt={caption || 'Recuerdo'}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`
              w-full h-full object-cover transition-opacity duration-700
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ) : (
          <PlaceholderImage />
        )}

        {!imageLoaded && !imageError && <PlaceholderImage />}
      </div>

      {caption && (
        <p className="text-center font-display text-lg italic text-linen-600 mt-5 px-4 leading-relaxed">
          "{caption}"
        </p>
      )}
    </div>
  )
}

function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linen-200">
      <div className="text-center">
        <span className="block text-3xl mb-2 opacity-30">✦</span>
        <span className="text-xs text-linen-400 font-body">foto</span>
      </div>
    </div>
  )
}
