import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { path: '/packages', label: 'Packages' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]
  
  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
  ]
  
  return (
    <footer className="bg-primary-black text-primary-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <img
            src="/images/fulllogo copy.png"
            alt="Studio Thielman"
            width={200}
            height={80}
            className="h-8 w-auto object-contain brightness-0 invert"
            loading="lazy"
          />
          
          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm uppercase tracking-wider text-primary-white/80 hover:text-primary-white transition-colors min-h-[44px] min-w-[44px] flex items-center py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://www.instagram.com/studio_thielman/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white/80 hover:text-primary-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=61586029966601"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white/80 hover:text-primary-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white/80 hover:text-primary-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white/80 hover:text-primary-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </motion.a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-white/60 uppercase tracking-wider">
            © {currentYear} Studio Thielman. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-primary-white/60 hover:text-primary-white/80 transition-colors min-h-[44px] min-w-[44px] flex items-center py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
