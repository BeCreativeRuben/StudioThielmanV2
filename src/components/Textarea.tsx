import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={6}
          className={`input-field rounded resize-none ${error ? 'border-error focus:border-error' : ''} ${className}`}
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

Textarea.displayName = 'Textarea'

export default Textarea
