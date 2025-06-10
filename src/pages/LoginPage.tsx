// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate(userType === 'student' ? '/student-dashboard' : '/admin-dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bits-light via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Link to="/" className="inline-flex items-center text-bits-blue hover:text-bits-navy transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Building2 className="h-12 w-12 text-bits-blue" />
            <div>
              <h1 className="font-serif text-2xl font-semibold text-bits-blue">BITS Budh Bhawan</h1>
              <p className="text-gray-600 text-sm">Hostel Management System</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'student'
                ? 'bg-white text-bits-blue shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'admin'
                ? 'bg-white text-bits-blue shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Administrator
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Student:</strong> 2021A7PS0001P@pilani.bits-pilani.ac.in / student123</p>
            <p><strong>Admin:</strong> admin@pilani.bits-pilani.ac.in / admin123</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {userType === 'student' ? 'BITS Email Address' : 'Email Address'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-bits-blue focus:border-bits-blue sm:text-sm"
                placeholder={userType === 'student' ? 'your.bitsid@pilani.bits-pilani.ac.in' : 'admin@pilani.bits-pilani.ac.in'}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-bits-blue focus:border-bits-blue sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-bits-blue hover:bg-bits-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bits-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="#" className="font-medium text-bits-blue hover:text-bits-navy transition-colors">
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
