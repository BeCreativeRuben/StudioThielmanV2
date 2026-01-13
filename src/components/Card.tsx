import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CardProps {
  children: ReactNode
  hover?: boolean
  className?: string
  variant?: 'feature' | 'portfolio' | 'testimonial'
}

export default function Card({ 
  children, 
  hover = true, 
  className = '',
  variant = 'feature'
}: CardProps) {
  const prefersReducedMotion = useReducedMotion()
  const baseClasses = 'card-base p-6'
  
  const variantClasses = {
    feature: 'bg-white',
    portfolio: 'bg-white overflow-hidden',
    testimonial: 'bg-gray-light border-0'
  }
  
  if (!hover || prefersReducedMotion) {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
    )
  }
  
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  )
}
