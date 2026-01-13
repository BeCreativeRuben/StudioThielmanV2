// TypeScript interfaces and types

export interface Package {
  id: 'starter' | 'growth' | 'pro-max'
  name: string
  monthlyPrice: number
  startupFee: number
  features: string[]
  description: string
  idealFor: string[]
  examples: string[]
}

export interface PortfolioExample {
  id: string
  title: string
  description: string
  package: 'starter' | 'growth' | 'pro-max'
  thumbnail: string
  url: string
  features: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  rating: number
  company?: string
}

export interface FormSubmission {
  id?: string
  // Section 1: Basic Information
  businessName: string
  name: string
  email: string
  phone: string
  country?: string
  language?: string
  package: 'starter' | 'growth' | 'pro-max'
  
  // Section 2: Business Overview
  businessDescription: string
  industry: string
  hasExistingWebsite: boolean
  existingWebsiteUrl?: string
  goals: string[]
  idealCustomer: string
  
  // Section 3: Current Situation
  hasBranding: boolean
  brandingDetails?: string
  biggestChallenge: string
  timeline: string
  
  // Section 4: Assets & Media
  logo?: File
  brandImages?: File[]
  brandColors?: string
  references?: string
  existingContent?: File
  
  // Section 5: Next Steps
  preferredContact: 'email' | 'phone' | 'video-call'
  bestTime: string
  timezone?: string
  additionalNotes?: string
  
  // Section 6: Terms
  understandsPricing: boolean
  readyToDiscuss: boolean
  acceptsPrivacyPolicy: boolean
  wantsUpdates?: boolean
  
  // Metadata
  status?: 'new' | 'contacted' | 'scheduled' | 'in-progress' | 'completed' | 'rejected'
  submittedAt?: Date
  notes?: string
}

export interface FileUpload {
  id: string
  submissionId: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: Date
}
