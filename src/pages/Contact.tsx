import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Select from '../components/Select'
import Button from '../components/Button'
import Card from '../components/Card'
import { submitForm, uploadFile } from '../utils/api'

interface FormData {
  // Section 1: Basic Information
  businessName: string
  name: string
  email: string
  phone: string
  country: string
  language: string
  package: 'starter' | 'growth' | 'pro-max' | ''
  
  // Section 2: Business Overview
  businessDescription: string
  industry: string
  hasExistingWebsite: boolean
  existingWebsiteUrl: string
  goals: string[]
  idealCustomer: string
  
  // Section 3: Current Situation
  hasBranding: boolean
  brandingDetails: string
  biggestChallenge: string
  timeline: string
  
  // Section 4: Assets & Media
  logo: File | null
  brandImages: File[]
  brandColors: string
  references: string
  existingContent: File | null
  
  // Section 5: Next Steps
  preferredContact: 'email' | 'phone' | 'video-call' | ''
  bestTime: string
  timezone: string
  additionalNotes: string
  
  // Section 6: Terms
  understandsPricing: boolean
  readyToDiscuss: boolean
  acceptsPrivacyPolicy: boolean
  wantsUpdates: boolean
}

export default function Contact() {
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    language: '',
    package: '',
    businessDescription: '',
    industry: '',
    hasExistingWebsite: false,
    existingWebsiteUrl: '',
    goals: [],
    idealCustomer: '',
    hasBranding: false,
    brandingDetails: '',
    biggestChallenge: '',
    timeline: '',
    logo: null,
    brandImages: [],
    brandColors: '',
    references: '',
    existingContent: null,
    preferredContact: '',
    bestTime: '',
    timezone: '',
    additionalNotes: '',
    understandsPricing: false,
    readyToDiscuss: false,
    acceptsPrivacyPolicy: false,
    wantsUpdates: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSections = 6

  // Persist form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData && !isSubmitted) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error('Failed to load saved form data', e)
      }
    }
  }, [isSubmitted])

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem('contactFormData', JSON.stringify(formData))
    } else {
      localStorage.removeItem('contactFormData')
    }
  }, [formData, isSubmitted])

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (section === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
      if (!formData.name.trim()) newErrors.name = 'Your name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.package) newErrors.package = 'Please select a package'
    }
    
    if (section === 2) {
      if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required'
      if (!formData.industry) newErrors.industry = 'Industry is required'
      if (!formData.idealCustomer.trim()) newErrors.idealCustomer = 'Ideal customer description is required'
    }
    
    if (section === 3) {
      if (!formData.biggestChallenge.trim()) newErrors.biggestChallenge = 'Please describe your biggest challenge'
      if (!formData.timeline) newErrors.timeline = 'Please select a timeline'
    }
    
    if (section === 5) {
      if (!formData.preferredContact) newErrors.preferredContact = 'Please select a contact method'
      if (!formData.bestTime.trim()) newErrors.bestTime = 'Please indicate best time to reach you'
    }
    
    if (section === 6) {
      if (!formData.understandsPricing) newErrors.understandsPricing = 'Please confirm you understand the pricing'
      if (!formData.readyToDiscuss) newErrors.readyToDiscuss = 'Please confirm you\'re ready to discuss'
      if (!formData.acceptsPrivacyPolicy) newErrors.acceptsPrivacyPolicy = 'Please accept the Privacy Policy'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(Math.min(currentSection + 1, totalSections))
    }
  }

  const handlePrevious = () => {
    setCurrentSection(Math.max(currentSection - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateSection(6)) return
    
    setIsSubmitting(true)
    try {
      // Prepare submission data
      const submissionData = {
        business_name: formData.businessName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        language: formData.language,
        package: formData.package,
        business_description: formData.businessDescription,
        industry: formData.industry,
        has_existing_website: formData.hasExistingWebsite,
        existing_website_url: formData.existingWebsiteUrl,
        goals: formData.goals,
        ideal_customer: formData.idealCustomer,
        has_branding: formData.hasBranding,
        branding_details: formData.brandingDetails,
        biggest_challenge: formData.biggestChallenge,
        timeline: formData.timeline,
        brand_colors: formData.brandColors,
        references: formData.references,
        preferred_contact: formData.preferredContact,
        best_time: formData.bestTime,
        timezone: formData.timezone,
        additional_notes: formData.additionalNotes,
        understands_pricing: formData.understandsPricing,
        ready_to_discuss: formData.readyToDiscuss,
        accepts_privacy_policy: formData.acceptsPrivacyPolicy,
        wants_updates: formData.wantsUpdates,
      }
      
      // Submit form
      const submission = await submitForm(submissionData)
      
      // Upload files if any
      if (formData.logo) {
        await uploadFile(formData.logo, submission.id, 'logo')
      }
      if (formData.brandImages.length > 0) {
        for (const image of formData.brandImages) {
          await uploadFile(image, submission.id, 'brand-image')
        }
      }
      if (formData.existingContent) {
        await uploadFile(formData.existingContent, submission.id, 'existing-content')
      }
      
      setIsSubmitted(true)
      localStorage.removeItem('contactFormData')
    } catch (error: any) {
      console.error('Form submission error:', error)
      setErrors({ submit: error.message || 'Failed to submit form. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentSection / totalSections) * 100

  if (isSubmitted) {
    return (
      <div className="w-full pt-16 md:pt-20">
        <section className="section-padding bg-primary-white">
          <div className="container-custom max-w-2xl">
            <Card variant="feature" className="text-center">
              <div className="text-6xl text-success mb-6">✓</div>
              <h2 className="heading-h2 mb-4">Success!</h2>
              <p className="text-body-large text-gray-700 mb-6 leading-relaxed">
                We've received your information. Check your email to book a call.
              </p>
              <p className="text-base text-gray-600 mb-8">
                You can expect to hear from us within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={() => window.location.href = '/'}>
                  Back to Home
                </Button>
                <Button variant="primary" onClick={() => window.location.href = '/packages'}>
                  View Packages
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    )
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
            Let's Get Started
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-large text-gray-600"
          >
            Tell us about your project
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom max-w-2xl">
          <Card variant="feature">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Section {currentSection} of {totalSections}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Form progress: ${Math.round(progress)}%`}>
                <motion.div
                  className="bg-primary-black h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Section 1: Basic Information */}
            {currentSection === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Basic Information</h2>
                <Input
                  label="Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  error={errors.businessName}
                  required
                />
                <Input
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                  required
                />
                <Select
                  label="Which package interests you?"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value as any })}
                  error={errors.package}
                  options={[
                    { value: '', label: 'Select a package' },
                    { value: 'starter', label: 'Starter - €25/month' },
                    { value: 'growth', label: 'Growth - €40/month + €250' },
                    { value: 'pro-max', label: 'Pro Max - €80/month + €500' }
                  ]}
                  required
                />
              </motion.div>
            )}

            {/* Section 2: Business Overview */}
            {currentSection === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Business Overview</h2>
                <Textarea
                  label="Tell us about your business"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                  error={errors.businessDescription}
                  required
                />
                <Select
                  label="Industry/Category"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  error={errors.industry}
                  options={[
                    { value: '', label: 'Select industry' },
                    { value: 'retail', label: 'Retail' },
                    { value: 'services', label: 'Services' },
                    { value: 'consulting', label: 'Consulting' },
                    { value: 'technology', label: 'Technology' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'education', label: 'Education' },
                    { value: 'other', label: 'Other' }
                  ]}
                  required
                />
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
                    Do you have an existing website?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasExistingWebsite: true })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        formData.hasExistingWebsite
                          ? 'border-primary-black bg-primary-black text-primary-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-black'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasExistingWebsite: false, existingWebsiteUrl: '' })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        !formData.hasExistingWebsite
                          ? 'border-primary-black bg-primary-black text-primary-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-black'
                      }`}
                    >
                      No
                    </button>
                  </div>
                  {formData.hasExistingWebsite && (
                    <Input
                      label="Website URL"
                      value={formData.existingWebsiteUrl}
                      onChange={(e) => setFormData({ ...formData, existingWebsiteUrl: e.target.value })}
                      className="mt-4"
                    />
                  )}
                </div>
                <Textarea
                  label="Who is your ideal customer?"
                  value={formData.idealCustomer}
                  onChange={(e) => setFormData({ ...formData, idealCustomer: e.target.value })}
                  error={errors.idealCustomer}
                  required
                />
              </motion.div>
            )}

            {/* Section 3: Current Situation */}
            {currentSection === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Current Situation</h2>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
                    Do you have existing branding?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasBranding: true })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        formData.hasBranding
                          ? 'border-primary-black bg-primary-black text-primary-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-black'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasBranding: false, brandingDetails: '' })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        !formData.hasBranding
                          ? 'border-primary-black bg-primary-black text-primary-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-black'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                <Textarea
                  label="What's your biggest challenge right now?"
                  value={formData.biggestChallenge}
                  onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                  error={errors.biggestChallenge}
                  required
                />
                <Select
                  label="Timeline: When do you need this ready?"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  error={errors.timeline}
                  options={[
                    { value: '', label: 'Select timeline' },
                    { value: 'asap', label: 'ASAP' },
                    { value: '2-4-weeks', label: '2-4 weeks' },
                    { value: '1-2-months', label: '1-2 months' },
                    { value: 'flexible', label: 'Flexible' }
                  ]}
                  required
                />
              </motion.div>
            )}

            {/* Section 4: Assets & Media */}
            {currentSection === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Assets & Media</h2>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
                    Logo Upload (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
                    Brand Images/Inspiration (Optional, max 5 files)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFormData({ ...formData, brandImages: Array.from(e.target.files || []) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded bg-white"
                  />
                </div>
                <Input
                  label="Brand Colors (e.g., #2196F3, #FF6B35)"
                  value={formData.brandColors}
                  onChange={(e) => setFormData({ ...formData, brandColors: e.target.value })}
                  placeholder="#000000, #FFFFFF"
                />
                <Textarea
                  label="References/Inspiration Links (Optional)"
                  value={formData.references}
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                />
              </motion.div>
            )}

            {/* Section 5: Next Steps */}
            {currentSection === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Next Steps</h2>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-text-primary mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="space-y-2">
                    {(['email', 'phone', 'video-call'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={() => setFormData({ ...formData, preferredContact: method })}
                          className="w-4 h-4"
                        />
                        <span className="text-base">
                          {method === 'email' ? 'Email' : method === 'phone' ? 'Phone' : 'Video Call'}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredContact && (
                    <p className="mt-1 text-sm text-error">{errors.preferredContact}</p>
                  )}
                </div>
                <Input
                  label="Best time to reach you"
                  value={formData.bestTime}
                  onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                  error={errors.bestTime}
                  required
                />
                <Textarea
                  label="Additional notes or questions? (Optional)"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                />
              </motion.div>
            )}

            {/* Section 6: Terms & Conditions */}
            {currentSection === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="heading-h3 mb-6">Terms & Conditions</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.understandsPricing}
                      onChange={(e) => setFormData({ ...formData, understandsPricing: e.target.checked })}
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-base text-text-primary">
                      I understand the pricing and package inclusions
                    </span>
                  </label>
                  {errors.understandsPricing && (
                    <p className="text-sm text-error ml-6">{errors.understandsPricing}</p>
                  )}
                  
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.readyToDiscuss}
                      onChange={(e) => setFormData({ ...formData, readyToDiscuss: e.target.checked })}
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-base text-text-primary">
                      I'm ready to discuss my project
                    </span>
                  </label>
                  {errors.readyToDiscuss && (
                    <p className="text-sm text-error ml-6">{errors.readyToDiscuss}</p>
                  )}
                  
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptsPrivacyPolicy}
                      onChange={(e) => setFormData({ ...formData, acceptsPrivacyPolicy: e.target.checked })}
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-base text-text-primary">
                      I accept the Privacy Policy
                    </span>
                  </label>
                  {errors.acceptsPrivacyPolicy && (
                    <p className="text-sm text-error ml-6">{errors.acceptsPrivacyPolicy}</p>
                  )}
                  
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantsUpdates}
                      onChange={(e) => setFormData({ ...formData, wantsUpdates: e.target.checked })}
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-base text-text-primary">
                      I'd like to receive updates about your services (optional)
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentSection > 1 ? (
                <Button variant="secondary" onClick={handlePrevious}>
                  ← Previous
                </Button>
              ) : (
                <div></div>
              )}
              {currentSection < totalSections ? (
                <Button variant="primary" onClick={handleNext}>
                  Continue →
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </Button>
              )}
            </div>

            {errors.submit && (
              <p className="mt-4 text-sm text-error text-center">{errors.submit}</p>
            )}
          </Card>
        </div>
      </section>
    </div>
  )
}
