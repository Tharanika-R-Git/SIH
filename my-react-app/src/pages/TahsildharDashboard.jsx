import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Search, Filter, Download, Shield, Bell, Settings, Menu, X, Home, BarChart3, Activity, Eye, AlertTriangle, ExternalLink, ArrowRight, User, MapPin, Calendar, Hash, FileCheck, Layers, Send, MessageSquare, CheckSquare } from 'lucide-react';

export default function TahsildarDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState('');

  // Mock verification requests data
  const pendingVerifications = [
    {
      id: 'VER2024001',
      requestDate: '2024-10-08 15:30:22',
      firNumber: 'FIR2024001',
      firDate: '2024-10-08',
      policeStation: 'Tiruppur North PS',
      victimName: 'Rajesh Kumar',
      victimDOB: '15-03-1989',
      aadhaarNumber: '4532 8976 1234',
      aadhaarVerified: true,
      caste: 'SC',
      subCaste: 'Adi Dravida',
      casteCertificateNumber: 'SC/TRP/2018/00234',
      certificateIssueDate: '12-05-2018',
      issuingAuthority: 'Tahsildar, Tiruppur',
      digiLockerStatus: 'verified',
      revenueVillage: 'Tiruppur North',
      taluk: 'Tiruppur',
      district: 'Tiruppur',
      requestedBy: 'SHO Ramesh Kumar (POL001)',
      status: 'pending',
      autoPopulated: true,
      documents: [
        { name: 'Caste Certificate', source: 'DigiLocker', verified: true },
        { name: 'Aadhaar Card', source: 'DigiLocker', verified: true },
        { name: 'FIR Copy', source: 'Police Portal', verified: true }
      ],
      verificationNotes: 'All documents auto-fetched from DigiLocker. Certificate details match with revenue records.'
    },
    {
      id: 'VER2024002',
      requestDate: '2024-10-08 16:45:10',
      firNumber: 'FIR2024002',
      firDate: '2024-10-07',
      policeStation: 'Tiruppur South PS',
      victimName: 'Lakshmi Devi',
      victimDOB: '22-08-1982',
      aadhaarNumber: '7845 2134 6789',
      aadhaarVerified: true,
      caste: 'ST',
      subCaste: 'Irular',
      casteCertificateNumber: 'ST/TRP/2019/00456',
      certificateIssueDate: '08-11-2019',
      issuingAuthority: 'Tahsildar, Tiruppur South',
      digiLockerStatus: 'verified',
      revenueVillage: 'Veerapandi',
      taluk: 'Tiruppur',
      district: 'Tiruppur',
      requestedBy: 'SHO Ramesh Kumar (POL001)',
      status: 'pending',
      autoPopulated: true,
      documents: [
        { name: 'Caste Certificate', source: 'DigiLocker', verified: true },
        { name: 'Aadhaar Card', source: 'DigiLocker', verified: true },
        { name: 'FIR Copy', source: 'Police Portal', verified: true },
        { name: 'Tribal Certificate', source: 'DigiLocker', verified: true }
      ],
      verificationNotes: 'Tribal certificate verified from DigiLocker. All details cross-verified with tribal welfare records.'
    },
    {
      id: 'VER2024003',
      requestDate: '2024-10-07 14:20:35',
      firNumber: 'FIR2024003',
      firDate: '2024-10-06',
      policeStation: 'Palladam PS',
      victimName: 'Suresh Babu',
      victimDOB: '10-06-1976',
      aadhaarNumber: '2341 7865 4329',
      aadhaarVerified: false,
      caste: 'SC',
      subCaste: 'Pallan',
      casteCertificateNumber: 'SC/PLD/2017/00789',
      certificateIssueDate: '20-03-2017',
      issuingAuthority: 'Tahsildar, Palladam',
      digiLockerStatus: 'partial',
      revenueVillage: 'Palladam',
      taluk: 'Palladam',
      district: 'Tiruppur',
      requestedBy: 'SHO Ramesh Kumar (POL001)',
      status: 'pending',
      autoPopulated: true,
      documents: [
        { name: 'Caste Certificate', source: 'Uploaded PDF', verified: false },
        { name: 'Aadhaar Card', source: 'Manual Entry', verified: false },
        { name: 'FIR Copy', source: 'Police Portal', verified: true }
      ],
      verificationNotes: 'Caste certificate not available in DigiLocker. Manual verification required. Aadhaar needs verification.',
      issues: ['DigiLocker document not found', 'Aadhaar verification pending']
    }
  ];

  const approvedVerifications = [
    {
      id: 'VER2024004',
      requestDate: '2024-10-06 10:15:30',
      approvedDate: '2024-10-06 14:30:45',
      firNumber: 'FIR2023995',
      victimName: 'Murugan S',
      caste: 'SC',
      status: 'approved',
      verifiedBy: 'Tahsildar Venkatesh (TAH001)'
    },
    {
      id: 'VER2024005',
      requestDate: '2024-10-05 16:22:10',
      approvedDate: '2024-10-06 11:45:20',
      firNumber: 'FIR2023992',
      victimName: 'Kavitha M',
      caste: 'ST',
      status: 'approved',
      verifiedBy: 'Tahsildar Venkatesh (TAH001)'
    }
  ];

  const rejectedVerifications = [
    {
      id: 'VER2024006',
      requestDate: '2024-10-05 09:30:15',
      rejectedDate: '2024-10-05 15:20:30',
      firNumber: 'FIR2023988',
      victimName: 'Ravi Kumar',
      caste: 'SC',
      status: 'rejected',
      reason: 'Caste certificate expired. New certificate required.',
      verifiedBy: 'Tahsildar Venkatesh (TAH001)'
    }
  ];

  const handleAction = (action) => {
    setActionType(action);
    if (action === 'approve') {
      alert(`Verification APPROVED for ${selectedCase.id}\n\nCase: ${selectedCase.firNumber}\nVictim: ${selectedCase.victimName}\nCaste: ${selectedCase.caste} - ${selectedCase.subCaste}\n\nApproved by: Tahsildar Venkatesh (TAH001)\nTimestamp: ${new Date().toLocaleString()}\n\nNotification sent to:\n• Police Department\n• District Collector\n• Welfare Department`);
    } else if (action === 'reject') {
      if (comment.trim()) {
        alert(`Verification REJECTED for ${selectedCase.id}\n\nReason: ${comment}\n\nRejected by: Tahsildar Venkatesh (TAH001)\nTimestamp: ${new Date().toLocaleString()}\n\nNotification sent to Police Department`);
        setComment('');
        setShowCommentBox(false);
      }
    } else if (action === 'request-docs') {
      if (comment.trim()) {
        alert(`Additional documents REQUESTED for ${selectedCase.id}\n\nDocuments needed: ${comment}\n\nRequested by: Tahsildar Venkatesh (TAH001)\nTimestamp: ${new Date().toLocaleString()}\n\nNotification sent to victim via mobile app`);
        setComment('');
        setShowCommentBox(false);
      }
    }
  };

  const VerificationCard = ({ verification }) => (
    <div
      onClick={() => setSelectedCase(verification)}
      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${verification.digiLockerStatus === 'verified' ? 'bg-green-100' : 'bg-orange-100'}`}>
            <FileCheck className={`w-5 h-5 ${verification.digiLockerStatus === 'verified' ? 'text-green-600' : 'text-orange-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{verification.id}</h3>
            <p className="text-sm text-gray-500">FIR: {verification.firNumber}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {verification.digiLockerStatus === 'verified' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>DigiLocker</span>
            </span>
          )}
          {verification.autoPopulated && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              Auto-Filled
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Victim Name</p>
          <p className="font-semibold text-gray-900">{verification.victimName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Caste Category</p>
          <p className="font-semibold text-gray-900">{verification.caste} - {verification.subCaste}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Revenue Village</p>
          <p className="font-semibold text-gray-900">{verification.revenueVillage}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Certificate No.</p>
          <p className="font-semibold text-gray-900 text-sm">{verification.casteCertificateNumber}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-gray-400" />
        <p className="text-xs text-gray-500">Requested: {verification.requestDate}</p>
      </div>

      {verification.issues && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-3">
          <p className="text-xs font-bold text-orange-800 mb-2">⚠ Requires Attention</p>
          <ul className="space-y-1">
            {verification.issues.map((issue, idx) => (
              <li key={idx} className="text-xs text-orange-700">• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">By: {verification.requestedBy}</span>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>Verify</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-3 rounded-xl shadow-lg">
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Tahsildar Dashboard</h1>
                  <p className="text-sm text-gray-600">Caste Verification Portal | Tiruppur Taluk</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l-2 border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">Tahsildar Venkatesh</p>
                  <p className="text-xs text-gray-500">ID: TAH001 | Tiruppur Taluk</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                  TV
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-white border-r-2 border-gray-200 transition-all duration-300 overflow-hidden shadow-lg`}>
          <div className="p-6 space-y-6">
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl font-semibold border-2 border-green-200">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                <FileText className="w-5 h-5" />
                <span>All Verifications</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                <Activity className="w-5 h-5" />
                <span>Audit Logs</span>
              </button>
            </nav>

            <div className="pt-6 border-t-2 border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Today's Stats</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-green-700">Verified</span>
                    <span className="text-2xl font-bold text-green-700">8</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">+2 from yesterday</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-orange-700">Pending</span>
                    <span className="text-2xl font-bold text-orange-700">{pendingVerifications.length}</span>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Requires action</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-700">DigiLocker</span>
                    <span className="text-2xl font-bold text-blue-700">92%</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Verification rate</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Jurisdiction</h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Tiruppur Taluk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">12 Revenue Villages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {!selectedCase ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Pending</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{pendingVerifications.length}</p>
                  <p className="text-sm text-gray-600">Awaiting Verification</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-orange-600 font-semibold">Action required</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Approved</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{approvedVerifications.length}</p>
                  <p className="text-sm text-gray-600">Verified Cases</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-green-600 font-semibold">This week</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">DigiLocker</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">92%</p>
                  <p className="text-sm text-gray-600">Auto-Verified</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-blue-600 font-semibold">High efficiency</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Activity className="w-8 h-8 text-purple-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Avg Time</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">2.4h</p>
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-purple-600 font-semibold">Faster than target</p>
                  </div>
                </div>
              </div>

              {/* Verification Queue Tabs */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                <div className="border-b-2 border-gray-200 bg-gray-50">
                  <div className="flex px-6">
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                        activeTab === 'pending' ? 'text-orange-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <Clock className="w-6 h-6" />
                        <span className="text-lg">Pending Verifications</span>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                          {pendingVerifications.length}
                        </span>
                      </div>
                      {activeTab === 'pending' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('approved')}
                      className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                        activeTab === 'approved' ? 'text-green-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-lg">Approved</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          {approvedVerifications.length}
                        </span>
                      </div>
                      {activeTab === 'approved' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('rejected')}
                      className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                        activeTab === 'rejected' ? 'text-red-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <XCircle className="w-6 h-6" />
                        <span className="text-lg">Rejected</span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                          {rejectedVerifications.length}
                        </span>
                      </div>
                      {activeTab === 'rejected' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 border-b-2 border-gray-200">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by verification ID, FIR number, or victim name..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                      />
                    </div>
                    <button className="px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 flex items-center space-x-2 font-bold shadow-sm">
                      <Filter className="w-5 h-5" />
                      <span>Filter</span>
                    </button>
                    <button className="px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 flex items-center space-x-2 font-bold shadow-sm">
                      <Download className="w-5 h-5" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Cases Grid */}
                <div className="p-6">
                  {activeTab === 'pending' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {pendingVerifications.map((verification) => (
                        <VerificationCard key={verification.id} verification={verification} />
                      ))}
                    </div>
                  )}
                  {activeTab === 'approved' && (
                    <div className="space-y-4">
                      {approvedVerifications.map((verification) => (
                        <div key={verification.id} className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-100 p-3 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{verification.id}</h3>
                                <p className="text-sm text-gray-600">FIR: {verification.firNumber} | {verification.victimName}</p>
                                <p className="text-xs text-gray-500 mt-1">Caste: {verification.caste}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="px-4 py-2 bg-green-200 text-green-800 rounded-lg font-bold text-sm">
                                ✓ Approved
                              </span>
                              <p className="text-xs text-gray-500 mt-2">{verification.approvedDate}</p>
                              <p className="text-xs text-gray-600 mt-1">{verification.verifiedBy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'rejected' && (
                    <div className="space-y-4">
                      {rejectedVerifications.map((verification) => (
                        <div key={verification.id} className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-red-100 p-3 rounded-xl">
                                <XCircle className="w-6 h-6 text-red-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{verification.id}</h3>
                                <p className="text-sm text-gray-600">FIR: {verification.firNumber} | {verification.victimName}</p>
                                <p className="text-sm text-red-700 mt-2 font-medium">Reason: {verification.reason}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="px-4 py-2 bg-red-200 text-red-800 rounded-lg font-bold text-sm">
                                ✗ Rejected
                              </span>
                              <p className="text-xs text-gray-500 mt-2">{verification.rejectedDate}</p>
                              <p className="text-xs text-gray-600 mt-1">{verification.verifiedBy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Detailed Verification View */
            <div>
              <button
                onClick={() => setSelectedCase(null)}
                className="mb-6 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 flex items-center space-x-2 font-bold shadow-sm"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>Back to Queue</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Header Card */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCase.id}</h2>
                        <p className="text-gray-600 font-medium">Caste Certificate Verification Request</p>
                        <p className="text-sm text-gray-500 mt-1">Requested: {selectedCase.requestDate}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {selectedCase.digiLockerStatus === 'verified' && (
                          <span className="px-4 py-2 rounded-lg text-sm font-bold text-center bg-green-100 text-green-700 border-2 border-green-300 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>DigiLocker Verified</span>
                          </span>
                        )}
                        {selectedCase.autoPopulated && (
                          <span className="px-4 py-2 rounded-lg text-sm font-bold text-center bg-blue-100 text-blue-700 border-2 border-blue-300">
                            Auto-Populated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* FIR Details */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
                      <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>FIR Details</span>
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-blue-700 mb-1">FIR Number</p>
                          <p className="font-bold text-blue-900">{selectedCase.firNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-700 mb-1">FIR Date</p>
                          <p className="font-bold text-blue-900">{selectedCase.firDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-700 mb-1">Police Station</p>
                          <p className="font-bold text-blue-900">{selectedCase.policeStation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Victim Details - Auto-Populated */}
                    <div className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Victim Name</p>
                        <p className="font-bold text-gray-900">{selectedCase.victimName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Date of Birth</p>
                        <p className="font-bold text-gray-900">{selectedCase.victimDOB}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold flex items-center space-x-1">
                          <span>Aadhaar</span>
                          {selectedCase.aadhaarVerified && <CheckCircle className="w-3 h-3 text-green-600" />}
                        </p>
                        <p className="font-bold text-gray-900">{selectedCase.aadhaarNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Caste Certificate Details - Auto-Populated from DigiLocker */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <FileCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <span>Caste Certificate Details</span>
                      </h3>
                      {selectedCase.digiLockerStatus === 'verified' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>From DigiLocker</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">Caste Category</p>
                          <p className="text-gray-900 text-lg font-bold">{selectedCase.caste}</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">Sub-Caste</p>
                          <p className="text-gray-900 text-lg font-bold">{selectedCase.subCaste}</p>
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                        <p className="text-sm font-bold text-gray-700 mb-2">Certificate Number</p>
                        <p className="text-gray-900 font-mono text-lg">{selectedCase.casteCertificateNumber}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">Issue Date</p>
                          <p className="text-gray-900">{selectedCase.certificateIssueDate}</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">Issuing Authority</p>
                          <p className="text-gray-900">{selectedCase.issuingAuthority}</p>
                        </div>
                      </div>

                      {/* Jurisdiction Details */}
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                        <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center space-x-2">
                          <MapPin className="w-5 h-5" />
                          <span>Jurisdiction & Location</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-green-700 mb-1">Revenue Village</p>
                            <p className="font-bold text-green-900">{selectedCase.revenueVillage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-green-700 mb-1">Taluk</p>
                            <p className="font-bold text-green-900">{selectedCase.taluk}</p>
                          </div>
                          <div>
                            <p className="text-xs text-green-700 mb-1">District</p>
                            <p className="font-bold text-green-900">{selectedCase.district}</p>
                          </div>
                        </div>
                      </div>

                      {/* Verification Notes */}
                      <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                        <p className="text-sm font-bold text-blue-800 mb-3 flex items-center space-x-2">
                          <Layers className="w-5 h-5" />
                          <span>System Verification Notes</span>
                        </p>
                        <p className="text-blue-900 leading-relaxed">{selectedCase.verificationNotes}</p>
                      </div>

                      {selectedCase.issues && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-5">
                          <p className="text-sm font-bold text-orange-900 mb-4 flex items-center space-x-2">
                            <AlertTriangle className="w-6 h-6" />
                            <span>Issues Requiring Attention</span>
                          </p>
                          <ul className="space-y-3">
                            {selectedCase.issues.map((issue, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className="bg-orange-200 text-orange-800 font-bold px-2 py-1 rounded text-xs mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-orange-800 font-medium flex-1">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center space-x-2">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <span>Submitted Documents</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedCase.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${doc.verified ? 'bg-green-100' : 'bg-orange-100'}`}>
                              <FileText className={`w-6 h-6 ${doc.verified ? 'text-green-600' : 'text-orange-600'}`} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">Source: {doc.source}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {doc.verified && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Verified</span>
                              </span>
                            )}
                            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center space-x-2 shadow-sm">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Request Information */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-5">Request Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">Requested By</span>
                        <span className="text-sm text-gray-900 font-bold">{selectedCase.requestedBy}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">Request Date & Time</span>
                        <span className="text-sm text-gray-900 font-bold">{selectedCase.requestDate}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">Auto-Population Status</span>
                        <span className="text-sm text-green-700 font-bold">✓ Completed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - Actions */}
                <div className="space-y-6">
                  {/* Action Panel */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Verification Actions</h3>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleAction('approve')}
                        className="w-full px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-bold flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Approve Verification</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowCommentBox(true);
                          setActionType('request-docs');
                        }}
                        className="w-full px-5 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold flex items-center justify-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>Request Documents</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowCommentBox(true);
                          setActionType('reject');
                        }}
                        className="w-full px-5 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Reject Verification</span>
                      </button>

                      {showCommentBox && (
                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 mt-3">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={
                              actionType === 'reject' 
                                ? "Enter rejection reason..." 
                                : "Specify required documents..."
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows={3}
                          />
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleAction(actionType)}
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => {
                                setShowCommentBox(false);
                                setComment('');
                                setActionType('');
                              }}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t-2 border-gray-200">
                      <p className="text-xs text-gray-500 mb-3 uppercase font-bold">Quick Actions</p>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          View Certificate History
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          Check Revenue Records
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          Download Verification Report
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Status */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Workflow Status</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="bg-green-200 p-2 rounded-lg mt-1">
                          <CheckCircle className="w-5 h-5 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-green-900">Police Verification</p>
                          <p className="text-xs text-green-700 mt-1">
                            FIR verified and forwarded
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                            ✓ Completed
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="bg-blue-200 p-2 rounded-lg mt-1">
                          <Clock className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900">Tahsildar Verification</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Current stage - Action required
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full">
                            In Progress
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-gray-200 p-2 rounded-lg mt-1">
                          <Clock className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Collector Approval</p>
                          <p className="text-xs text-gray-700 mt-1">
                            Awaiting Tahsildar verification
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audit Trail */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>Audit Trail</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
                        <div className="bg-blue-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Verification Request Received</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Auto-routed to Tiruppur Taluk based on jurisdiction
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">{selectedCase.requestDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
                        <div className="bg-green-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Fields Auto-Populated</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Data fetched from DigiLocker and revenue records
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">{selectedCase.requestDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Documents Verified</p>
                          <p className="text-xs text-gray-600 mt-1">
                            DigiLocker verification flag set
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">{selectedCase.requestDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}