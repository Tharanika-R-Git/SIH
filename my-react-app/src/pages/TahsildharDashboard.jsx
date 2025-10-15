import React, { useState } from 'react';
import myLogo from '../assets/my-logo.png';
import { Globe } from 'lucide-react';
import { FileText, CheckCircle, XCircle, Clock, Search, Filter, Download, Shield, Bell, Settings, Menu, X, Home, BarChart3, Activity, Eye, AlertTriangle, ExternalLink, ArrowRight, User, MapPin, Calendar, Hash, FileCheck, Layers, Send, MessageSquare, CheckSquare, Moon, Sun, TrendingUp, TrendingDown, Languages, LogOut } from 'lucide-react';

export default function TahsildarDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('fasttrack');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeView, setActiveView] = useState('dashboard');

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
      mlScore: 92,
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
      mlScore: 88,
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
      mlScore: 65,
      documents: [
        { name: 'Caste Certificate', source: 'Uploaded PDF', verified: false },
        { name: 'Aadhaar Card', source: 'Manual Entry', verified: false },
        { name: 'FIR Copy', source: 'Police Portal', verified: true }
      ],
      verificationNotes: 'Caste certificate not available in DigiLocker. Manual verification required. Aadhaar needs verification.',
      issues: ['DigiLocker document not found', 'Aadhaar verification pending']
    },
    {
      id: 'VER2024011',
      requestDate: '2024-10-10 09:15:30',
      firNumber: 'FIR/2024/0456/TRP',
      firDate: '2024-10-09',
      policeStation: 'Tiruppur Town PS',
      victimName: 'Santhosh Kumar',
      victimDOB: '12-08-1991',
      aadhaarNumber: '3456 7890 1234',
      aadhaarVerified: true,
      caste: 'SC',
      subCaste: 'Pallar',
      casteCertificateNumber: 'SC/TRP/2019/03456',
      certificateIssueDate: '15-07-2019',
      issuingAuthority: 'Tahsildar, Tiruppur',
      digiLockerStatus: 'verified',
      revenueVillage: 'Tiruppur Town',
      taluk: 'Tiruppur',
      district: 'Tiruppur',
      requestedBy: 'SHO Manikandan (POL045)',
      status: 'pending',
      autoPopulated: true,
      mlScore: 94,
      documents: [
        { name: 'Caste Certificate', source: 'DigiLocker', verified: true },
        { name: 'Aadhaar Card', source: 'DigiLocker', verified: true },
        { name: 'FIR Copy', source: 'Police Portal', verified: true },
        { name: 'Ration Card', source: 'DigiLocker', verified: true }
      ],
      verificationNotes: 'All documents verified through DigiLocker. Certificate matches revenue records. High confidence score.'
    }
  ];

  // Dummy data for All Cases
  const allCases = [
    ...pendingVerifications,
    {
      id: 'VER2023999',
      requestDate: '2024-10-05 10:15:30',
      firNumber: 'FIR2023999',
      firDate: '2024-10-05',
      policeStation: 'Coimbatore Central PS',
      victimName: 'Mohan Raj',
      status: 'completed',
      caste: 'OBC',
      mlScore: 95
    },
    {
      id: 'VER2023998',
      requestDate: '2024-10-04 14:20:15',
      firNumber: 'FIR2023998',
      firDate: '2024-10-04',
      policeStation: 'Erode West PS',
      victimName: 'Priya Lakshmi',
      status: 'completed',
      caste: 'SC',
      mlScore: 87
    }
  ];

  // Dummy data for Reports
  const reportsData = {
    monthlyStats: [
      { month: 'January', verified: 45, pending: 12, rejected: 3 },
      { month: 'February', verified: 52, pending: 8, rejected: 2 },
      { month: 'March', verified: 48, pending: 15, rejected: 4 },
      { month: 'April', verified: 61, pending: 9, rejected: 1 },
      { month: 'May', verified: 57, pending: 11, rejected: 2 },
      { month: 'June', verified: 65, pending: 7, rejected: 3 }
    ],
    districtWise: [
      { district: 'Tiruppur', verified: 215, pending: 23 },
      { district: 'Coimbatore', verified: 189, pending: 18 },
      { district: 'Erode', verified: 156, pending: 15 },
      { district: 'Salem', verified: 142, pending: 12 }
    ],
    categoryWise: [
      { category: 'SC', count: 312, percentage: 45 },
      { category: 'ST', count: 156, percentage: 22 },
      { category: 'OBC', count: 225, percentage: 33 }
    ]
  };

  // Dummy data for Audit Logs
  const auditLogs = [
    {
      id: 'AUD001',
      timestamp: '2024-10-09 14:30:22',
      user: 'Tahsildar Venkatesh (TAH001)',
      action: 'Case Approved',
      caseId: 'VER2024001',
      details: 'Caste certificate verification approved',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AUD002',
      timestamp: '2024-10-09 13:15:10',
      user: 'Tahsildar Venkatesh (TAH001)',
      action: 'Document Viewed',
      caseId: 'VER2024002',
      details: 'Viewed Aadhaar document',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AUD003',
      timestamp: '2024-10-09 11:45:33',
      user: 'Tahsildar Venkatesh (TAH001)',
      action: 'Case Rejected',
      caseId: 'VER2024003',
      details: 'Rejected due to insufficient documents',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AUD004',
      timestamp: '2024-10-09 10:20:15',
      user: 'Tahsildar Venkatesh (TAH001)',
      action: 'Login',
      caseId: '-',
      details: 'User logged into system',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AUD005',
      timestamp: '2024-10-08 16:55:42',
      user: 'Tahsildar Venkatesh (TAH001)',
      action: 'Report Generated',
      caseId: '-',
      details: 'Monthly verification report downloaded',
      ipAddress: '192.168.1.100'
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

  const handleViewDocument = (document) => {
    alert(`Viewing document: ${document.name}\nSource: ${document.source}\nStatus: ${document.verified ? 'Verified' : 'Pending Verification'}`);
  };

  const handleLogout = () => {
    // Redirect to login page - you can replace this with your actual login page route
    window.location.href = '/login';
  };

  const fastTrackCases = pendingVerifications.filter(v => v.mlScore >= 85);
  const manualReviewCases = pendingVerifications.filter(v => v.mlScore < 85);

  const VerificationCard = ({ verification }) => (
    <div
      onClick={() => setSelectedCase(verification)}
      className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-5 cursor-pointer transition-colors`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{verification.firNumber}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{verification.policeStation}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
            verification.mlScore >= 85 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            ML: {verification.mlScore}%
          </span>
          {verification.digiLockerStatus === 'verified' && (
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Victim:</span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{verification.victimName}</span>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category:</span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{verification.caste}</span>
        </div>
      </div>

      {verification.issues && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded mb-3">
          <p className="text-xs font-bold text-orange-800 mb-1">⚠ Requires Attention</p>
          <ul className="space-y-1">
            {verification.issues.map((issue, idx) => (
              <li key={idx} className="text-xs text-orange-700">• {issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Render different views based on activeView state
  const renderView = () => {
    switch (activeView) {
      case 'all-cases':
        return (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>All Cases</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className="text-left py-3 px-4 font-semibold">Case ID</th>
                    <th className="text-left py-3 px-4 font-semibold">FIR Number</th>
                    <th className="text-left py-3 px-4 font-semibold">Victim Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Police Station</th>
                    <th className="text-left py-3 px-4 font-semibold">Caste</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">ML Score</th>
                  </tr>
                </thead>
                <tbody>
                  {allCases.map((caseItem) => (
                    <tr key={caseItem.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className="py-3 px-4">{caseItem.id}</td>
                      <td className="py-3 px-4">{caseItem.firNumber}</td>
                      <td className="py-3 px-4">{caseItem.victimName}</td>
                      <td className="py-3 px-4">{caseItem.policeStation}</td>
                      <td className="py-3 px-4">{caseItem.caste}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          caseItem.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          caseItem.status === 'pending' ? 'bg-orange-100 text-orange-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{caseItem.mlScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Reports & Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Statistics</h3>
                <div className="space-y-2">
                  {reportsData.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.month}</span>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        ✓{stat.verified} • ⏳{stat.pending} • ✗{stat.rejected}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>District-wise Performance</h3>
                <div className="space-y-3">
                  {reportsData.districtWise.map((district, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{district.district}</span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{district.verified} verified</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(district.verified / (district.verified + district.pending)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Category Distribution</h3>
                <div className="space-y-2">
                  {reportsData.categoryWise.map((category, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{category.category}</span>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {category.count} ({category.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Export Reports</h3>
              <div className="flex space-x-4">
                <button className={`px-4 py-2 rounded border flex items-center space-x-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}>
                  <Download className="w-4 h-4" />
                  <span>Monthly Report</span>
                </button>
                <button className={`px-4 py-2 rounded border flex items-center space-x-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}>
                  <Download className="w-4 h-4" />
                  <span>District-wise Report</span>
                </button>
                <button className={`px-4 py-2 rounded border flex items-center space-x-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}>
                  <Download className="w-4 h-4" />
                  <span>Category Analysis</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'audit-logs':
        return (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Audit Logs</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
                    <th className="text-left py-3 px-4 font-semibold">User</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                    <th className="text-left py-3 px-4 font-semibold">Case ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Details</th>
                    <th className="text-left py-3 px-4 font-semibold">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className="py-3 px-4">{log.timestamp}</td>
                      <td className="py-3 px-4">{log.user}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          log.action.includes('Approved') ? 'bg-green-100 text-green-800' : 
                          log.action.includes('Rejected') ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">{log.caseId}</td>
                      <td className="py-3 px-4">{log.details}</td>
                      <td className="py-3 px-4">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Stats Cards - Removed AVG ML card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>FAST-TRACK</span>
                </div>
                <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{fastTrackCases.length}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Ready for Quick Verification</p>
                <p className="text-sm text-green-600 font-medium">+55% than last week</p>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>MANUAL</span>
                </div>
                <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{manualReviewCases.length}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Requires Manual Review</p>
                <p className="text-sm text-red-600 font-medium">-2% than yesterday</p>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>TODAY</span>
                </div>
                <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>12</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Cases Verified</p>
                <p className="text-sm text-green-600 font-medium">+5% than yesterday</p>
              </div>
            </div>

            {/* Verification Queue */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
              <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex px-1">
                  <button
                    onClick={() => setActiveTab('fasttrack')}
                    className={`flex-1 py-4 px-4 font-semibold text-sm ${
                      activeTab === 'fasttrack' 
                        ? 'text-green-600 border-b-2 border-green-600' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Fast-Track Queue ({fastTrackCases.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 py-4 px-4 font-semibold text-sm ${
                      activeTab === 'manual' 
                        ? 'text-green-600 border-b-2 border-green-600' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Manual Review ({manualReviewCases.length})
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by FIR number, victim name, or police station..."
                      className={`w-full pl-10 pr-4 py-2 border rounded ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-green-500`}
                    />
                  </div>
                  <button className={`px-4 py-2 border rounded flex items-center space-x-2 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}>
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className={`px-4 py-2 border rounded flex items-center space-x-2 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Cases Grid */}
              <div className="p-6">
                {activeTab === 'fasttrack' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {fastTrackCases.map((verification) => (
                      <VerificationCard key={verification.id} verification={verification} />
                    ))}
                  </div>
                )}
                {activeTab === 'manual' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {manualReviewCases.map((verification) => (
                      <VerificationCard key={verification.id} verification={verification} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border-b`}>
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={myLogo} alt="Logo" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>DBT Portal</h1>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tahsildar Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h2 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tiruppur District</h2>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tamil Nadu</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className={`p-2 rounded transition-colors duration-200 flex items-center space-x-1 ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border z-50 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setSelectedLanguage('English');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            selectedLanguage === 'English' 
                              ? 'bg-green-50 text-green-700 font-semibold' 
                              : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLanguage('Tamil');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            selectedLanguage === 'Tamil' 
                              ? 'bg-green-50 text-green-700 font-semibold' 
                              : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          தமிழ் (Tamil)
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLanguage('Hindi');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            selectedLanguage === 'Hindi' 
                              ? 'bg-green-50 text-green-700 font-semibold' 
                              : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          हिंदी (Hindi)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className={`p-2 relative rounded transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded transition-colors duration-200 flex items-center space-x-1 ${
                    isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                  }`}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white transition-all duration-300 overflow-hidden min-h-screen`}>
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-6 px-2">
              
            </div>

            <nav className="space-y-1 mb-6">
              <button 
                onClick={() => setActiveView('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded font-medium text-sm ${
                  activeView === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveView('all-cases')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded font-medium text-sm ${
                  activeView === 'all-cases' ? 'bg-gray-800' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>All Cases</span>
              </button>
              <button 
                onClick={() => setActiveView('reports')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded font-medium text-sm ${
                  activeView === 'reports' ? 'bg-gray-800' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </button>
              <button 
                onClick={() => setActiveView('audit-logs')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded font-medium text-sm ${
                  activeView === 'audit-logs' ? 'bg-gray-800' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Audit Logs</span>
              </button>
            </nav>

            <div className="border-t border-gray-800 pt-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1 px-2">
                    <span className="text-sm text-gray-400">Verified</span>
                    <span className="text-xl font-bold text-green-400">12</span>
                  </div>
                  <p className="text-xs text-gray-500 px-2">+3 from yesterday</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1 px-2">
                    <span className="text-sm text-gray-400">Pending</span>
                    <span className="text-xl font-bold text-orange-400">8</span>
                  </div>
                  <p className="text-xs text-gray-500 px-2">Review required</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {!selectedCase ? (
            renderView()
          ) : (
            /* Detailed Verification View */
            <div>
              <button
                onClick={() => setSelectedCase(null)}
                className={`mb-4 px-4 py-2 rounded border flex items-center space-x-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedCase.id}</h2>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Caste Certificate Verification</p>
                      </div>
                      <div className="flex space-x-2">
                        {selectedCase.digiLockerStatus === 'verified' && (
                          <span className="px-3 py-1 rounded text-sm font-bold bg-green-100 text-green-800">
                            DigiLocker Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Victim Name</p>
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.victimName}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Caste</p>
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.caste} - {selectedCase.subCaste}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>FIR Number</p>
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.firNumber}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Police Station</p>
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.policeStation}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Documents</h3>
                    <div className="space-y-3">
                      {selectedCase.documents.map((doc, idx) => (
                        <div key={idx} className={`p-4 rounded border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} flex items-center justify-between`}>
                          <div className="flex items-center space-x-3">
                            <FileText className={`w-5 h-5 ${doc.verified ? 'text-green-500' : 'text-orange-500'}`} />
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{doc.source}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {doc.verified ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Clock className="w-5 h-5 text-orange-500" />
                            )}
                            <button
                              onClick={() => handleViewDocument(doc)}
                              className={`px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors ${
                                isDarkMode 
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Verification Notes</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedCase.verificationNotes}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 sticky top-24`}>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Actions</h3>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleAction('approve')}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Approve</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowCommentBox(true);
                          setActionType('request-docs');
                        }}
                        className="w-full px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold flex items-center justify-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>Request Documents</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowCommentBox(true);
                          setActionType('reject');
                        }}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-semibold flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Reject</span>
                      </button>

                      {showCommentBox && (
                        <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} mt-3`}>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={
                              actionType === 'reject' 
                                ? "Enter rejection reason..." 
                                : "Specify required documents..."
                            }
                            className={`w-full p-3 rounded border ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
                            rows={3}
                          />
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleAction(actionType)}
                              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => {
                                setShowCommentBox(false);
                                setComment('');
                                setActionType('');
                              }}
                              className={`px-4 py-2 rounded font-semibold ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Info</h3>
                    <div className="space-y-3">
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Certificate Number</p>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.casteCertificateNumber}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Issuing Authority</p>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.issuingAuthority}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue Village</p>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.revenueVillage}</p>
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