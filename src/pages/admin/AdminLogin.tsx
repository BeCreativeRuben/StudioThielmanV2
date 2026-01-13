import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card from '../../components/Card'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await response.json()
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.user))
      navigate('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-h2 mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-body-sm text-error">{error}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
