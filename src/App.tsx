import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Packages = lazy(() => import('./pages/Packages'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminSubmissionDetail = lazy(() => import('./pages/admin/AdminSubmissionDetail'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-black border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/submissions/:id" element={<AdminSubmissionDetail />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
