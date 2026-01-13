const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export async function submitForm(formData: any) {
  const response = await fetch(`${API_BASE_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit form')
  }
  
  return response.json()
}

export async function uploadFile(file: File, submissionId: string, fileType: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('submissionId', submissionId)
  formData.append('fileType', fileType)
  
  const response = await fetch(`${API_BASE_URL}/files`, {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to upload file')
  }
  
  return response.json()
}
