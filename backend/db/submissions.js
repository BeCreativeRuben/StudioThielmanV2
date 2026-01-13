// Simple JSON-based database for submissions
// In production, replace with actual database (SQLite, PostgreSQL, etc.)
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DB_PATH = join(__dirname, '../data/submissions.json')

// Initialize database file if it doesn't exist
async function initDB() {
  try {
    await readFile(DB_PATH)
  } catch {
    await writeFile(DB_PATH, JSON.stringify([]), 'utf-8')
  }
}

// Read all submissions
async function readSubmissions() {
  await initDB()
  const data = await readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

// Write submissions
async function writeSubmissions(submissions) {
  await writeFile(DB_PATH, JSON.stringify(submissions, null, 2), 'utf-8')
}

export async function getSubmissions(filters = {}) {
  let submissions = await readSubmissions()
  
  // Apply filters
  if (filters.status) {
    submissions = submissions.filter(s => s.status === filters.status)
  }
  if (filters.package) {
    submissions = submissions.filter(s => s.package === filters.package)
  }
  if (filters.startDate) {
    submissions = submissions.filter(s => new Date(s.submitted_at) >= new Date(filters.startDate))
  }
  if (filters.endDate) {
    submissions = submissions.filter(s => new Date(s.submitted_at) <= new Date(filters.endDate))
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    submissions = submissions.filter(s => 
      s.name.toLowerCase().includes(searchLower) ||
      s.email.toLowerCase().includes(searchLower) ||
      s.business_name.toLowerCase().includes(searchLower)
    )
  }
  
  return submissions.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
}

export async function getSubmissionById(id) {
  const submissions = await readSubmissions()
  return submissions.find(s => s.id === id)
}

export async function createSubmission(submissionData) {
  const submissions = await readSubmissions()
  submissions.push(submissionData)
  await writeSubmissions(submissions)
  return submissionData
}

export async function updateSubmission(id, updates) {
  const submissions = await readSubmissions()
  const index = submissions.findIndex(s => s.id === id)
  if (index === -1) return null
  
  submissions[index] = { ...submissions[index], ...updates }
  await writeSubmissions(submissions)
  return submissions[index]
}

export async function deleteSubmission(id) {
  const submissions = await readSubmissions()
  const filtered = submissions.filter(s => s.id !== id)
  if (filtered.length === submissions.length) return false
  
  await writeSubmissions(filtered)
  return true
}
