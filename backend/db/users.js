import { readFile, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DB_PATH = join(__dirname, '../data/users.json')

async function initDB() {
  try {
    await readFile(DB_PATH)
  } catch {
    await writeFile(DB_PATH, JSON.stringify([]), 'utf-8')
  }
}

async function readUsers() {
  await initDB()
  const data = await readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeUsers(users) {
  await writeFile(DB_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

export async function getUserByUsername(username) {
  const users = await readUsers()
  return users.find(u => u.username === username)
}

export async function getUserById(id) {
  const users = await readUsers()
  return users.find(u => u.id === id)
}

export async function createUser(userData) {
  const users = await readUsers()
  const user = {
    id: uuidv4(),
    ...userData,
    created_at: new Date().toISOString(),
    last_login: null
  }
  users.push(user)
  await writeUsers(users)
  return user
}
