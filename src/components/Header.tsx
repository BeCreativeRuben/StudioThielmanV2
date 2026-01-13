import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Button from './Button'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Header() {
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/packages', label: 'Packages' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]
  
  return (
    <motion.header
      initial={prefersReducedMotion ? { y: 0 } : { y: -100 }}
      animate={{ y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary-white/95 backdrop-blur-md shadow-sm h-16' 
          : 'bg-transparent h-16 md:h-20'
      }`}
    >
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            src="/images/fulllogo_transparent_nobuffer.png"
            alt="Studio Thielman"
            width={200}
            height={80}
            className="h-14 md:h-16 w-auto object-contain"
            fetchPriority="high"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative text-sm font-medium uppercase tracking-wider transition-colors min-h-[44px] min-w-[44px] flex items-center"
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-black"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.span
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                className={`block ${
                  location.pathname === item.path 
                    ? 'text-primary-black' 
                    : 'text-gray-600 hover:text-primary-black'
                }`}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>
        
        {/* Desktop CTA */}
        <Link to="/contact" className="hidden md:block">
          <Button variant="primary" size="md">
            Book a Call
          </Button>
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-black min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-black focus:ring-offset-2 rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="md:hidden bg-primary-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="container-custom py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={prefersReducedMotion ? {} : { x: 10 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-medium uppercase tracking-wider ${
                      location.pathname === item.path
                        ? 'text-primary-black'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block min-h-[44px] min-w-[44px]">
                  <Button variant="primary" className="w-full">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
