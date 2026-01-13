import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '1',
      title: 'Book a Call',
      description: 'Schedule a free discovery call to discuss your needs and goals. No pressure, just a friendly conversation.'
    },
    {
      number: '2',
      title: 'Tell Us Your Needs',
      description: 'Share your vision, business goals, and any existing assets. We\'ll ask the right questions to understand exactly what you need.'
    },
    {
      number: '3',
      title: 'We Design Your Solution',
      description: 'We create a custom design and strategy tailored to your business. You\'ll see wireframes and get to provide feedback.'
    },
    {
      number: '4',
      title: 'We Build It',
      description: 'Our team brings your website to life with clean code, modern design, and all the features you need.'
    },
    {
      number: '5',
      title: 'Launch & Support',
      description: 'We launch your website and provide ongoing support. You focus on your business while we handle the technology.'
    },
    {
      number: '6',
      title: 'Optimize & Grow',
      description: 'We continuously optimize your site, analyze performance, and help you grow your online presence.'
    }
  ]

  const timelines = [
    {
      package: 'Starter',
      timeline: '1-2 weeks'
    },
    {
      package: 'Growth',
      timeline: '2-4 weeks'
    },
    {
      package: 'Pro Max',
      timeline: '4-6 weeks'
    }
  ]

  const faqs = [
    {
      question: 'How long does a website take?',
      answer: 'Timeline depends on your package. Starter packages typically take 1-2 weeks, Growth packages 2-4 weeks, and Pro Max packages 4-6 weeks. We\'ll provide a detailed timeline during the discovery call.'
    },
    {
      question: 'Do I need to know anything technical?',
      answer: 'Not at all! We handle all the technical aspects. You just need to provide content, feedback, and approval. We\'ll guide you through everything step by step.'
    },
    {
      question: 'Can you work in my language?',
      answer: 'Yes! We can build websites in any language. Just let us know your preferred language during the discovery call, and we\'ll make sure everything is in your language.'
    },
    {
      question: 'What if I want to change things later?',
      answer: 'All packages include support for updates and changes. Growth and Pro Max packages include priority support for faster turnaround times on updates.'
    },
    {
      question: 'What happens after launch?',
      answer: 'We provide ongoing support based on your package. Starter includes email support, Growth includes priority support, and Pro Max includes white-glove service with bi-monthly reviews and quarterly strategy sessions.'
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
            From Chat to Launch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-large text-gray-600"
          >
            Our process, simplified
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section ref={sectionRef} className="section-padding bg-gray-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature">
                  <div className="w-12 h-12 bg-primary-black text-primary-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="heading-h3 mb-3">{step.title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Expectations */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-h2 text-center mb-10 md:mb-12 lg:mb-16"
          >
            Timeline Expectations
          </motion.h2>
          <div className="space-y-4">
            {timelines.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature">
                  <div className="flex justify-between items-center">
                    <h3 className="heading-h3">{item.package}</h3>
                    <span className="text-body-large font-bold text-primary-black">{item.timeline}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-light">
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

      {/* CTA */}
      <section className="section-padding bg-primary-black text-primary-white">
        <div className="container-custom text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-h2 mb-6 text-primary-white"
          >
            Ready? Let's Chat
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-large mb-8 text-primary-white/80"
          >
            Book your free discovery call and let's discuss your project
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/contact" className="inline-block min-h-[44px] min-w-[44px]">
              <Button variant="secondary" size="lg" className="bg-primary-white text-primary-black border-primary-white hover:bg-gray-light">
                Book a Free Discovery Call
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
