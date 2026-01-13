// Calendar integration service
// Supports Calendly (fallback) and can be extended for Notion Calendar

export function generateCalendarLink(submission) {
  const calendarType = process.env.CALENDAR_TYPE || 'calendly'
  const baseUrl = process.env.CALENDAR_URL || 'https://calendly.com/your-calendar'
  
  if (calendarType === 'calendly') {
    // Calendly URL format
    const params = new URLSearchParams({
      name: submission.name,
      email: submission.email,
      a1: submission.business_name,
      a2: submission.package,
    })
    return `${baseUrl}?${params.toString()}`
  }
  
  // Default to base URL
  return baseUrl
}

export function getCalendarEmbedUrl() {
  const calendarType = process.env.CALENDAR_TYPE || 'calendly'
  const baseUrl = process.env.CALENDAR_URL || 'https://calendly.com/your-calendar'
  
  if (calendarType === 'calendly') {
    // Calendly embed format
    return `${baseUrl}/embed`
  }
  
  return baseUrl
}
