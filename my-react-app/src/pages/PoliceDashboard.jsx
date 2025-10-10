import React, { useState } from 'react';
import { Shield, Bell, Settings, LogOut, Menu, X, FileText, CheckCircle, AlertTriangle, Clock, Search, Filter, Download, TrendingUp, Users, Activity, Eye, Edit, MessageSquare, Send, ExternalLink, ArrowRight, Home, BarChart3, ChevronRight, AlertCircle as AlertIcon, Hash, FileCheck, Layers } from 'lucide-react';

export default function PoliceDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('fast-track');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');

  // Mock data for fast-track cases (ML Score ≥ 85)
  const fastTrackCases = [
    {
      id: 'FIR2024001',
      date: '2024-10-08',
      incidentDate: '2024-10-05',
      ps: 'Tiruppur North PS',
      victimName: 'Rajesh Kumar',
      victimAge: 35,
      victimGender: 'Male',
      caste: 'SC',
      mlScore: 92,
      status: 'pending',
      type: 'Physical Assault',
      section: 'Section 3(1)(x) of SC/ST Act',
      details: 'The victim was physically assaulted by accused persons on the basis of his caste identity. The incident occurred near the village square when the victim was returning from work. Multiple witnesses present at the scene.',
      accusedName: 'Karthik Murugan, Prakash Kumar',
      documents: ['FIR Copy', 'Medical Report', 'Witness Statement', 'Photo Evidence'],
      tamperCheck: 'Pass',
      ocrConfidence: 95,
      extractedText: {
        firNumber: 'FIR2024001',
        policeStation: 'Tiruppur North PS',
        date: '2024-10-08 10:30 AM',
        victimStatement: 'I was returning from work when the accused persons stopped me and started abusing me with casteist slurs. They then physically assaulted me causing injuries to my face and arms. Several people witnessed the incident.'
      },
      metadata: {
        documentHash: 'a3f5b8c2d1e4f7a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5',
        uploadTime: '2024-10-08 14:32:15 IST',
        fileSize: '2.4 MB',
        pages: 5
      }
    },
    {
      id: 'FIR2024002',
      date: '2024-10-07',
      incidentDate: '2024-10-04',
      ps: 'Tiruppur South PS',
      victimName: 'Lakshmi Devi',
      victimAge: 42,
      victimGender: 'Female',
      caste: 'ST',
      mlScore: 88,
      status: 'pending',
      type: 'Social Boycott',
      section: 'Section 3(1)(r) of SC/ST Act',
      details: 'Victim denied access to public water source and common village facilities based on tribal identity. Other community members preventing victim from accessing public resources.',
      accusedName: 'Village Panchayat Members',
      documents: ['FIR Copy', 'Photo Evidence', 'Video Recording'],
      tamperCheck: 'Pass',
      ocrConfidence: 91,
      extractedText: {
        firNumber: 'FIR2024002',
        policeStation: 'Tiruppur South PS',
        date: '2024-10-07 03:45 PM',
        victimStatement: 'We are being prevented from using the common water source and other public facilities in our village. The accused persons have enforced a social boycott against our family based on our tribal identity.'
      },
      metadata: {
        documentHash: 'b4c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0',
        uploadTime: '2024-10-07 16:15:22 IST',
        fileSize: '3.1 MB',
        pages: 4
      }
    }
  ];

  // Mock data for manual review cases (ML Score < 85)
  const manualReviewCases = [
    {
      id: 'FIR2024003',
      date: '2024-10-06',
      incidentDate: '2024-10-02',
      ps: 'Palladam PS',
      victimName: 'Suresh Babu',
      victimAge: 48,
      victimGender: 'Male',
      caste: 'SC',
      mlScore: 67,
      status: 'review',
      type: 'Property Damage',
      section: 'Section 3(1)(xi) of SC/ST Act',
      details: 'Property and agricultural land damaged intentionally due to caste-based discrimination. Fencing destroyed and crops damaged by accused persons.',
      accusedName: 'Neighboring Landlord',
      documents: ['FIR Copy (Incomplete)', 'Photo Evidence', 'Property Papers'],
      tamperCheck: 'Warning',
      ocrConfidence: 72,
      anomalies: [
        'Missing signature on page 2 of FIR',
        'Date mismatch between complaint and medical report',
        'Low resolution scan affecting text extraction',
        'Incomplete victim statement section'
      ],
      missingDocs: ['Medical Certificate', 'Property Valuation Report', 'Witness Statements'],
      extractedText: {
        firNumber: 'FIR2024003',
        policeStation: 'Palladam PS',
        date: '2024-10-06 11:20 AM',
        victimStatement: '[Partially extracted due to low quality] My agricultural land and property have been damaged...'
      },
      metadata: {
        documentHash: 'c5d7e0f3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1',
        uploadTime: '2024-10-06 12:45:30 IST',
        fileSize: '1.8 MB',
        pages: 6
      }
    },
    {
      id: 'FIR2024004',
      date: '2024-10-05',
      incidentDate: '2024-10-01',
      ps: 'Avinashi PS',
      victimName: 'Muthu Lakshmi',
      victimAge: 29,
      victimGender: 'Female',
      caste: 'ST',
      mlScore: 58,
      status: 'review',
      type: 'Verbal Abuse & Threats',
      section: 'Section 3(1)(s) of SC/ST Act',
      details: 'Victim subjected to casteist slurs and verbal abuse in public place. Accused persons also threatened the victim with physical harm if she continued to protest.',
      accusedName: 'Local Shopkeeper',
      documents: ['FIR Copy', 'Photo of Location'],
      tamperCheck: 'Pass',
      ocrConfidence: 65,
      anomalies: [
        'Very low quality document scan (65% confidence)',
        'Incomplete victim statement with missing details',
        'No clear signature verification possible',
        'Missing timestamp on complaint registration'
      ],
      missingDocs: ['Audio/Video Evidence', 'Witness Statements', 'Medical Report (if applicable)', 'Location Photos'],
      extractedText: {
        firNumber: 'FIR2024004',
        policeStation: 'Avinashi PS',
        date: '2024-10-05 09:15 AM',
        victimStatement: '[Low confidence extraction] I was verbally abused with casteist remarks and threatened...'
      },
      metadata: {
        documentHash: 'd6e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2',
        uploadTime: '2024-10-05 10:30:18 IST',
        fileSize: '1.2 MB',
        pages: 3
      }
    }
  ];

  const handleAction = (action, caseId) => {
    alert(`Action: ${action} for case ${caseId}\n\nThis will trigger the workflow to Tahsildar for caste verification.`);
    if (action === 'verify') {
      console.log('Triggering caste verification request to Tahsildar...');
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      alert(`Comment added to case ${selectedCase.id}:\n\n${comment}\n\nLogged with Officer ID: POL001\nTimestamp: ${new Date().toLocaleString()}`);
      setComment('');
      setShowCommentBox(false);
    }
  };

  const CaseCard = ({ caseItem }) => (
    <div
      onClick={() => setSelectedCase(caseItem)}
      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${caseItem.mlScore >= 85 ? 'bg-green-100' : 'bg-orange-100'}`}>
            <FileText className={`w-5 h-5 ${caseItem.mlScore >= 85 ? 'text-green-600' : 'text-orange-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{caseItem.id}</h3>
            <p className="text-sm text-gray-500">{caseItem.ps}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            caseItem.mlScore >= 85
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            ML: {caseItem.mlScore}/100
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            caseItem.tamperCheck === 'Pass'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {caseItem.tamperCheck === 'Pass' ? '✓ Verified' : '⚠ Warning'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Victim</p>
          <p className="font-semibold text-gray-900">{caseItem.victimName}</p>
          <p className="text-sm text-gray-600">{caseItem.caste} Category</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Incident Type</p>
          <p className="font-semibold text-gray-900">{caseItem.type}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Section</p>
        <p className="text-sm font-medium text-gray-700">{caseItem.section}</p>
      </div>

      {caseItem.anomalies && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-3">
          <p className="text-xs font-bold text-orange-800 mb-2">🚨 {caseItem.anomalies.length} Anomalies Detected</p>
          <ul className="space-y-1">
            {caseItem.anomalies.slice(0, 2).map((anomaly, idx) => (
              <li key={idx} className="text-xs text-orange-700">• {anomaly}</li>
            ))}
          </ul>
        </div>
      )}

      {caseItem.missingDocs && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-3">
          <p className="text-xs font-bold text-red-800">📄 Missing: {caseItem.missingDocs.length} Documents</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>📅 {caseItem.date}</span>
          <span>📊 OCR: {caseItem.ocrConfidence}%</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>Review</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation Bar */}
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
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Police Dashboard</h1>
                  <p className="text-sm text-gray-600">Tiruppur District | DBT Portal</p>
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
                  <p className="text-sm font-bold text-gray-900">SHO Ramesh Kumar</p>
                  <p className="text-xs text-gray-500">ID: POL001 | DySP</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                  RK
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-semibold border-2 border-blue-200">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                <FileText className="w-5 h-5" />
                <span>All Cases</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>MIS Reports</span>
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
                    <span className="text-2xl font-bold text-green-700">12</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">+3 from yesterday</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-orange-700">Pending</span>
                    <span className="text-2xl font-bold text-orange-700">8</span>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Review required</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-700">In Progress</span>
                    <span className="text-2xl font-bold text-blue-700">4</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Awaiting documents</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Search Cases</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {!selectedCase ? (
            <>
              {/* Dashboard Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Fast-Track</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{fastTrackCases.length}</p>
                  <p className="text-sm text-gray-600">Ready for Quick Verification</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-green-600 font-semibold">✓ ML Score ≥ 85%</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Manual</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{manualReviewCases.length}</p>
                  <p className="text-sm text-gray-600">Requires Manual Review</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-orange-600 font-semibold">⚠ Anomalies Detected</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Today</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
                  <p className="text-sm text-gray-600">Cases Verified</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-blue-600 font-semibold">↑ 25% from yesterday</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Activity className="w-8 h-8 text-purple-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Avg ML</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">87%</p>
                  <p className="text-sm text-gray-600">Authenticity Score</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-purple-600 font-semibold">Excellent accuracy</p>
                  </div>
                </div>
              </div>

              {/* Queue Tabs */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden mb-8">
                <div className="border-b-2 border-gray-200 bg-gray-50">
                  <div className="flex px-6">
                    <button
                      onClick={() => setActiveTab('fast-track')}
                      className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                        activeTab === 'fast-track'
                          ? 'text-green-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-lg">Fast-Track Verification Queue</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          {fastTrackCases.length}
                        </span>
                      </div>
                      {activeTab === 'fast-track' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('manual')}
                      className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                        activeTab === 'manual'
                          ? 'text-orange-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <AlertTriangle className="w-6 h-6" />
                        <span className="text-lg">Manual Review Queue</span>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                          {manualReviewCases.length}
                        </span>
                      </div>
                      {activeTab === 'manual' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by FIR number, victim name, or police station..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {(activeTab === 'fast-track' ? fastTrackCases : manualReviewCases).map((caseItem) => (
                      <CaseCard key={caseItem.id} caseItem={caseItem} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Detailed Case View */
            <div>
              <button
                onClick={() => setSelectedCase(null)}
                className="mb-6 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 flex items-center space-x-2 font-bold shadow-sm"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>Back to Queue</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Case Header Card */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCase.id}</h2>
                        <p className="text-gray-600 font-medium">{selectedCase.type}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Filed: {selectedCase.date} | Incident: {selectedCase.incidentDate}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold text-center ${
                          selectedCase.mlScore >= 85
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                        }`}>
                          ML Score: {selectedCase.mlScore}/100
                        </span>
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold text-center ${
                          selectedCase.tamperCheck === 'Pass'
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                            : 'bg-red-100 text-red-700 border-2 border-red-300'
                        }`}>
                          {selectedCase.tamperCheck === 'Pass' ? '✓ Tamper Check' : '⚠ Tamper Alert'}
                        </span>
                      </div>
                    </div>

                    {/* Victim & Case Details Grid */}
                    <div className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Victim Name</p>
                        <p className="font-bold text-gray-900">{selectedCase.victimName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Age / Gender</p>
                        <p className="font-bold text-gray-900">{selectedCase.victimAge} / {selectedCase.victimGender}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Caste Category</p>
                        <p className="font-bold text-gray-900">{selectedCase.caste}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Police Station</p>
                        <p className="font-bold text-gray-900">{selectedCase.ps}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Section Applied</p>
                        <p className="font-bold text-gray-900 text-sm">{selectedCase.section}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">Accused</p>
                        <p className="font-bold text-gray-900 text-sm">{selectedCase.accusedName}</p>
                      </div>
                    </div>
                  </div>

                  {/* OCR Extracted FIR Data */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <span>OCR Extracted FIR Data</span>
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                        Confidence: {selectedCase.ocrConfidence}%
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-gray-200 rounded-xl p-5 bg-gray-50">
                        <p className="text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                          <Layers className="w-5 h-5 text-blue-600" />
                          <span>Incident Description (Auto-Extracted)</span>
                        </p>
                        <p className="text-gray-900 leading-relaxed">{selectedCase.details}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">FIR Number</p>
                          <p className="text-gray-900 font-mono text-lg">{selectedCase.extractedText.firNumber}</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-sm font-bold text-gray-700 mb-2">Registration Date & Time</p>
                          <p className="text-gray-900">{selectedCase.extractedText.date}</p>
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                        <p className="text-sm font-bold text-gray-700 mb-2">Police Station</p>
                        <p className="text-gray-900">{selectedCase.extractedText.policeStation}</p>
                      </div>

                      <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                        <p className="text-sm font-bold text-blue-800 mb-3 flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5" />
                          <span>Victim Statement (OCR Extracted)</span>
                        </p>
                        <p className="text-blue-900 leading-relaxed italic">
                          "{selectedCase.extractedText.victimStatement}"
                        </p>
                      </div>

                      {selectedCase.anomalies && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-5">
                          <p className="text-sm font-bold text-orange-900 mb-4 flex items-center space-x-2">
                            <AlertTriangle className="w-6 h-6" />
                            <span>ML Detected Anomalies & Inconsistencies</span>
                          </p>
                          <ul className="space-y-3">
                            {selectedCase.anomalies.map((anomaly, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className="bg-orange-200 text-orange-800 font-bold px-2 py-1 rounded text-xs mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-orange-800 font-medium flex-1">{anomaly}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Preview Section */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center space-x-2">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FileCheck className="w-6 h-6 text-purple-600" />
                      </div>
                      <span>Uploaded Documents</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedCase.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{doc}</p>
                              <p className="text-sm text-gray-500">PDF Document • 2.4 MB</p>
                            </div>
                          </div>
                          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center space-x-2 shadow-sm">
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        </div>
                      ))}

                      {selectedCase.missingDocs && (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-5 mt-4">
                          <p className="text-sm font-bold text-red-900 mb-3 flex items-center space-x-2">
                            <AlertIcon className="w-5 h-5" />
                            <span>Missing Required Documents</span>
                          </p>
                          <ul className="space-y-2">
                            {selectedCase.missingDocs.map((doc, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-red-700 font-medium">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Provenance & Metadata */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center space-x-2">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <Hash className="w-6 h-6 text-indigo-600" />
                      </div>
                      <span>Document Provenance & Metadata</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-2 uppercase font-bold">Document Hash (SHA-256)</p>
                        <p className="text-xs font-mono text-gray-900 break-all bg-white p-3 rounded border border-gray-200">
                          {selectedCase.metadata.documentHash}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-2 uppercase font-bold">Upload Time</p>
                          <p className="text-sm font-bold text-gray-900">{selectedCase.metadata.uploadTime}</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-2 uppercase font-bold">File Size</p>
                          <p className="text-sm font-bold text-gray-900">{selectedCase.metadata.fileSize}</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-2 uppercase font-bold">Total Pages</p>
                          <p className="text-sm font-bold text-gray-900">{selectedCase.metadata.pages} pages</p>
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-xl p-5 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-3 uppercase font-bold">Tamper Detection Result</p>
                        <div className="flex items-start space-x-3">
                          {selectedCase.tamperCheck === 'Pass' ? (
                            <>
                              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                              <div>
                                <p className="font-bold text-green-700 mb-1">No Tampering Detected</p>
                                <p className="text-sm text-green-600">Document integrity has been verified. Hash matches original submission.</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                              <div>
                                <p className="font-bold text-orange-700 mb-1">Potential Modifications Detected</p>
                                <p className="text-sm text-orange-600">Document shows signs of modification. Manual verification required.</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-2 uppercase font-bold">OCR Processing Details</p>
                        <p className="text-sm text-gray-900">
                          Successfully extracted 847 words with {selectedCase.ocrConfidence}% average confidence across {selectedCase.metadata.pages} pages
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - Actions & Integration */}
                <div className="space-y-6">
                  {/* Action Panel */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Actions</h3>
                    
                    {selectedCase.mlScore >= 85 ? (
                      <div className="space-y-3">
                        <button 
                          onClick={() => handleAction('verify', selectedCase.id)}
                          className="w-full px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-bold flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Confirm & Verify FIR</span>
                        </button>
                        <button className="w-full px-5 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold flex items-center justify-center space-x-2">
                          <Edit className="w-5 h-5" />
                          <span>Edit Extracted Details</span>
                        </button>
                        <button 
                          onClick={() => setShowCommentBox(!showCommentBox)}
                          className="w-full px-5 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold flex items-center justify-center space-x-2"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Add Comments</span>
                        </button>
                        
                        {showCommentBox && (
                          <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Enter your comments for audit trail..."
                              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={handleAddComment}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => {
                                  setShowCommentBox(false);
                                  setComment('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button 
                          onClick={() => handleAction('approve', selectedCase.id)}
                          className="w-full px-5 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Approve Case</span>
                        </button>
                        <button 
                          onClick={() => handleAction('request-docs', selectedCase.id)}
                          className="w-full px-5 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold flex items-center justify-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>Request Documents</span>
                        </button>
                        <button className="w-full px-5 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold flex items-center justify-center space-x-2">
                          <X className="w-5 h-5" />
                          <span>Reject Case</span>
                        </button>
                        <button 
                          onClick={() => setShowCommentBox(!showCommentBox)}
                          className="w-full px-5 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold flex items-center justify-center space-x-2"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Add Comments</span>
                        </button>

                        {showCommentBox && (
                          <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Enter your comments for audit trail..."
                              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={handleAddComment}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => {
                                  setShowCommentBox(false);
                                  setComment('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t-2 border-gray-200">
                      <p className="text-xs text-gray-500 mb-3 uppercase font-bold">Quick Actions</p>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          View Similar Cases
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          Check Victim History
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          Download Case Report
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Integration with Tahsildar / Collector */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Integration Status</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="bg-blue-200 p-2 rounded-lg mt-1">
                          <ExternalLink className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900">Tahsildar Verification</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Caste certificate verification request sent automatically
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full">
                            Pending Response
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="bg-green-200 p-2 rounded-lg mt-1">
                          <CheckCircle className="w-5 h-5 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-green-900">CCTNS Integration</p>
                          <p className="text-xs text-green-700 mt-1">
                            FIR verified in Crime and Criminal Tracking Network
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                            ✓ Verified
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
                            Awaiting FIR verification completion before submission
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                            Not Started
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
                          <p className="text-sm font-bold text-gray-900">Case Assigned</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Assigned to SHO Ramesh Kumar (POL001)
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">2024-10-08 14:35:22</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
                        <div className="bg-green-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">ML Analysis Complete</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Authenticity score: {selectedCase.mlScore}/100
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">2024-10-08 14:33:45</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
                        <div className="bg-purple-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Document Hash Generated</p>
                          <p className="text-xs text-gray-600 mt-1">
                            SHA-256 hash created for tamper detection
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">2024-10-08 14:32:30</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-full mt-1">
                          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Case Submitted</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Submitted by victim via mobile application
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">2024-10-08 14:32:15</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MIS Report Generation */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-purple-200 p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Generate MIS Report</span>
                    </h3>
                    <p className="text-sm text-purple-700 mb-4">
                      Real-time reports with verified vs pending cases, fast-track efficiency, and anomalies flagged
                    </p>
                    <button className="w-full px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-bold flex items-center justify-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Generate Report</span>
                    </button>
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