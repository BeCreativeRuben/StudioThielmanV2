import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Submission {
  id: string
  business_name: string
  name: string
  email: string
  phone: string
  package: string
  status: string
  submitted_at: string
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    package: '',
    search: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchSubmissions()
  }, [navigate])

  useEffect(() => {
    let filtered = submissions

    if (filters.status) {
      filtered = filtered.filter(s => s.status === filters.status)
    }
    if (filters.package) {
      filtered = filtered.filter(s => s.package === filters.package)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower) ||
        s.business_name.toLowerCase().includes(searchLower)
      )
    }

    setFilteredSubmissions(filtered)
  }, [submissions, filters])

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/submissions`, {
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
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const stats = {
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    scheduled: submissions.filter(s => s.status === 'scheduled').length,
    inProgress: submissions.filter(s => s.status === 'in-progress').length,
    completed: submissions.filter(s => s.status === 'completed').length,
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

  return (
    <div className="min-h-screen bg-accent">
      {/* Header */}
      <header className="bg-secondary border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-h2">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card variant="feature">
            <div className="text-2xl font-semibold text-primary mb-1">{stats.new}</div>
            <div className="text-body-sm text-text-secondary">New</div>
          </Card>
          <Card variant="feature">
            <div className="text-2xl font-semibold text-primary mb-1">{stats.contacted}</div>
            <div className="text-body-sm text-text-secondary">Contacted</div>
          </Card>
          <Card variant="feature">
            <div className="text-2xl font-semibold text-primary mb-1">{stats.scheduled}</div>
            <div className="text-body-sm text-text-secondary">Scheduled</div>
          </Card>
          <Card variant="feature">
            <div className="text-2xl font-semibold text-primary mb-1">{stats.inProgress}</div>
            <div className="text-body-sm text-text-secondary">In Progress</div>
          </Card>
          <Card variant="feature">
            <div className="text-2xl font-semibold text-primary mb-1">{stats.completed}</div>
            <div className="text-body-sm text-text-secondary">Completed</div>
          </Card>
        </div>

        {/* Filters */}
        <Card variant="feature" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by name, email, or business..."
            />
            <Select
              label="Status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'new', label: 'New' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'rejected', label: 'Rejected' }
              ]}
            />
            <Select
              label="Package"
              value={filters.package}
              onChange={(e) => setFilters({ ...filters, package: e.target.value })}
              options={[
                { value: '', label: 'All Packages' },
                { value: 'starter', label: 'Starter' },
                { value: 'growth', label: 'Growth' },
                { value: 'pro-max', label: 'Pro Max' }
              ]}
            />
          </div>
        </Card>

        {/* Submissions Table */}
        <Card variant="feature">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Client</th>
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Package</th>
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-body-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-secondary">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-border hover:bg-accent">
                      <td className="py-3 px-4">
                        <div className="font-semibold">{submission.name}</div>
                        <div className="text-body-sm text-text-secondary">{submission.business_name}</div>
                      </td>
                      <td className="py-3 px-4 text-body-sm">{submission.email}</td>
                      <td className="py-3 px-4">
                        <span className="text-body-sm capitalize">{submission.package}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-body-sm px-2 py-1 rounded ${
                          submission.status === 'new' ? 'bg-primary text-secondary' :
                          submission.status === 'completed' ? 'bg-success text-secondary' :
                          'bg-accent text-text-primary'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-body-sm text-text-secondary">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/admin/submissions/${submission.id}`}
                          className="text-body-sm text-primary hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
