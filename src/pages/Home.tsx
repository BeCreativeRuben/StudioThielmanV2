import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Button from '../components/Button'
import Card from '../components/Card'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion 
        ? { duration: 0 }
        : { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99] as any
          }
    }
  }

  const features = [
    {
      icon: '🎯',
      title: 'Affordable Excellence',
      description: 'Enterprise-grade work at startup prices. You shouldn\'t have to choose between quality and affordability.'
    },
    {
      icon: '🧠',
      title: 'Zero Technical Knowledge Required',
      description: 'You focus on your business. We handle the code, the design, the technology. No confusing jargon.'
    },
    {
      icon: '⚡',
      title: 'AI-Powered from Day One',
      description: 'Chatbots. Automation. Integrations. Every package comes with AI-powered features to make your business smarter.'
    },
    {
      icon: '🤝',
      title: 'Personal & Tailored',
      description: 'No templates. No cookie-cutter solutions. We listen, we understand, we build exactly what you need.'
    }
  ]

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '€25/month',
      startupFee: 'No startup fee',
      features: [
        'Responsive Design',
        'Email Service (500/month)',
        'Simple Conversions',
        'Basic SEO',
        'Email Support'
      ],
      cta: 'Get Started'
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '€40/month',
      startupFee: '+ €250 startup',
      featured: true,
      features: [
        'All Starter Features',
        'Dynamic Content',
        'Advanced Email (unlimited)',
        'Simple CMS System',
        'Full SEO Optimization',
        'Basic Analytics',
        'Priority Support'
      ],
      cta: 'Choose This'
    },
    {
      id: 'pro-max',
      name: 'Pro Max',
      price: '€80/month',
      startupFee: '+ €500 startup',
      features: [
        'All Growth Features',
        'Full CMS System',
        'E-commerce Integration',
        'AI Conversions',
        'AI Integrations',
        'Advanced Analytics',
        'White-Glove Service',
        '24/5 Priority Support'
      ],
      cta: 'Go All In'
    }
  ]

  const testimonials = [
    {
      id: 1,
      quote: "They built exactly what we needed. No technical knowledge required, amazing support throughout the process.",
      author: "Sarah Johnson",
      company: "Local Business Owner",
      rating: 5
    },
    {
      id: 2,
      quote: "The AI features they integrated have transformed how we interact with customers. Our conversion rate increased by 40%!",
      author: "Michael Chen",
      company: "E-commerce Store",
      rating: 5
    },
    {
      id: 3,
      quote: "Affordable, professional, and they actually care about your success. Best investment we've made for our online presence.",
      author: "Emma Williams",
      company: "Creative Agency",
      rating: 5
    },
    {
      id: 4,
      quote: "From concept to launch, the process was smooth and transparent. The website exceeded our expectations.",
      author: "David Martinez",
      company: "Consulting Firm",
      rating: 5
    },
    {
      id: 5,
      quote: "The monthly pricing model is perfect for our budget. We get enterprise-quality work without the enterprise price tag.",
      author: "Lisa Anderson",
      company: "Non-Profit Organization",
      rating: 5
    }
  ]

  // Testimonials Section Component
  type Testimonial = {
    id: number
    quote: string
    author: string
    company: string
    rating: number
  }
  
  function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    const prefersReducedMotion = useReducedMotion()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(!prefersReducedMotion)
    const [reviewsPerView, setReviewsPerView] = useState(1)

    useEffect(() => {
      const updateReviewsPerView = () => {
        if (window.innerWidth >= 1024) {
          setReviewsPerView(3)
        } else if (window.innerWidth >= 768) {
          setReviewsPerView(2)
        } else {
          setReviewsPerView(1)
        }
      }

      updateReviewsPerView()
      window.addEventListener('resize', updateReviewsPerView)
      return () => window.removeEventListener('resize', updateReviewsPerView)
    }, [])

    useEffect(() => {
      if (!isAutoPlaying || prefersReducedMotion) return
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, testimonials.length - reviewsPerView)
          return prev >= maxIndex ? 0 : prev + 1
        })
      }, 5000) // Auto-advance every 5 seconds

      return () => clearInterval(interval)
    }, [isAutoPlaying, testimonials.length, reviewsPerView, prefersReducedMotion])

    const handleNext = () => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, testimonials.length - reviewsPerView)
        return prev >= maxIndex ? 0 : prev + 1
      })
      setIsAutoPlaying(false)
    }

    const handlePrev = () => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, testimonials.length - reviewsPerView)
        return prev <= 0 ? maxIndex : prev - 1
      })
      setIsAutoPlaying(false)
    }

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Only handle arrow keys when carousel is in focus or visible
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          handlePrev()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          handleNext()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, testimonials.length, reviewsPerView])

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + reviewsPerView)
    
    // If we're near the end, wrap around to show the first ones
    if (visibleTestimonials.length < reviewsPerView) {
      const remaining = reviewsPerView - visibleTestimonials.length
      visibleTestimonials.push(...testimonials.slice(0, remaining))
    }

    return (
      <section className="section-padding bg-gray-light overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">What Our Clients Say</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Real feedback from real businesses
            </p>
          </motion.div>

          <div className="relative">
            {/* Testimonials Container */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                   {visibleTestimonials.map((testimonial: Testimonial, index: number) => (
                    <motion.div
                      key={`${testimonial.id}-${currentIndex}`}
                      initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }}
                    >
                      <Card variant="testimonial" hover={true}>
                        <p className="text-body-large text-gray-700 mb-6 italic leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center justify-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.span
                              key={i}
                              initial={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={prefersReducedMotion ? { duration: 0 } : { 
                                delay: 0.3 + i * 0.05,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                              className="text-primary-black text-lg"
                            >
                              ⭐
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-primary-black uppercase tracking-wider mb-1">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-gray-600 uppercase tracking-wider">
                          {testimonial.company}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={handlePrev}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-primary-black text-primary-white flex items-center justify-center hover:bg-primary-black/90 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary-white focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft className="h-6 w-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.max(1, testimonials.length - reviewsPerView + 1) }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-black focus:ring-offset-2 ${
                      currentIndex === index
                        ? 'bg-primary-black w-8'
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-primary-black text-primary-white flex items-center justify-center hover:bg-primary-black/90 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary-white focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <HiChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-primary-white overflow-hidden relative pt-16 md:pt-20">
        {/* Animated Background Circles */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary-black/5 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary-black/5 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </>
        )}
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="container-custom text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.img
              src="/images/fulllogo_transparent_nobuffer.png"
              alt="Studio Thielman"
              width={400}
              height={160}
              className="h-24 md:h-32 lg:h-40 mx-auto w-auto object-contain"
              fetchPriority="high"
              initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            />
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-h1 mb-6">
            Professional Websites.
            <br />
            No Tech Knowledge Required.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-body-large text-gray-600 mb-12 max-w-2xl mx-auto">
            Starting at €25/month. Built by a developer who genuinely cares about your success.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-block min-h-[44px] min-w-[44px]">
              <Button variant="primary" size="lg">
                Book Your Discovery Call
              </Button>
            </Link>
            <Link to="/packages" className="inline-block min-h-[44px] min-w-[44px]">
              <Button variant="secondary" size="lg">
                View Packages
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-black/60 hover:text-primary-black transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-black focus:ring-offset-2 rounded"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          tabIndex={0}
          role="button"
          aria-label="Scroll to next section"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              window.scrollTo({ top: window.innerHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
            }
          }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <HiArrowDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* Why Studio Thielman Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.h2 
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="heading-h2 text-center mb-4"
          >
            Why Studio Thielman?
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="text-body-large text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-12 lg:mb-16"
          >
            Professional web solutions designed for your success
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="heading-h3 mb-3">{feature.title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Overview */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">Pick Your Perfect Plan</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Everything you need to grow online
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  variant="feature" 
                  className={pkg.featured ? 'border-2 border-primary-black' : ''}
                >
                  {pkg.featured && (
                    <div className="bg-success text-primary-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="heading-h3 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary-black">{pkg.price}</div>
                    <div className="text-sm text-gray-600">{pkg.startupFee}</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-primary-black mr-2 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/packages" className="block min-h-[44px] min-w-[44px]">
                    <Button variant={pkg.featured ? 'primary' : 'secondary'} className="w-full">
                      {pkg.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">See What's Possible</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Real websites built with care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.1 }}
              >
                <Card variant="portfolio">
                  <div className="h-48 bg-gray-200 rounded mb-4 overflow-hidden">
                    <div className="w-full h-full"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Example Website {i}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    A professional website showcasing our capabilities
                  </p>
                  <Link to="/portfolio" className="text-sm text-primary-black hover:underline uppercase tracking-wider min-h-[44px] min-w-[44px] inline-flex items-center py-2">
                    View Site →
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Final CTA */}
      {/* Final CTA */}
      <section className="section-padding bg-primary-black text-primary-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="heading-h2 mb-6 text-primary-white">
              Ready to Transform Your
              <br />
              <span className="relative inline-block">
                Online Presence?
                {!prefersReducedMotion && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-white"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                )}
              </span>
            </h2>
              <p className="text-body-large text-primary-white/80 max-w-2xl mx-auto">
                Join businesses that have transformed their online presence. Let's build something amazing together.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
            >
              {[
                {
                  icon: '🚀',
                  title: 'Get Started Today',
                  description: 'Book your free discovery call and let\'s discuss your vision'
                },
                {
                  icon: '💡',
                  title: 'No Commitment',
                  description: 'Explore your options with zero pressure. We\'re here to help'
                },
                {
                  icon: '✨',
                  title: 'See Results Fast',
                  description: 'From concept to launch in weeks, not months'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  className="bg-primary-white/5 backdrop-blur-sm border border-primary-white/10 rounded-lg p-6 md:p-8 text-center transition-all duration-300 hover:bg-primary-white/10 hover:border-primary-white/20"
                >
                  <motion.div
                    className="text-4xl md:text-5xl mb-4"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={prefersReducedMotion ? {} : { type: 'spring', stiffness: 300 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-primary-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link to="/contact" className="inline-block min-h-[44px] min-w-[44px]">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-primary-white text-primary-black border-primary-white hover:bg-gray-light hover:border-gray-light"
                  >
                    Book Your Free Call
                  </Button>
                </Link>
                <Link to="/packages" className="inline-block min-h-[44px] min-w-[44px]">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-transparent text-primary-white border-primary-white hover:bg-primary-white/10"
                  >
                    View Packages
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-primary-white/60"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary-white/40">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="hidden sm:block text-primary-white/40">•</div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-white/40">✓</span>
                  <span>30-minute call</span>
                </div>
                <div className="hidden sm:block text-primary-white/40">•</div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-white/40">✓</span>
                  <span>Free consultation</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
