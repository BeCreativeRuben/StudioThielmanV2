import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { getSubmissions, getSubmissionById, createSubmission, updateSubmission, deleteSubmission } from '../db/submissions.js'
import { sendConfirmationEmail, sendAdminNotification, addToMailchimp } from '../services/email.js'
import { generateCalendarLink } from '../services/calendar.js'
import { authenticateToken } from './auth.js'

const router = express.Router()

// GET /api/submissions - List all submissions with filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, package: pkg, startDate, endDate, search } = req.query
    const submissions = await getSubmissions({ status, package: pkg, startDate, endDate, search })
    res.json(submissions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/submissions/:id - Get submission by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const submission = await getSubmissionById(req.params.id)
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.json(submission)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/submissions - Create new submission
router.post('/', async (req, res) => {
  try {
    const submissionData = {
      id: uuidv4(),
      ...req.body,
      submitted_at: new Date().toISOString(),
      status: 'new'
    }
    const submission = await createSubmission(submissionData)
    
    // Generate calendar link
    const calendarLink = generateCalendarLink(submission)
    
    // Send emails asynchronously (don't block response)
    Promise.all([
      sendConfirmationEmail(submission, calendarLink).catch(err => console.error('Email error:', err)),
      sendAdminNotification(submission, `${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/submissions/${submission.id}`).catch(err => console.error('Admin email error:', err)),
      addToMailchimp(submission).catch(err => console.error('Mailchimp error:', err))
    ])
    
    res.status(201).json({
      ...submission,
      calendarLink
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// PUT /api/submissions/:id - Update submission
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const submission = await updateSubmission(req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString()
    })
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.json(submission)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE /api/submissions/:id - Delete submission
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const success = await deleteSubmission(req.params.id)
    if (!success) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
