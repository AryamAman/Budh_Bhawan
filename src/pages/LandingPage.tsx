import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, Bell, BarChart3, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bits-light via-white to-blue-50">
      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-bits-blue" />
              <div>
                <h1 className="font-serif text-xl font-semibold text-bits-blue">BITS Pilani</h1>
                <p className="text-sm text-gray-600 -mt-1">Budh Bhavan</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-bits-blue transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-bits-blue transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-bits-blue transition-colors">Contact</a>
            </nav>
            <Link 
              to="/login" 
              className="bg-bits-blue text-white px-6 py-2 rounded-lg hover:bg-bits-navy transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Buddha Background - Subtle */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-buddha-gold/20 to-buddha-bronze/20 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23D4AF37%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              BITS <span className="text-bits-blue">Budh Bhawan</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive Hostel Management System
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Streamline your hostel experience with our modern platform designed for 
              seamless communication, efficient complaint management, and enhanced student life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-bits-blue text-white px-8 py-4 rounded-xl hover:bg-bits-navy transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Student Portal
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-bits-blue border-2 border-bits-blue px-8 py-4 rounded-xl hover:bg-bits-blue hover:text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Modern Hostel Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a new era of hostel management with cutting-edge features 
              designed for both students and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-bits-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                BITS email integration with JWT tokens ensuring secure access and data protection.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Complaints</h3>
              <p className="text-gray-600">
                Streamlined complaint submission with real-time tracking and resolution updates.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive insights and analytics for administrators to monitor hostel operations.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anonymous Reporting</h3>
              <p className="text-gray-600">
                Safe and secure anonymous reporting system for sensitive issues and feedback.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Feedback System</h3>
              <p className="text-gray-600">
                Comprehensive feedback collection and analysis for continuous improvement.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Room Management</h3>
              <p className="text-gray-600">
                Efficient room allocation and management system with maintenance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-8 w-8 text-bits-gold" />
                <div>
                  <h3 className="font-serif text-xl font-semibold">BITS Budh Bhawan</h3>
                  <p className="text-gray-400 text-sm">Hostel Management System</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering student life through modern technology and efficient management systems.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admin Access</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>BITS Pilani Campus</li>
                <li>Pilani, Rajasthan</li>
                <li>333031</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BITS Pilani. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}