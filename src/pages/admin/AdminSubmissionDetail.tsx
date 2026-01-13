import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Submission {
  id: string
  business_name: string
  name: string
  email: string
  phone: string
  package: string
  status: string
  business_description: string
  industry: string
  biggest_challenge: string
  timeline: string
  preferred_contact: string
  best_time: string
  additional_notes: string
  notes: string
  submitted_at: string
}

export default function AdminSubmissionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchSubmission()
    fetchFiles()
  }, [id, navigate])

  const fetchSubmission = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
        return
      }

      const data = await response.json()
      setSubmission(data)
      setNotes(data.notes || '')
    } catch (error) {
      console.error('Error fetching submission:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/files/submission/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setFiles(data)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        const updated = await response.json()
        setSubmission(updated)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleSaveNotes = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes })
      })

      if (response.ok) {
        const updated = await response.json()
        setSubmission(updated)
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent p-8">
        <div className="container-custom">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-accent p-8">
        <div className="container-custom">
          <p>Submission not found</p>
          <Link to="/admin" className="text-primary hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-accent">
      <header className="bg-secondary border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <div>
            <Link to="/admin" className="text-primary hover:underline mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-h2">Submission Details</h1>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card variant="feature">
              <h2 className="text-h3 mb-6">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Business Name</div>
                  <div className="text-body font-semibold">{submission.business_name}</div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Contact Name</div>
                  <div className="text-body font-semibold">{submission.name}</div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Email</div>
                  <div className="text-body">
                    <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                      {submission.email}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Phone</div>
                  <div className="text-body">
                    <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                      {submission.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Package</div>
                  <div className="text-body capitalize">{submission.package}</div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Timeline</div>
                  <div className="text-body">{submission.timeline}</div>
                </div>
              </div>
            </Card>

            {/* Business Overview */}
            <Card variant="feature">
              <h2 className="text-h3 mb-6">Business Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Description</div>
                  <div className="text-body">{submission.business_description}</div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Industry</div>
                  <div className="text-body">{submission.industry}</div>
                </div>
                <div>
                  <div className="text-body-sm text-text-secondary mb-1">Biggest Challenge</div>
                  <div className="text-body">{submission.biggest_challenge}</div>
                </div>
              </div>
            </Card>

            {/* Files */}
            {files.length > 0 && (
              <Card variant="feature">
                <h2 className="text-h3 mb-6">Uploaded Files</h2>
                <div className="grid grid-cols-2 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="border border-border rounded-lg p-4">
                      <div className="text-body-sm font-semibold mb-2">{file.original_name}</div>
                      <div className="text-body-sm text-text-secondary mb-2">
                        {(file.size / 1024).toFixed(2)} KB
                      </div>
                      <a
                        href={`${API_BASE_URL.replace('/api', '')}${file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-primary hover:underline"
                      >
                        Download →
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <Card variant="feature">
              <h2 className="text-h3 mb-4">Status</h2>
              <Select
                value={submission.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                options={[
                  { value: 'new', label: 'New' },
                  { value: 'contacted', label: 'Contacted' },
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'rejected', label: 'Rejected' }
                ]}
              />
            </Card>

            {/* Internal Notes */}
            <Card variant="feature">
              <h2 className="text-h3 mb-4">Internal Notes</h2>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mb-4"
              />
              <Button
                variant="primary"
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? 'Saving...' : 'Save Notes'}
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card variant="feature">
              <h2 className="text-h3 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <a
                  href={`mailto:${submission.email}`}
                  className="block w-full text-center px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-accent transition-colors"
                >
                  Send Email
                </a>
                <a
                  href={`tel:${submission.phone}`}
                  className="block w-full text-center px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-accent transition-colors"
                >
                  Call Client
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
