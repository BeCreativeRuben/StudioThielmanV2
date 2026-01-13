import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const baseClasses = 'font-semibold uppercase tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-primary-black focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-primary-black text-primary-white hover:bg-gray-800',
    secondary: 'border-2 border-primary-black text-primary-black hover:bg-primary-black hover:text-primary-white',
    outline: 'border-2 border-primary-black text-primary-black hover:bg-primary-black hover:text-primary-white bg-transparent'
  }
  
  const sizeClasses = {
    sm: 'px-6 py-3',
    md: 'px-8 py-4',
    lg: 'px-10 py-5'
  }
  
  if (prefersReducedMotion) {
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
