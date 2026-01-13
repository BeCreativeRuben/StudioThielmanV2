import express from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getFilesBySubmissionId, createFile, deleteFile } from '../db/files.js'
import { authenticateToken } from './auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = join(__dirname, '../uploads')
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/
    const extname = allowedTypes.test(join(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'))
    }
  }
})

// GET /api/files/submission/:submissionId - Get all files for a submission
router.get('/submission/:submissionId', authenticateToken, async (req, res) => {
  try {
    const files = await getFilesBySubmissionId(req.params.submissionId)
    res.json(files)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/files - Upload file
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    
    const fileData = {
      id: uuidv4(),
      submission_id: req.body.submissionId || null,
      filename: req.file.filename,
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      file_type: req.body.fileType || 'brand-image',
      uploaded_at: new Date().toISOString()
    }
    
    const file = await createFile(fileData)
    res.status(201).json(file)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE /api/files/:id - Delete file
router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteFile(req.params.id)
    if (!success) {
      return res.status(404).json({ error: 'File not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
