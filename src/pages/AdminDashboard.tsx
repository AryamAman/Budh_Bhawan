import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings,
  LogOut,
  Eye,
  MessageSquare,
  TrendingUp,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  studentName: string;
  roomNumber: string;
  submittedAt: string;
  resolvedAt?: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Mock data for demonstration
  const complaints: Complaint[] = [
    {
      id: '1',
      title: 'Water Supply Issue',
      description: 'No water supply in room A-101 since morning',
      category: 'Maintenance',
      status: 'in-progress',
      priority: 'high',
      studentName: 'Arjun Sharma',
      roomNumber: 'A-101',
      submittedAt: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'WiFi Connection Problem',
      description: 'Intermittent WiFi connection in common area',
      category: 'Technical',
      status: 'resolved',
      priority: 'medium',
      studentName: 'Priya Singh',
      roomNumber: 'B-205',
      submittedAt: '2024-03-14T15:20:00Z',
      resolvedAt: '2024-03-15T09:00:00Z'
    },
    {
      id: '3',
      title: 'Mess Food Quality',
      description: 'Poor quality food served in dinner yesterday',
      category: 'Mess',
      status: 'pending',
      priority: 'medium',
      studentName: 'Rajesh Kumar',
      roomNumber: 'C-302',
      submittedAt: '2024-03-15T20:15:00Z'
    }
  ];

  const monthlyData = [
    { month: 'Jan', complaints: 45, resolved: 42 },
    { month: 'Feb', complaints: 52, resolved: 48 },
    { month: 'Mar', complaints: 38, resolved: 35 }
  ];

  const categoryData = [
    { name: 'Maintenance', value: 35, color: '#3B82F6' },
    { name: 'Technical', value: 25, color: '#10B981' },
    { name: 'Cleanliness', value: 20, color: '#F59E0B' },
    { name: 'Mess', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' }
  ];

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

  const updateComplaintStatus = (id: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    // In a real app, this would update the backend
    console.log(`Updating complaint ${id} to status: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="font-serif text-xl font-semibold text-bits-blue">BITS Budh Bhawan - Admin</h1>
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
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">Administrator</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'overview' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('complaints')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'complaints' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>Complaints</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {complaints.filter(c => c.status === 'pending').length}
                  </span>
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'analytics' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Analytics</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'users' ? 'bg-bits-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                        <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {complaints.filter(c => c.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {complaints.filter(c => c.status === 'in-progress').length}
                        </p>
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
                        <p className="text-2xl font-bold text-gray-900">
                          {complaints.filter(c => c.status === 'resolved').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Complaints */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
                    <button 
                      onClick={() => setActiveTab('complaints')}
                      className="text-bits-blue hover:text-bits-navy transition-colors text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {complaints.slice(0, 3).map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'resolved' ? 'bg-green-500' : 
                            complaint.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{complaint.title}</p>
                            <p className="text-sm text-gray-600">{complaint.studentName} - Room {complaint.roomNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Complaint Trends</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="complaints" fill="#3B82F6" name="Total Complaints" />
                        <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Complaint Management</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                              {complaint.status.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{complaint.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span>Student: {complaint.studentName}</span>
                            <span>Room: {complaint.roomNumber}</span>
                            <span>Category: {complaint.category}</span>
                            <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateComplaintStatus(complaint.id, 'in-progress')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                          >
                            Mark In Progress
                          </button>
                          <button
                            onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        </div>
                        <button
                          onClick={() => setSelectedComplaint(complaint)}
                          className="flex items-center space-x-1 text-bits-blue hover:text-bits-navy text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Complaints by Category</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Resolution Time</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Resolution Time</span>
                        <span className="font-semibold">2.3 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Fastest Resolution</span>
                        <span className="font-semibold text-green-600">4 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Slowest Resolution</span>
                        <span className="font-semibold text-red-600">7 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Resolution Rate</span>
                        <span className="font-semibold text-blue-600">85%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="complaints" fill="#3B82F6" name="Total Complaints" />
                        <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Room
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Complaints
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-bits-blue rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">AS</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Arjun Sharma</p>
                              <p className="text-sm text-gray-500">2021A7PS0001P</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A-101</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          2021A7PS0001P@pilani.bits-pilani.ac.in
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Complaint Details</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedComplaint.title}</h4>
                  <p className="text-gray-600">{selectedComplaint.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                    <p className="text-gray-900">{selectedComplaint.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                    <p className="text-gray-900">{selectedComplaint.roomNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-gray-900">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                    <p className="text-gray-900">{new Date(selectedComplaint.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bits-blue"
                    placeholder="Add notes about the complaint resolution..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button className="bg-bits-blue text-white px-6 py-2 rounded-lg hover:bg-bits-navy transition-colors">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}