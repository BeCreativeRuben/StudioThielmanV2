import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Packages() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '€25/month',
      startupFee: 'No startup fee',
      description: 'Get online without breaking the bank. A professional web presence for anyone.',
      features: [
        'Responsive Design - Mobile-optimized, all devices',
        'Email Service - Basic (500 emails/month)',
        'Conversions - Simple booking systems, basic contact forms',
        'Animations - Simple animations',
        'CMS - None (static pages)',
        'E-commerce - No',
        'SEO - Basic on-page optimization',
        'Support - Email support, documentation'
      ],
      idealFor: [
        'Startups and personal brands',
        'Small local businesses',
        'Freelancers and consultants',
        'Anyone needing a professional online presence'
      ],
      examples: ['Freelance Designer Portfolio', 'Personal Coach', 'Photography Studio']
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '€40/month',
      startupFee: '+ €250 startup',
      featured: true,
      description: 'Scale your online presence. Convert visitors into customers. Stay ahead of competitors.',
      features: [
        'All Starter Features',
        'Dynamic Content - Real-time updates',
        'Email Service - Advanced (unlimited for clients & customers)',
        'Conversions - Optimized funnels, automated monthly follow-ups, lead tracking',
        'CMS - Simple CMS system (content management without coding)',
        'Complex Animations - Advanced interactions',
        'SEO - Full SEO optimization (keywords, meta, structure, speed)',
        'Analytics - Basic analytics & monthly reports',
        'Support - Priority email & chat support'
      ],
      idealFor: [
        'Established small businesses (10-50 employees)',
        'E-service providers (consultants, trainers)',
        'Businesses with customer acquisition focus',
        'Companies looking to modernize'
      ],
      examples: ['Digital Agency', 'E-Services Company', 'Coaching/Training Business']
    },
    {
      id: 'pro-max',
      name: 'Pro Max',
      price: '€80/month',
      startupFee: '+ €500 startup',
      description: 'Go all-in. Automate your business. Let AI work for you while you focus on growth.',
      features: [
        'All Growth Features',
        'Full CMS System - Complete content, media, site management',
        'E-commerce - Full integration (Shopify, WooCommerce, or custom)',
        'AI Conversions - Real-time customer data, continuous A/B testing',
        'AI Integrations - Chatbots, Call support, Custom assistants, N8N workflows',
        'Custom Animations - Advanced, bespoke interactions',
        'Advanced Analytics - Heat maps, user behavior, custom dashboards',
        'White-Glove Service - Bi-monthly reviews, Quarterly strategy, Dedicated manager',
        'Support - 24/5 priority support, dedicated contact'
      ],
      idealFor: [
        'E-commerce businesses',
        'SaaS platforms',
        'AI-powered service platforms',
        'Businesses requiring advanced automation'
      ],
      examples: ['E-commerce Store', 'SaaS Platform', 'AI-Powered Service Platform']
    }
  ]

  const faqs = [
    {
      question: 'How long does a website take?',
      answer: 'Starter packages typically take 1-2 weeks, Growth packages 2-4 weeks, and Pro Max packages 4-6 weeks. Timeline depends on complexity and your availability for feedback.'
    },
    {
      question: 'Do I need to know anything technical?',
      answer: 'Not at all! We handle all the technical aspects. You just need to provide content, feedback, and approval. We\'ll guide you through everything.'
    },
    {
      question: 'Can you work in my language?',
      answer: 'Yes! We can build websites in any language. Just let us know your preferred language during the discovery call.'
    },
    {
      question: 'What if I want to change things later?',
      answer: 'All packages include support for updates and changes. Growth and Pro Max packages include priority support for faster turnaround times.'
    },
    {
      question: 'Can I upgrade my package later?',
      answer: 'Absolutely! You can upgrade at any time. We\'ll prorate the difference and add the new features to your existing website.'
    }
  ]

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
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-large text-gray-600"
          >
            Everything you need to grow online
          </motion.p>
        </div>
      </section>

      {/* Package Sections */}
      {packages.map((pkg, index) => (
        <section 
          key={pkg.id} 
          ref={index === 0 ? sectionRef : null}
          className={`section-padding ${index % 2 === 0 ? 'bg-primary-white' : 'bg-gray-light'}`}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="flex items-start justify-between mb-6"
              >
                <div>
                  <h2 className="heading-h2 mb-2">{pkg.name}</h2>
                  <div className="text-2xl font-bold text-primary-black mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-600">{pkg.startupFee}</div>
                </div>
                {pkg.featured && (
                  <div className="bg-success text-primary-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full">
                    MOST POPULAR
                  </div>
                )}
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-body-large text-gray-700 mb-8 leading-relaxed"
              >
                {pkg.description}
              </motion.p>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="heading-h3 mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-base text-gray-700 flex items-start leading-relaxed">
                        <span className="text-primary-black mr-2 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="heading-h3 mb-4">Perfect For:</h3>
                  <ul className="space-y-3 mb-6">
                    {pkg.idealFor.map((item, idx) => (
                      <li key={idx} className="text-base text-gray-700 flex items-start leading-relaxed">
                        <span className="text-primary-black mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    <h3 className="heading-h3 mb-4">Example Websites:</h3>
                    <div className="flex flex-wrap gap-2">
                      {pkg.examples.map((example, idx) => (
                        <Link
                          key={idx}
                          to="/portfolio"
                          className="text-sm text-primary-black hover:underline uppercase tracking-wider min-h-[44px] min-w-[44px] inline-flex items-center px-3 py-2"
                        >
                          {example}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/contact" className="inline-block min-h-[44px] min-w-[44px] w-full md:w-auto">
                  <Button variant={pkg.featured ? 'primary' : 'secondary'} size="lg" className="w-full md:w-auto">
                    Choose {pkg.name}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-h2 text-center mb-10 md:mb-12 lg:mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature">
                  <h3 className="heading-h3 mb-3">{faq.question}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
