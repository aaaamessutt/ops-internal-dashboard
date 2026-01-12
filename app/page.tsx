import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">OpsPro</span>
            <span className="text-sm text-gray-500">Internal Dashboard</span>
          </div>
          <Link href="/dashboard">
            <Button>Open Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Internal Operations Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A lightweight back-office tool for service teams to manage jobs, customers, and staff.
            Track tasks, coordinate field operations, and keep your team in sync.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Open Dashboard
              </Button>
            </Link>
            <a href="#credentials">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                View Demo Login
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Everything you need to run operations smoothly
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Tracking</h3>
                <p className="text-sm text-gray-600">
                  Manage jobs and service tasks with priorities, assignments, and scheduling.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  👥
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
                <p className="text-sm text-gray-600">
                  Keep track of customer contacts, status, and service history all in one place.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  👤
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Coordination</h3>
                <p className="text-sm text-gray-600">
                  Organize your team with roles, assignments, and availability tracking.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  📈
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Reports</h3>
                <p className="text-sm text-gray-600">
                  Get insights on workload, completion rates, and team performance at a glance.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why teams choose OpsPro
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Quick to deploy</h3>
                  <p className="text-gray-600">
                    No complex setup or training required. Your team can start managing operations immediately.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Built for service teams</h3>
                  <p className="text-gray-600">
                    Designed specifically for field service operations, maintenance crews, and service businesses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Mobile responsive</h3>
                  <p className="text-gray-600">
                    Access your dashboard from any device. Manage operations from the office or in the field.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Stay organized</h3>
                  <p className="text-gray-600">
                    Track every task, customer interaction, and team activity with automatic logging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section id="credentials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardBody className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Try the Demo</h2>
              <p className="text-gray-600 mb-6">
                Experience the full functionality of OpsPro Dashboard with our interactive demo.
                Use the credentials below to log in and explore all features.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-lg font-mono font-semibold text-gray-900">admin@demo.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Password</p>
                    <p className="text-lg font-mono font-semibold text-gray-900">demo1234</p>
                  </div>
                </div>
              </div>

              <Link href="/dashboard/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Login Page
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>OpsPro Internal Dashboard - Demo Application</p>
            <p className="mt-2">Built with Next.js 16, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
