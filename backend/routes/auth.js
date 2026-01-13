import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByUsername, createUser } from '../db/users.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }
    
    const user = await getUserByUsername(username)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    // Update last login
    user.last_login = new Date().toISOString()
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/auth/register - Create admin user (for initial setup)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }
    
    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }
    
    const password_hash = await bcrypt.hash(password, 10)
    const user = await createUser({
      username,
      email,
      password_hash
    })
    
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

export default router
