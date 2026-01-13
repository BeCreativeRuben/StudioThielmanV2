import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Card from '../components/Card'

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'starter' | 'growth' | 'pro-max'>('all')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const examples = [
    {
      id: '1',
      title: 'Chromatic Band',
      description: 'A clean, minimal portfolio showcasing music and events',
      package: 'starter' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '2',
      title: 'Freelance Designer Portfolio',
      description: 'A professional portfolio with project showcases',
      package: 'starter' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '3',
      title: 'Photography Studio',
      description: 'Local service business with gallery and booking',
      package: 'starter' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '4',
      title: 'Solar Energy Company',
      description: 'B2B service company with CMS blog and lead forms',
      package: 'growth' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '5',
      title: 'Digital Agency',
      description: 'Web/marketing agency with case studies and blog',
      package: 'growth' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '6',
      title: 'Coaching Business',
      description: 'Online coaching platform with course previews',
      package: 'growth' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '7',
      title: 'E-Commerce Store',
      description: 'Full online retail with AI chatbot and cart recovery',
      package: 'pro-max' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '8',
      title: 'SaaS Platform',
      description: 'AI tool with features, pricing, and trial signup',
      package: 'pro-max' as const,
      thumbnail: '/placeholder.jpg'
    },
    {
      id: '9',
      title: 'AI Service Platform',
      description: 'Complex integrations and workflow automation',
      package: 'pro-max' as const,
      thumbnail: '/placeholder.jpg'
    }
  ]

  const filteredExamples = filter === 'all' 
    ? examples 
    : examples.filter(ex => ex.package === filter)

  const packageBadges = {
    starter: { label: 'Starter', color: 'bg-primary-black text-primary-white' },
    growth: { label: 'Growth', color: 'bg-success text-primary-white' },
    'pro-max': { label: 'Pro Max', color: 'bg-primary-black text-primary-white' }
  }

  return (
    <div className="w-full pt-16 md:pt-20">
      {/* Hero */}
      <section className="section-padding bg-primary-white text-center">
        <div className="container-custom max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-h1 mb-6"
          >
            See What's Possible
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-large text-gray-600"
          >
            Real websites built with care
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-light border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {(['all', 'starter', 'growth', 'pro-max'] as const).map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm transition-colors ${
                  filter === filterOption
                    ? 'bg-primary-black text-primary-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {filterOption === 'all' ? 'All' : filterOption === 'pro-max' ? 'Pro Max' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={sectionRef} className="section-padding bg-primary-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredExamples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="portfolio">
                  <div className="relative h-48 bg-gray-200 rounded mb-4 overflow-hidden group">
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`${packageBadges[example.package].color} text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full`}>
                        {packageBadges[example.package].label}
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-primary-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-primary-white/20 backdrop-blur-sm rounded-full p-3 text-primary-white"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  <a 
                    href={`/portfolio/${example.id}`}
                    className="text-sm text-primary-black hover:underline uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    View Full Site →
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
