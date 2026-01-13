import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`input-field rounded ${error ? 'border-error focus:border-error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id || label}-error` : undefined}
          {...props}
        />
        {error && (
          <motion.p
            id={`${props.id || label}-error`}
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-error"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
