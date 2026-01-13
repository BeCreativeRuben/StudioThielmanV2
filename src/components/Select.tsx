import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`input-field rounded bg-white ${error ? 'border-error focus:border-error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id || label}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select'

export default Select
