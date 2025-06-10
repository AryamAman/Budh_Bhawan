import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Bell, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  submittedAt: string;
  resolvedAt?: string;
}

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      title: 'Water Supply Issue',
      description: 'No water supply in room A-101 since morning',
      category: 'Maintenance',
      status: 'in-progress',
      priority: 'high',
      submittedAt: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'WiFi Connection Problem',
      description: 'Intermittent WiFi connection in common area',
      category: 'Technical',
      status: 'resolved',
      priority: 'medium',
      submittedAt: '2024-03-14T15:20:00Z',
      resolvedAt: '2024-03-15T09:00:00Z'
    }
  ]);

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Maintenance',
    priority: 'medium' as const
  });

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const complaint: Complaint = {
      id: Date.now().toString(),
      ...newComplaint,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setComplaints([complaint, ...complaints]);
    setNewComplaint({ title: '', description: '', category: 'Maintenance', priority: 'medium' });
    setShowComplaintForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="font-serif text-xl font-semibold text-bits-blue">BITS Budh Bhawan</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-bits-blue rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">Room {user?.roomNumber}</p>
                  <p className="text-xs text-gray-500">{user?.bitsId}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'dashboard' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('complaints')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'complaints' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>My Complaints</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'feedback' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Feedback</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">1</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">1</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Resolved</p>
                        <p className="text-2xl font-bold text-gray-900">1</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowComplaintForm(true)}
                      className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-bits-blue hover:bg-bits-light transition-colors"
                    >
                      <Plus className="w-6 h-6 text-bits-blue" />
                      <span className="font-medium text-gray-700">Submit New Complaint</span>
                    </button>
                    
                    <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-bits-blue hover:bg-bits-light transition-colors">
                      <MessageSquare className="w-6 h-6 text-bits-blue" />
                      <span className="font-medium text-gray-700">Anonymous Feedback</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {complaints.slice(0, 3).map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'resolved' ? 'bg-green-500' : 
                            complaint.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{complaint.title}</p>
                            <p className="text-sm text-gray-600">{complaint.category}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Complaints</h2>
                  <button
                    onClick={() => setShowComplaintForm(true)}
                    className="bg-bits-blue text-white px-4 py-2 rounded-lg hover:bg-bits-navy transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Complaint</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                          <p className="text-gray-600 mt-1">{complaint.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace('-', ' ')}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>Category: {complaint.category}</span>
                          <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString()}</span>
                          {complaint.resolvedAt && (
                            <span>Resolved: {new Date(complaint.resolvedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                        <button className="flex items-center space-x-1 text-bits-blue hover:text-bits-navy">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback & Suggestions</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue">
                      <option>General Feedback</option>
                      <option>Suggestion</option>
                      <option>Service Quality</option>
                      <option>Facility Improvement</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                      placeholder="Share your thoughts and suggestions..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-bits-blue focus:ring-bits-blue border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">Submit anonymously</label>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-bits-blue text-white px-6 py-2 rounded-lg hover:bg-bits-navy transition-colors"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BITS ID
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.bitsId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Number
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.roomNumber}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-bits-blue text-white px-6 py-2 rounded-lg hover:bg-bits-navy transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complaint Form Modal */}
      {showComplaintForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Submit New Complaint</h3>
                <button
                  onClick={() => setShowComplaintForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complaint Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={newComplaint.category}
                    onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                  >
                    <option value="Maintenance">Maintenance</option>
                    <option value="Technical">Technical</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Security">Security</option>
                    <option value="Mess">Mess</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newComplaint.priority}
                    onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                    placeholder="Provide detailed information about the issue..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowComplaintForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-bits-blue text-white px-6 py-2 rounded-lg hover:bg-bits-navy transition-colors"
                  >
                    Submit Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}