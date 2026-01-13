import nodemailer from 'nodemailer'
import mailchimpMarketing from '@mailchimp/mailchimp-marketing'

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Configure Mailchimp
if (process.env.MAILCHIMP_API_KEY) {
  mailchimpMarketing.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  })
}

// Send auto-confirmation email to client
export async function sendConfirmationEmail(submission, calendarLink) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Your Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2D2D2D;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000000;">Thank You, ${submission.name}!</h1>
        <p>We've received your information and we're excited to learn more about your project.</p>
        <p><strong>What happens next?</strong></p>
        <ol>
          <li>We'll review your submission and prepare for our discovery call</li>
          <li>Book a time that works for you using the link below</li>
          <li>During the call, we'll dive deep into your needs and answer any questions</li>
        </ol>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${calendarLink}" style="background-color: #000000; color: #FFFFFF; padding: 16px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
            Book Your Discovery Call
          </a>
        </div>
        <p>You can expect to hear from us within 24 hours if you have any questions before the call.</p>
        <p>Best regards,<br>The Studio Thielman Team</p>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: submission.email,
      subject: 'We got your info! Next step: book a call',
      html: emailHtml,
    })
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}

// Send notification email to admin
export async function sendAdminNotification(submission, filesLink) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Submission: ${submission.business_name}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2D2D2D;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000000;">New Submission Received</h1>
        <h2>${submission.business_name}</h2>
        <p><strong>Client:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Phone:</strong> ${submission.phone}</p>
        <p><strong>Package:</strong> ${submission.package}</p>
        <p><strong>Timeline:</strong> ${submission.timeline}</p>
        <div style="margin: 30px 0;">
          <a href="${filesLink}" style="background-color: #000000; color: #FFFFFF; padding: 16px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
            View Full Submission
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New submission from ${submission.name} - ${submission.package}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Error sending admin notification:', error)
    throw error
  }
}

// Add contact to Mailchimp list
export async function addToMailchimp(submission) {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID) {
    return
  }

  try {
    await mailchimpMarketing.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: submission.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: submission.name.split(' ')[0],
        LNAME: submission.name.split(' ').slice(1).join(' ') || '',
        PHONE: submission.phone,
        BUSINESS: submission.business_name,
      },
      tags: [submission.package],
    })
  } catch (error) {
    console.error('Error adding to Mailchimp:', error)
    // Don't throw - Mailchimp is optional
  }
}
