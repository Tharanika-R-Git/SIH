import React, { useState } from 'react';
import { Bell, TrendingUp, AlertTriangle, FileText, Users, Clock, CheckCircle, XCircle, BarChart3, Map, Download, Eye, Filter, LogOut, Moon, Sun, ChevronLeft, Home, FolderOpen, IndianRupee, X, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import myLogo from '../assets/my-logo.png'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
const navigate = useNavigate();
  // Mock data
  const stats = {
    totalCases: 1247,
    activeCases: 389,
    delayedCases: 67,
    completedCases: 791,
    avgProcessingTime: 12.4
  };

  const departments = [
    { name: 'Police FIR Verification', processed: 423, avgDelay: 2.1, pending: 34, delayed: 8 },
    { name: 'Tahsildar Caste Validation', processed: 398, avgDelay: 3.2, pending: 41, delayed: 15 },
    { name: 'Welfare Approval', processed: 367, avgDelay: 2.8, pending: 28, delayed: 12 },
    { name: 'Treasury Disbursement', processed: 345, avgDelay: 4.5, pending: 22, delayed: 18 }
  ];

  const recentCases = [
    { 
      id: 'CASE-2025-001', 
      name: 'Rajesh Kumar', 
      location: 'Chennai, Tamil Nadu', 
      fir: 'FIR/2025/001', 
      caste: 'Verified', 
      scheme: 'PoA Relief', 
      subScheme: 'Pension Payment', 
      amount: '₹50,000', 
      days: 8, 
      flag: 'normal', 
      district: 'Chennai',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      age: 45,
      gender: 'Male',
      dateApplied: '2025-01-15',
      currentStage: 'Welfare Approval',
      timeline: [
        { stage: 'FIR Verification', status: 'completed', date: '2025-01-16', officer: 'SI Ramesh Kumar', notes: 'FIR verified successfully' },
        { stage: 'Caste Validation', status: 'completed', date: '2025-01-18', officer: 'Tahsildar M. Vijay', notes: 'Caste certificate validated' },
        { stage: 'Welfare Approval', status: 'in-progress', date: '2025-01-20', officer: 'Welfare Officer Priya', notes: 'Under review' },
        { stage: 'Treasury Disbursement', status: 'pending', date: null, officer: null, notes: null }
      ],
      documents: [
        { name: 'FIR Copy', status: 'verified', uploadDate: '2025-01-15' },
        { name: 'Caste Certificate', status: 'verified', uploadDate: '2025-01-15' },
        { name: 'Aadhaar Card', status: 'verified', uploadDate: '2025-01-15' },
        { name: 'Bank Passbook', status: 'verified', uploadDate: '2025-01-15' }
      ]
    },
    { 
      id: 'CASE-2025-002', 
      name: 'Priya Devi', 
      location: 'Coimbatore, Tamil Nadu', 
      fir: 'FIR/2025/089', 
      caste: 'Verified', 
      scheme: 'PCR Scheme', 
      subScheme: 'Medical Support', 
      amount: '₹75,000', 
      days: 12, 
      flag: 'delayed', 
      district: 'Coimbatore',
      phone: '+91 98765 43211',
      email: 'priya.devi@email.com',
      age: 38,
      gender: 'Female',
      dateApplied: '2025-01-10',
      currentStage: 'Caste Validation',
      timeline: [
        { stage: 'FIR Verification', status: 'completed', date: '2025-01-12', officer: 'SI Murugan', notes: 'Verified' },
        { stage: 'Caste Validation', status: 'in-progress', date: '2025-01-14', officer: 'Tahsildar Senthil', notes: 'Document verification in progress' },
        { stage: 'Welfare Approval', status: 'pending', date: null, officer: null, notes: null },
        { stage: 'Treasury Disbursement', status: 'pending', date: null, officer: null, notes: null }
      ],
      documents: [
        { name: 'FIR Copy', status: 'verified', uploadDate: '2025-01-10' },
        { name: 'Caste Certificate', status: 'pending', uploadDate: '2025-01-10' },
        { name: 'Aadhaar Card', status: 'verified', uploadDate: '2025-01-10' },
        { name: 'Medical Reports', status: 'verified', uploadDate: '2025-01-10' }
      ]
    },
    { 
      id: 'CASE-2025-003', 
      name: 'Murugan S', 
      location: 'Madurai, Tamil Nadu', 
      fir: 'FIR/2025/134', 
      caste: 'Pending', 
      scheme: 'PoA Relief', 
      subScheme: 'Educational Aid', 
      amount: '₹40,000', 
      days: 6, 
      flag: 'normal', 
      district: 'Madurai',
      phone: '+91 98765 43212',
      email: 'murugan.s@email.com',
      age: 52,
      gender: 'Male',
      dateApplied: '2025-01-18',
      currentStage: 'FIR Verification',
      timeline: [
        { stage: 'FIR Verification', status: 'in-progress', date: '2025-01-19', officer: 'SI Kumar', notes: 'Under verification' },
        { stage: 'Caste Validation', status: 'pending', date: null, officer: null, notes: null },
        { stage: 'Welfare Approval', status: 'pending', date: null, officer: null, notes: null },
        { stage: 'Treasury Disbursement', status: 'pending', date: null, officer: null, notes: null }
      ],
      documents: [
        { name: 'FIR Copy', status: 'pending', uploadDate: '2025-01-18' },
        { name: 'Caste Certificate', status: 'uploaded', uploadDate: '2025-01-18' },
        { name: 'Aadhaar Card', status: 'verified', uploadDate: '2025-01-18' },
        { name: 'Educational Documents', status: 'uploaded', uploadDate: '2025-01-18' }
      ]
    },
    { 
      id: 'CASE-2025-004', 
      name: 'Lakshmi R', 
      location: 'Salem, Tamil Nadu', 
      fir: 'FIR/2025/221', 
      caste: 'Verified', 
      scheme: 'PCR Scheme', 
      subScheme: 'Legal Aid', 
      amount: '₹60,000', 
      days: 15, 
      flag: 'critical', 
      district: 'Salem',
      phone: '+91 98765 43213',
      email: 'lakshmi.r@email.com',
      age: 41,
      gender: 'Female',
      dateApplied: '2025-01-05',
      currentStage: 'Treasury Disbursement',
      timeline: [
        { stage: 'FIR Verification', status: 'completed', date: '2025-01-07', officer: 'SI Ravi', notes: 'Verified successfully' },
        { stage: 'Caste Validation', status: 'completed', date: '2025-01-09', officer: 'Tahsildar Priya', notes: 'Documents approved' },
        { stage: 'Welfare Approval', status: 'completed', date: '2025-01-12', officer: 'Welfare Officer Kumar', notes: 'Sanctioned' },
        { stage: 'Treasury Disbursement', status: 'in-progress', date: '2025-01-15', officer: 'Treasury Clerk Vijay', notes: 'Payment processing delayed' }
      ],
      documents: [
        { name: 'FIR Copy', status: 'verified', uploadDate: '2025-01-05' },
        { name: 'Caste Certificate', status: 'verified', uploadDate: '2025-01-05' },
        { name: 'Aadhaar Card', status: 'verified', uploadDate: '2025-01-05' },
        { name: 'Legal Documents', status: 'verified', uploadDate: '2025-01-05' }
      ]
    },
  ];

  const sanctionedCases = [
    { name: 'Priya Sharma', id: 'CASE-2025-002', scheme: 'PCR Scheme', amount: '₹75,000', status: 'Sanctioned' },
    { name: 'Kumar Rajan', id: 'CASE-2025-005', scheme: 'PoA Relief', amount: '₹50,000', status: 'Sanctioned' },
    { name: 'Deepa M', id: 'CASE-2025-007', scheme: 'PCR Scheme', amount: '₹65,000', status: 'Sanctioned' },
  ];

  const mlInsights = [
    { dept: 'Treasury', prediction: 'High delay risk', probability: 78, reason: 'Increased volume, staff shortage' },
    { dept: 'Tahsildar', prediction: 'Moderate delay', probability: 54, reason: 'Document verification backlog' },
    { dept: 'Welfare', prediction: 'On track', probability: 23, reason: 'Normal processing rate' }
  ];

  const alerts = [
    { type: 'critical', message: 'Collector verification pending >5 days in Salem District', time: '2 hours ago' },
    { type: 'warning', message: '23 cases approaching SLA deadline in Coimbatore', time: '5 hours ago' },
    { type: 'info', message: 'Weekly summary report generated successfully', time: '1 day ago' }
  ];

  const menuItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Case Monitoring', icon: FolderOpen },
    { name: 'Performance', icon: BarChart3 },
    { name: 'ML Insights', icon: TrendingUp },
    { name: 'Audit Log', icon: FileText },
  ];

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
    setShowCaseDetails(true);
  };
 const handleLogout = () => {
  
    navigate('/Login');
    
};
  const CaseDetailsModal = () => {
    if (!selectedCase) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
          {/* Modal Header */}
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between z-10`}>
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Case Details - {selectedCase.id}</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>Complete case information and tracking</p>
            </div>
            <button 
              onClick={() => setShowCaseDetails(false)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Applicant Information */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-6 border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <User className="w-5 h-5" />
                Applicant Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Full Name</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.name}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Age / Gender</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.age} / {selectedCase.gender}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Location</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.location}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Phone</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.phone}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Email</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.email}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Application Date</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.dateApplied}</p>
                </div>
              </div>
            </div>

            {/* Scheme & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg p-5 border`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Scheme Details</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.scheme}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{selectedCase.subScheme}</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg p-5 border`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Eligible Amount</p>
                <p className="text-2xl font-bold text-green-600">{selectedCase.amount}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Sanctioned amount</p>
              </div>
            </div>

            {/* Timeline */}
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <Clock className="w-5 h-5" />
                Processing Timeline
              </h3>
              <div className="space-y-4">
                {selectedCase.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-100' :
                        step.status === 'in-progress' ? 'bg-blue-100' :
                        darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : step.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                        )}
                      </div>
                      {idx < selectedCase.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${step.status === 'completed' ? 'bg-green-300' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.stage}</p>
                      {step.officer && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Officer: {step.officer}</p>
                      )}
                      {step.date && (
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{step.date}</p>
                      )}
                      {step.notes && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-2 italic`}>{step.notes}</p>
                      )}
                      {step.status === 'pending' && (
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <FileText className="w-5 h-5" />
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCase.documents.map((doc, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIR Information */}
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'} rounded-lg p-5 border`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>FIR & Verification Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>FIR Number</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.fir}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Caste Certificate</p>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                    selectedCase.caste === 'Verified' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {selectedCase.caste === 'Verified' && <CheckCircle className="w-4 h-4" />}
                    {selectedCase.caste}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Download Full Report
              </button>
              <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                Send Notification
              </button>
              <button 
                onClick={() => setShowCaseDetails(false)}
                className={`px-6 py-3 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg font-medium transition`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${darkMode ? 'bg-black' : 'bg-gray-900'} text-white flex flex-col`}>
        <div className={`p-6 flex items-center gap-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-800'}`}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src={myLogo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <div className="font-bold text-base">Admin Portal</div>
            <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-300">
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                  activeTab === item.name
                    ? 'bg-blue-600 text-white'
                    : `text-gray-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-800'}`
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome, Admin Officer</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>Administration - Case Monitoring Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <select className={`px-3 py-2 border rounded-lg text-sm ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}>
                <option>English</option>
                <option>தமிழ்</option>
              </select>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button className={`relative p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition`}>
                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'Dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Cases</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-1`}>{stats.totalCases}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Cases</p>
                      <p className="text-2xl font-bold text-orange-600 mt-1">{stats.activeCases}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delayed Cases</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">{stats.delayedCases}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{stats.completedCases}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Processing</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.avgProcessingTime}d</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-indigo-500" />
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Alerts & Notifications</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border ${
                      alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        alert.type === 'critical' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ML Insights */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">ML-Powered Delay Predictions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mlInsights.map((insight, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{insight.dept}</p>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">{insight.probability}%</span>
                      </div>
                      <p className="text-sm opacity-90 mb-2">{insight.prediction}</p>
                      <p className="text-xs opacity-75">{insight.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Case Monitoring' && (
            <div className="space-y-6">
              {/* Case Review Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Case Review & Monitoring</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Track and monitor all registered PoA/PCR cases</p>
                </div>
                <button className={`px-4 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2`}>
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              {/* Pending Cases */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pending Review & Approval</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>Review verified cases and monitor status</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Case Details</th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>FIR & Verification</th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Scheme</th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Eligible Amount</th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {recentCases.map((case_) => (
                        <tr key={case_.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-blue-600">{case_.id}</div>
                            <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{case_.name}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{case_.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                              {case_.fir}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Caste {case_.caste}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{case_.scheme}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{case_.subScheme}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-base font-bold text-green-600">{case_.amount}</div>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleViewCase(case_)}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recently Sanctioned */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recently Sanctioned Cases</h3>
                </div>
                <div className="p-6 space-y-3">
                  {sanctionedCases.map((case_, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div>
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{case_.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{case_.id} • {case_.scheme}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{case_.amount}</p>
                        <p className="text-xs text-green-600">{case_.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Performance' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Department Performance Dashboard</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Inter-department efficiency and delay analysis</p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Performance Metrics by Department</h3>
                <div className="space-y-4">
                  {departments.map((dept, idx) => (
                    <div key={idx} className={`border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200'} rounded-lg p-5`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{dept.name}</h4>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          dept.avgDelay > 4 ? 'bg-red-100 text-red-700' :
                          dept.avgDelay > 3 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          Avg Delay: {dept.avgDelay} days
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Processed</p>
                          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{dept.processed}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Pending</p>
                          <p className="text-xl font-bold text-orange-600">{dept.pending}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Delayed</p>
                          <p className="text-xl font-bold text-red-600">{dept.delayed}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Efficiency</p>
                          <p className="text-xl font-bold text-green-600">
                            {Math.round((dept.processed / (dept.processed + dept.pending)) * 100)}%
                          </p>
                        </div>
                      </div>
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2.5`}>
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${(dept.processed / (dept.processed + dept.pending)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Heatmap */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                <div className="flex items-center gap-2 mb-6">
                  <Map className="w-5 h-5 text-blue-600" />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Regional Delay Heatmap</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Thanjavur'].map((district) => {
                    const delay = (Math.random() * 5 + 1).toFixed(1);
                    return (
                      <div key={district} className={`p-5 rounded-lg border-2 ${
                        delay > 4 ? 'bg-red-50 border-red-300' :
                        delay > 2.5 ? 'bg-yellow-50 border-yellow-300' :
                        'bg-green-50 border-green-300'
                      }`}>
                        <p className="font-semibold text-gray-900 text-lg">{district}</p>
                        <p className="text-sm text-gray-600 mt-1">Avg Delay: {delay} days</p>
                        <p className="text-xs text-gray-500 mt-1">Cases: {Math.floor(Math.random() * 50 + 20)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ML Insights' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI-Powered Analytics & Insights</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Machine learning predictions and trend analysis</p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Predictive Analytics Dashboard</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-indigo-200">
                    <h4 className="font-semibold text-gray-900 mb-4 text-base">Top Bottlenecks Identified</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Treasury Disbursement</span>
                        <span className="font-bold text-red-600">18 delays</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Caste Validation</span>
                        <span className="font-bold text-yellow-600">15 delays</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Welfare Approval</span>
                        <span className="font-bold text-yellow-600">12 delays</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-4 text-base">Monthly Trend Analysis</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Cases Processed</span>
                        <span className="font-bold text-green-600 flex items-center gap-1">
                          ↑ 12%
                        </span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Avg Processing Time</span>
                        <span className="font-bold text-green-600 flex items-center gap-1">
                          ↓ 8%
                        </span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700 font-medium">Delay Rate</span>
                        <span className="font-bold text-red-600 flex items-center gap-1">
                          ↑ 5%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Automated Flag: High Rejection Rate Detected</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Salem District Tahsildar office shows 23% rejection rate, which is 2x higher than the state average. 
                        Recommend immediate review of documentation guidelines and officer training protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Audit Log' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activity Audit & Compliance Log</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Complete transparency of all system actions</p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Recent Activity Timeline</h3>
                <div className="space-y-3">
                  {[
                    { action: 'FIR Verified', officer: 'SI Ramesh Kumar', case: 'POA/2024/1234', time: '2 hours ago', dept: 'Police', color: 'blue' },
                    { action: 'Caste Certificate Approved', officer: 'Tahsildar M. Vijay', case: 'PCR/2024/5678', time: '4 hours ago', dept: 'Revenue', color: 'green' },
                    { action: 'Welfare Amount Sanctioned', officer: 'Welfare Officer Priya', case: 'POA/2024/9012', time: '6 hours ago', dept: 'Welfare', color: 'purple' },
                    { action: 'Payment Initiated', officer: 'Treasury Clerk Kumar', case: 'PCR/2024/3456', time: '1 day ago', dept: 'Treasury', color: 'indigo' },
                    { action: 'Document Rejected', officer: 'SI Murugan', case: 'POA/2024/7890', time: '1 day ago', dept: 'Police', color: 'red' },
                    { action: 'Case Forwarded to Welfare', officer: 'Tahsildar Senthil', case: 'PCR/2024/8901', time: '1 day ago', dept: 'Revenue', color: 'yellow' }
                  ].map((log, idx) => (
                    <div key={idx} className={`flex items-start gap-4 p-5 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border hover:shadow-md transition`}>
                      <div className={`w-3 h-3 bg-${log.color}-600 rounded-full mt-2 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} text-base`}>{log.action}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1.5`}>
                              Case: <span className="text-blue-600 font-medium">{log.case}</span>
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                              Officer: <span className="font-medium">{log.officer}</span> 
                              <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} mx-1`}>•</span>
                              <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>{log.dept} Department</span>
                            </p>
                          </div>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} whitespace-nowrap`}>{log.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-6 px-4 py-3 text-blue-600 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-lg text-sm font-medium transition border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
                  Load More Activity Logs
                </button>
              </div>

              {/* Export & Compliance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Generate Reports</h3>
                  <div className="space-y-3">
                    <button className={`w-full flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} rounded-lg transition border`}>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Delay Analysis Report</span>
                      <Download className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    <button className={`w-full flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} rounded-lg transition border`}>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Department Statistics</span>
                      <Download className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    <button className={`w-full flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} rounded-lg transition border`}>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Summary Report</span>
                      <Download className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Compliance Dashboard</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-gray-900">SLA Compliance</span>
                      <span className="text-lg font-bold text-green-600">94.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-gray-900">Audit Trail Coverage</span>
                      <span className="text-lg font-bold text-blue-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-sm font-medium text-gray-900">Pending Reviews</span>
                      <span className="text-lg font-bold text-yellow-600">23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Case Details Modal */}
      {showCaseDetails && <CaseDetailsModal />}
    </div>
  );
}
