import { useState, useRef, useEffect } from 'react'
import { TEXTS } from '../config/experience'

/**
 * Campo de entrada para los códigos de desbloqueo.
 *
 * Props:
 * - onSubmit: (code: string) => void
 * - disabled: boolean
 */
export default function CodeInput({ onSubmit, disabled = false }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    // Enfocar automáticamente tras un breve delay para no interrumpir animaciones
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim() || disabled) return

    const result = onSubmit(code)

    if (result === false) {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto animate-fade-in">
      <label htmlFor="unlock-code" className="sr-only">
        Código de desbloqueo
      </label>

      <div className={`transition-transform ${shaking ? 'animate-shake' : ''}`}>
        <input
          ref={inputRef}
          id="unlock-code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            if (error) setError(false)
          }}
          placeholder={TEXTS.codeInput.placeholder}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="characters"
          className="
            w-full text-center text-lg font-body tracking-widest
            bg-white/60 backdrop-blur-sm
            border-b-2 border-linen-300
            focus:border-champagne focus:outline-none
            py-4 px-6 rounded-none
            placeholder:text-linen-400 placeholder:tracking-wider
            text-linen-900
            transition-colors duration-300
            disabled:opacity-50
          "
        />
      </div>

      <button
        type="submit"
        disabled={!code.trim() || disabled}
        className="
          w-full mt-5 py-3.5 px-8
          font-body text-sm font-medium tracking-[0.15em] uppercase
          text-linen-50 bg-linen-800
          hover:bg-linen-900
          active:scale-[0.98]
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-300
          rounded-sm
        "
      >
        {disabled ? TEXTS.codeInput.unlocking : TEXTS.codeInput.button}
      </button>

      <div
        className={`
          mt-4 text-center text-sm font-body text-champagne-dark
          transition-all duration-500
          ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}
        role="alert"
        aria-live="polite"
      >
        {TEXTS.codeInput.error}
      </div>
    </form>
  )
}
