import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DB_PATH = join(__dirname, '../data/files.json')

async function initDB() {
  try {
    await readFile(DB_PATH)
  } catch {
    await writeFile(DB_PATH, JSON.stringify([]), 'utf-8')
  }
}

async function readFiles() {
  await initDB()
  const data = await readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeFiles(files) {
  await writeFile(DB_PATH, JSON.stringify(files, null, 2), 'utf-8')
}

export async function getFilesBySubmissionId(submissionId) {
  const files = await readFiles()
  return files.filter(f => f.submission_id === submissionId)
}

export async function getFileById(id) {
  const files = await readFiles()
  return files.find(f => f.id === id)
}

export async function createFile(fileData) {
  const files = await readFiles()
  files.push(fileData)
  await writeFiles(files)
  return fileData
}

export async function deleteFile(id) {
  const files = await readFiles()
  const filtered = files.filter(f => f.id !== id)
  if (filtered.length === files.length) return false
  
  await writeFiles(filtered)
  return true
}
