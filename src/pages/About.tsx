import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Card from '../components/Card'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function About() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const values = [
    {
      title: 'Professionalism',
      description: 'We are experts. Our work speaks. No compromises on quality.',
      icon: '🎯',
      color: 'bg-primary-black',
      gradient: 'from-gray-900 to-gray-800'
    },
    {
      title: 'Accessibility',
      description: 'Enterprise-grade solutions at startup prices.',
      icon: '💰',
      color: 'bg-success',
      gradient: 'from-green-600 to-green-500'
    },
    {
      title: 'Innovation',
      description: 'AI-powered solutions that give you a competitive edge.',
      icon: '⚡',
      color: 'bg-primary-black',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Partnership',
      description: 'We\'re invested in your success. Personal support included.',
      icon: '🤝',
      color: 'bg-primary-black',
      gradient: 'from-orange-500 to-pink-500'
    }
  ]

  const team = [
    {
      name: 'Ruben Thielman',
      role: 'Founder & Developer',
      bio: '22-year-old passionate developer building web solutions. Dedicated to creating exceptional digital experiences with clean code, innovative solutions, and user-centered design.',
      photo: '/images/ruben-thielman-about.webp'
    }
  ]

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Framer Motion',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Figma'
  ]

  return (
    <div className="w-full pt-16 md:pt-20">
      {/* Hero */}
      <section className="section-padding bg-primary-white text-center">
        <div className="container-custom max-w-3xl">
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="heading-h1 mb-6"
          >
            We're Here to Make Web Simple.
            <br />
            And Powerful.
          </motion.h1>
        </div>
      </section>

      {/* Founder Story */}
      <section ref={sectionRef} className="section-padding bg-gray-light">
        <div className="container-custom max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-xs mx-auto md:mx-0">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src="/images/ruben-thielman-about.webp"
                    alt="Ruben Thielman - Founder & Developer of Studio Thielman"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="heading-h2 mb-2">Ruben Thielman</h2>
                <p className="text-body-large text-gray-600 mb-6">
                  22 years old, passionate developer
                </p>
              </div>
              <div className="text-body-large text-gray-700 space-y-6 leading-relaxed">
                <p>
                  I'm a software and web developer dedicated to creating exceptional digital experiences. 
                  With a focus on clean code, innovative solutions, and user-centered design, I bring ideas 
                  to life through technology.
                </p>
                <p>
                  My work combines technical expertise with creative problem-solving to deliver projects 
                  that make an impact. Whether it's building responsive web applications, developing 
                  robust software solutions, or crafting intuitive user interfaces, I approach each project 
                  with attention to detail and a commitment to excellence.
                </p>
              </div>
              
              {/* Skills Section */}
              <div className="pt-6">
                <h3 className="heading-h3 mb-8">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                      whileHover={{ scale: 1.08, y: -4, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                      className="px-4 py-2.5 md:px-5 md:py-3 bg-white border-2 border-primary-black rounded-lg shadow-sm text-xs md:text-sm font-semibold uppercase tracking-wider cursor-default transition-colors hover:bg-primary-black hover:text-white"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">Meet the Team</h2>
            <p className="text-body-large text-gray-600">
              Young, passionate, dedicated to excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature" className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/ruben-thielman-about.webp"
                      alt={`${member.name} - ${member.role}`}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="heading-h3 mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">Our Values</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                className="group"
              >
                <Card variant="feature" className="h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Gradient Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="mb-6 relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
                      whileHover={prefersReducedMotion ? {} : { rotate: [0, -5, 5, -5, 0] }}
                      transition={prefersReducedMotion ? {} : { duration: 0.5 }}
                    >
                      {value.icon}
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow relative z-10">
                    <h3 className="heading-h3 mb-3 group-hover:text-primary-black transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="mt-6 pt-6 border-t border-gray-200 group-hover:border-primary-black transition-colors duration-300 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-primary-black transition-colors duration-300">
                      <span className="font-semibold uppercase tracking-wider">Learn More</span>
                      <motion.span
                        className="inline-block"
                        animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
