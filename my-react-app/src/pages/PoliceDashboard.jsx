import React, { useState, useEffect } from 'react';
import myLogo from '../assets/my-logo.png';
import { Shield, Bell, Settings, LogOut, Menu, X, FileText, CheckCircle, AlertTriangle, Clock, Search, Filter, Download, TrendingUp, Users, Activity, Eye, Edit, MessageSquare, Send, ExternalLink, ArrowRight, Home, BarChart3, ChevronRight, AlertCircle as AlertIcon, Hash, FileCheck, Layers, Moon, Sun, Loader, Globe, User, Mail, Phone, MapPin, Calendar, Badge, Award, Shield as ShieldIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PoliceDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('fast-track');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en', 'ta', 'hi'
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'all-cases', 'reports', 'audit-logs', 'profile'
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
      id: 'FIR2024005',
      date: '2024-10-09',
      incidentDate: '2024-10-06',
      ps: 'Coimbatore North PS',
      victimName: 'Anita Ramesh',
      victimAge: 33,
      victimGender: 'Female',
      caste: 'SC',
      mlScore: 95,
      status: 'pending',
      type: 'Physical Assault',
      section: 'Section 3(1)(x) of SC/ST Act',
      details: 'Victim attacked on her way home by neighbors who verbally abused and physically assaulted her due to caste identity. Incident witnessed by local shopkeepers.',
      accusedName: 'Neighboring Youths',
      documents: ['FIR Copy', 'Medical Report', 'Witness Statement', 'Photo Evidence'],
      tamperCheck: 'Pass',
      ocrConfidence: 96,
      extractedText: {
        firNumber: 'FIR2024005',
        policeStation: 'Coimbatore North PS',
        date: '2024-10-09 08:45 AM',
        victimStatement: 'I was attacked by a group of youths while returning home. They insulted me and physically assaulted me. Several people saw the incident.'
      },
      metadata: {
        documentHash: 'e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7',
        uploadTime: '2024-10-09 10:12:45 IST',
        fileSize: '2.6 MB',
        pages: 5
      }
    },
    {
      id: 'FIR2024006',
      date: '2024-10-09',
      incidentDate: '2024-10-07',
      ps: 'Erode PS',
      victimName: 'Rajeshwari Devi',
      victimAge: 38,
      victimGender: 'Female',
      caste: 'ST',
      mlScore: 89,
      status: 'pending',
      type: 'Denial of Service',
      section: 'Section 3(1)(r) of SC/ST Act',
      details: 'Victim denied access to village market and community water sources due to tribal identity. Locals threatened her when she attempted to enter.',
      accusedName: 'Local Market Committee',
      documents: ['FIR Copy', 'Photo Evidence', 'Video Recording'],
      tamperCheck: 'Pass',
      ocrConfidence: 92,
      extractedText: {
        firNumber: 'FIR2024006',
        policeStation: 'Erode PS',
        date: '2024-10-09 01:20 PM',
        victimStatement: 'I was not allowed to access the market and water facility. The accused warned me to stay away from public areas.'
      },
      metadata: {
        documentHash: 'f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1',
        uploadTime: '2024-10-09 14:30:10 IST',
        fileSize: '3.0 MB',
        pages: 4
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
    },
    {
      id: 'FIR2024007',
      date: '2024-10-08',
      incidentDate: '2024-10-03',
      ps: 'Udumalpet PS',
      victimName: 'Karthik Suresh',
      victimAge: 45,
      victimGender: 'Male',
      caste: 'SC',
      mlScore: 63,
      status: 'review',
      type: 'Property Damage',
      section: 'Section 3(1)(xi) of SC/ST Act',
      details: 'Agricultural property destroyed by neighbors due to caste-based dispute. Fencing damaged and crops destroyed.',
      accusedName: 'Neighboring Landlord',
      documents: ['FIR Copy (Incomplete)', 'Photo Evidence', 'Property Papers'],
      tamperCheck: 'Warning',
      ocrConfidence: 70,
      anomalies: [
        'Missing victim signature on FIR',
        'Inconsistent incident date in complaint and photos',
        'Partial extraction of victim statement'
      ],
      missingDocs: ['Medical Certificate', 'Witness Statements', 'Property Valuation Report'],
      extractedText: {
        firNumber: 'FIR2024007',
        policeStation: 'Udumalpet PS',
        date: '2024-10-08 11:00 AM',
        victimStatement: '[Partial] My farm and house fencing were damaged by neighbors due to caste issues...'
      },
      metadata: {
        documentHash: 'g9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2',
        uploadTime: '2024-10-08 12:20:30 IST',
        fileSize: '2.0 MB',
        pages: 6
      }
    },
    {
      id: 'FIR2024008',
      date: '2024-10-07',
      incidentDate: '2024-10-01',
      ps: 'Karur PS',
      victimName: 'Meena Lakshmi',
      victimAge: 31,
      victimGender: 'Female',
      caste: 'ST',
      mlScore: 59,
      status: 'review',
      type: 'Verbal Abuse & Threats',
      section: 'Section 3(1)(s) of SC/ST Act',
      details: 'Victim verbally abused with casteist slurs in public by shopkeepers. Threatened with physical harm if she reported incident.',
      accusedName: 'Local Shopkeepers',
      documents: ['FIR Copy', 'Photo Evidence'],
      tamperCheck: 'Pass',
      ocrConfidence: 60,
      anomalies: [
        'Low-quality scan of FIR (60% confidence)',
        'Missing signature and timestamp',
        'Victim statement partially missing'
      ],
      missingDocs: ['Audio/Video Evidence', 'Medical Report', 'Witness Statements'],
      extractedText: {
        firNumber: 'FIR2024008',
        policeStation: 'Karur PS',
        date: '2024-10-07 09:40 AM',
        victimStatement: '[Low confidence] I was verbally threatened and abused by the shopkeepers...'
      },
      metadata: {
        documentHash: 'h0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3',
        uploadTime: '2024-10-07 10:50:12 IST',
        fileSize: '1.5 MB',
        pages: 4
      }
    }
  ];

  // Mock data for All Cases page
  const allCases = [
    ...fastTrackCases,
    ...manualReviewCases,
    {
      id: 'FIR2024009',
      date: '2024-10-10',
      incidentDate: '2024-10-08',
      ps: 'Coimbatore Central PS',
      victimName: 'Priya Senthil',
      victimAge: 28,
      victimGender: 'Female',
      caste: 'SC',
      mlScore: 78,
      status: 'approved',
      type: 'Verbal Harassment',
      section: 'Section 3(1)(x) of SC/ST Act',
      details: 'Victim subjected to casteist remarks at workplace by colleagues.',
      accusedName: 'Office Colleagues',
      documents: ['FIR Copy', 'Witness Statement'],
      tamperCheck: 'Pass',
      ocrConfidence: 85,
      extractedText: {
        firNumber: 'FIR2024009',
        policeStation: 'Coimbatore Central PS',
        date: '2024-10-10 09:30 AM',
        victimStatement: 'I was harassed with casteist comments at my workplace by my colleagues.'
      },
      metadata: {
        documentHash: 'i1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1',
        uploadTime: '2024-10-10 11:15:20 IST',
        fileSize: '1.9 MB',
        pages: 4
      }
    },
    {
      id: 'FIR2024010',
      date: '2024-10-11',
      incidentDate: '2024-10-09',
      ps: 'Salem South PS',
      victimName: 'Arun Velu',
      victimAge: 32,
      victimGender: 'Male',
      caste: 'ST',
      mlScore: 82,
      status: 'rejected',
      type: 'Property Dispute',
      section: 'Section 3(1)(xi) of SC/ST Act',
      details: 'Land dispute with neighbors leading to caste-based arguments.',
      accusedName: 'Neighbors',
      documents: ['FIR Copy', 'Land Documents'],
      tamperCheck: 'Pass',
      ocrConfidence: 88,
      extractedText: {
        firNumber: 'FIR2024010',
        policeStation: 'Salem South PS',
        date: '2024-10-11 02:45 PM',
        victimStatement: 'My neighbors are disputing my land ownership with caste-based arguments.'
      },
      metadata: {
        documentHash: 'j2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2',
        uploadTime: '2024-10-11 15:20:10 IST',
        fileSize: '2.2 MB',
        pages: 5
      }
    },
    {
      id: 'FIR2024011',
      date: '2024-10-12',
      incidentDate: '2024-10-10',
      ps: 'Madurai North PS',
      victimName: 'Geetha Rani',
      victimAge: 45,
      victimGender: 'Female',
      caste: 'SC',
      mlScore: 91,
      status: 'approved',
      type: 'Social Exclusion',
      section: 'Section 3(1)(r) of SC/ST Act',
      details: 'Victim excluded from community events and religious ceremonies.',
      accusedName: 'Community Leaders',
      documents: ['FIR Copy', 'Community Letters', 'Photo Evidence'],
      tamperCheck: 'Pass',
      ocrConfidence: 94,
      extractedText: {
        firNumber: 'FIR2024011',
        policeStation: 'Madurai North PS',
        date: '2024-10-12 10:15 AM',
        victimStatement: 'I have been excluded from all community events and religious ceremonies due to my caste.'
      },
      metadata: {
        documentHash: 'k3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3',
        uploadTime: '2024-10-12 12:30:45 IST',
        fileSize: '3.5 MB',
        pages: 7
      }
    }
  ];

  // Mock data for Audit Logs
  const auditLogs = [
    {
      id: 'AUD001',
      timestamp: '2024-10-15 14:30:22',
      user: 'POL001 (SI Rajesh Kumar)',
      action: 'Case Verified',
      caseId: 'FIR2024001',
      description: 'FIR verified and forwarded to Tahsildar for caste certificate verification',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 'AUD002',
      timestamp: '2024-10-15 14:25:15',
      user: 'POL002 (ASI Meena Sharma)',
      action: 'Document Upload',
      caseId: 'FIR2024005',
      description: 'Uploaded additional witness statements and medical reports',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: 'AUD003',
      timestamp: '2024-10-15 14:20:30',
      user: 'SYSTEM',
      action: 'ML Analysis Complete',
      caseId: 'FIR2024006',
      description: 'Machine learning analysis completed with 89% confidence score',
      ipAddress: 'SYSTEM',
      status: 'success'
    },
    {
      id: 'AUD004',
      timestamp: '2024-10-15 14:15:45',
      user: 'POL003 (HC Suresh Babu)',
      action: 'Case Rejected',
      caseId: 'FIR2024003',
      description: 'Case rejected due to insufficient evidence and document inconsistencies',
      ipAddress: '192.168.1.102',
      status: 'warning'
    },
    {
      id: 'AUD005',
      timestamp: '2024-10-15 14:10:20',
      user: 'POL001 (SI Rajesh Kumar)',
      action: 'Comment Added',
      caseId: 'FIR2024002',
      description: 'Added internal notes regarding witness verification status',
      ipAddress: '192.168.1.100',
      status: 'info'
    },
    {
      id: 'AUD006',
      timestamp: '2024-10-15 14:05:10',
      user: 'SYSTEM',
      action: 'Tamper Detection',
      caseId: 'FIR2024007',
      description: 'Document integrity check passed - SHA-256 verified',
      ipAddress: 'SYSTEM',
      status: 'success'
    },
    {
      id: 'AUD007',
      timestamp: '2024-10-15 14:00:05',
      user: 'POL002 (ASI Meena Sharma)',
      action: 'Report Generated',
      caseId: 'ALL',
      description: 'Generated monthly MIS report for October 2024',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: 'AUD008',
      timestamp: '2024-10-15 13:55:30',
      user: 'SYSTEM',
      action: 'Backup Completed',
      caseId: 'SYSTEM',
      description: 'Automatic database backup completed successfully',
      ipAddress: 'SYSTEM',
      status: 'success'
    }
  ];

  // Police Profile Data
  const policeProfile = {
    id: 'POL001',
    name: 'Rajesh Kumar',
    rank: 'Sub-Inspector of Police',
    badgeNumber: 'TN39B2021001',
    station: 'Tiruppur North Police Station',
    district: 'Tiruppur',
    state: 'Tamil Nadu',
    email: 'rajesh.kumar@tnpolice.gov.in',
    phone: '+91 9876543210',
    joiningDate: '2021-06-15',
    experience: '3 years 4 months',
    casesHandled: 245,
    successRate: '94.2%',
    specialization: 'SC/ST Act Cases',
    awards: [
      'Best Officer Award 2023',
      'Community Service Excellence 2022'
    ],
    training: [
      'Advanced SC/ST Act Training (2023)',
      'Cyber Crime Investigation (2022)',
      'Forensic Evidence Collection (2021)'
    ],
    recentActivity: [
      'Verified FIR2024001 - Physical Assault Case',
      'Approved FIR2024009 - Verbal Harassment',
      'Submitted Monthly Report - October 2024',
      'Trained New Recruits on DBT Portal'
    ]
  };

  // Language options
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  // Add useEffect for loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedCase(null);
    setShowProfileMenu(false);
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
    // In real app, you would update all text content based on selected language
    console.log(`Language changed to: ${langCode}`);
  };
const navigate = useNavigate();

const handleLogout = () => {
  if (window.confirm('Are you sure you want to logout?')) {
    alert('Logging out... Redirecting to login page.');
    navigate('/Login');
    // In real app, you would also clear authentication tokens here
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();
  }
};

  // Loading Component
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const CaseCard = ({ caseItem }) => (
    <div
      onClick={() => setSelectedCase(caseItem)}
      className={`rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.id}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.ps}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            caseItem.mlScore >= 85
              ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              : isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'
          }`}>
            ML: {caseItem.mlScore}%
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            caseItem.tamperCheck === 'Pass'
              ? isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              : isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
          }`}>
            {caseItem.tamperCheck === 'Pass' ? '✓ Verified' : '⚠ Warning'}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Victim:</span>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.victimName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Category:</span>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.caste}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Type:</span>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.type}</span>
        </div>
      </div>

      {caseItem.anomalies && (
        <div className={`border-l-4 p-3 mb-3 text-xs ${
          isDarkMode ? 'bg-orange-900 border-orange-600' : 'bg-orange-50 border-orange-400'
        }`}>
          <p className={`font-bold ${isDarkMode ? 'text-orange-300' : 'text-orange-800'} mb-1`}>🚨 {caseItem.anomalies.length} Anomalies</p>
        </div>
      )}

      <div className={`flex items-center justify-between pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>📅 {caseItem.date}</span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>Review</span>
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className={`rounded-lg shadow p-6 border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-600 p-3 rounded">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs uppercase font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Fast-Track</span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{fastTrackCases.length}</p>
          <p className={`text-sm mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Ready for Quick Verification</p>
          <p className="text-xs text-green-600 font-semibold">+55% than last week</p>
        </div>

        <div className={`rounded-lg shadow p-6 border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-600 p-3 rounded">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs uppercase font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Manual</span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{manualReviewCases.length}</p>
          <p className={`text-sm mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Requires Manual Review</p>
          <p className="text-xs text-red-600 font-semibold">-2% than yesterday</p>
        </div>

        <div className={`rounded-lg shadow p-6 border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600 p-3 rounded">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs uppercase font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Today</span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>12</p>
          <p className={`text-sm mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Cases Verified</p>
          <p className="text-xs text-green-600 font-semibold">+5% than yesterday</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-teal-500 rounded flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>EFFICIENCY</span>
          </div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>94%</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Process Completion</p>
          <p className="text-sm text-green-600 font-medium">+12% automation</p>
        </div>
      </div>

      {/* Queue Tabs */}
      <div className={`rounded-lg shadow border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex">
            <button
              onClick={() => setActiveTab('fast-track')}
              className={`flex-1 py-4 px-4 font-semibold text-sm ${
                activeTab === 'fast-track'
                  ? isDarkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-700 border-b-2 border-green-700'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Fast-Track Queue ({fastTrackCases.length})
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-4 px-4 font-semibold text-sm ${
                activeTab === 'manual'
                  ? isDarkMode ? 'text-orange-400 border-b-2 border-orange-400' : 'text-orange-700 border-b-2 border-orange-700'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manual Review ({manualReviewCases.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`p-6 border-b ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search by FIR number, victim name, or police station..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            <button className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}>
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <button className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}>
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(activeTab === 'fast-track' ? fastTrackCases : manualReviewCases).map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderAllCases = () => (
    <div className={`rounded-lg shadow border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            All Cases ({allCases.length})
          </h2>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search cases..."
                className={`pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            <button className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}>
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Cases Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>FIR Number</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Victim</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Police Station</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ML Score</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCases.map((caseItem) => (
                <tr key={caseItem.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseItem.victimName}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{caseItem.caste}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{caseItem.ps}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      caseItem.mlScore >= 85
                        ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                        : isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {caseItem.mlScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      caseItem.status === 'approved' 
                        ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                        : caseItem.status === 'rejected'
                        ? isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
                        : isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {caseItem.status?.charAt(0).toUpperCase() + caseItem.status?.slice(1) || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{caseItem.date}</p>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => setSelectedCase(caseItem)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className={`rounded-lg shadow border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Reports & Analytics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Summary</h3>
            <div className="space-y-2">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Cases: <span className="font-semibold">156</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Verified: <span className="font-semibold text-green-600">128</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending: <span className="font-semibold text-orange-600">28</span></p>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Performance Metrics</h3>
            <div className="space-y-2">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Average Processing Time: <span className="font-semibold">2.3 days</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Automation Rate: <span className="font-semibold text-green-600">78%</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Accuracy: <span className="font-semibold text-blue-600">94%</span></p>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>District-wise</h3>
            <div className="space-y-2">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tiruppur: <span className="font-semibold">45 cases</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Coimbatore: <span className="font-semibold">38 cases</span></p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Erode: <span className="font-semibold">32 cases</span></p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Generate Reports</h3>
          <div className="flex space-x-4">
            <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2`}>
              <Download className="w-4 h-4" />
              <span>Monthly Report</span>
            </button>
            <button className={`px-4 py-2 border rounded flex items-center space-x-2 ${
              isDarkMode 
                ? 'border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}>
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button className={`px-4 py-2 border rounded flex items-center space-x-2 ${
              isDarkMode 
                ? 'border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}>
              <FileText className="w-4 h-4" />
              <span>Case Summary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className={`rounded-lg shadow border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Audit Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Timestamp</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>User</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Action</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Case ID</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>IP Address</th>
                <th className={`text-left py-3 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <td className="py-3 px-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{log.timestamp}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{log.user}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{log.action}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{log.caseId}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{log.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{log.ipAddress}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      log.status === 'success'
                        ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                        : log.status === 'warning'
                        ? isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'
                        : isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`rounded-lg shadow border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {policeProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.name}
                  </h1>
                  <p className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>
                    {policeProfile.rank}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    {policeProfile.station}, {policeProfile.district}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Badge Number</p>
                  <p className={`font-mono font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.badgeNumber}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className={`p-3 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cases Handled</p>
                  <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.casesHandled}
                  </p>
                </div>
                <div className={`p-3 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Success Rate</p>
                  <p className={`text-xl font-bold text-green-600`}>
                    {policeProfile.successRate}
                  </p>
                </div>
                <div className={`p-3 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Experience</p>
                  <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.experience}
                  </p>
                </div>
                <div className={`p-3 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specialization</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.specialization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className={`rounded-lg shadow border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Personal Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{policeProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{policeProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Station</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{policeProfile.station}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joining Date</p>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{policeProfile.joiningDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className={`rounded-lg shadow border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Awards & Recognition
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {policeProfile.awards.map((award, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Award className={`w-5 h-5 text-yellow-500`} />
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training & Certifications */}
        <div className={`rounded-lg shadow border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Training & Certifications
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {policeProfile.training.map((training, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <ShieldIcon className={`w-5 h-5 text-green-500`} />
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{training}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-lg shadow border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {policeProfile.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 
                    'bg-purple-500'
                  }`}></div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedCase) {
      return (
        <div>
          <button
            onClick={() => setSelectedCase(null)}
            className={`mb-6 px-4 py-2 border rounded-lg flex items-center space-x-2 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="text-sm font-medium">Back to {currentPage === 'dashboard' ? 'Queue' : currentPage}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Case Header */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-bold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.id}</h2>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{selectedCase.type}</p>
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Filed: {selectedCase.date} | Incident: {selectedCase.incidentDate}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      selectedCase.mlScore >= 85
                        ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                        : isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'
                    }`}>
                      ML: {selectedCase.mlScore}%
                    </span>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      selectedCase.tamperCheck === 'Pass'
                        ? isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCase.tamperCheck === 'Pass' ? '✓ Verified' : '⚠ Warning'}
                    </span>
                  </div>
                </div>

                {/* Case Details Grid */}
                <div className={`grid grid-cols-3 gap-4 p-4 rounded ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Victim Name</p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.victimName}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Age / Gender</p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.victimAge} / {selectedCase.victimGender}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Caste</p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.caste}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Police Station</p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.ps}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Section</p>
                    <p className={`font-semibold text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.section}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Accused</p>
                    <p className={`font-semibold text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedCase.accusedName}</p>
                  </div>
                </div>
              </div>

              {/* OCR Data */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>OCR Extracted FIR Data</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedCase.ocrConfidence}% Confidence
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <p className={`text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Incident Description</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>{selectedCase.details}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>FIR Number</p>
                      <p className={`font-mono ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{selectedCase.extractedText.firNumber}</p>
                    </div>
                    <div className={`p-3 rounded ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Date & Time</p>
                      <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{selectedCase.extractedText.date}</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded border-l-4 ${
                    isDarkMode ? 'bg-blue-900 border-blue-600' : 'bg-blue-50 border-blue-500'
                  }`}>
                    <p className={`text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-900'
                    }`}>Victim Statement</p>
                    <p className={`text-sm italic ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-900'
                    }`}>"{selectedCase.extractedText.victimStatement}"</p>
                  </div>

                  {selectedCase.anomalies && (
                    <div className={`p-4 rounded border-l-4 ${
                      isDarkMode ? 'bg-orange-900 border-orange-600' : 'bg-orange-50 border-orange-500'
                    }`}>
                      <p className={`text-sm font-semibold mb-3 ${
                        isDarkMode ? 'text-orange-300' : 'text-orange-900'
                      }`}>ML Detected Anomalies</p>
                      <ul className="space-y-2">
                        {selectedCase.anomalies.map((anomaly, idx) => (
                          <li key={idx} className={`flex items-start space-x-2 text-sm ${
                            isDarkMode ? 'text-orange-300' : 'text-orange-800'
                          }`}>
                            <span className="font-bold">{idx + 1}.</span>
                            <span>{anomaly}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Uploaded Documents</h3>
                <div className="space-y-3">
                  {selectedCase.documents.map((doc, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 border rounded hover:bg-gray-50 ${
                      isDarkMode 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{doc}</p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>PDF • 2.4 MB</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  ))}

                  {selectedCase.missingDocs && (
                    <div className={`p-4 rounded border-l-4 ${
                      isDarkMode ? 'bg-red-900 border-red-600' : 'bg-red-50 border-red-500'
                    }`}>
                      <p className={`text-sm font-semibold mb-2 ${
                        isDarkMode ? 'text-red-300' : 'text-red-900'
                      }`}>Missing Documents</p>
                      <ul className="space-y-1">
                        {selectedCase.missingDocs.map((doc, idx) => (
                          <li key={idx} className={`text-sm ${
                            isDarkMode ? 'text-red-300' : 'text-red-700'
                          }`}>• {doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Document Provenance</h3>
                
                <div className="space-y-3">
                  <div className={`p-3 rounded ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <p className={`text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Document Hash (SHA-256)</p>
                    <p className={`text-xs font-mono break-all ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>{selectedCase.metadata.documentHash}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`p-3 rounded ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Upload Time</p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{selectedCase.metadata.uploadTime}</p>
                    </div>
                    <div className={`p-3 rounded ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>File Size</p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{selectedCase.metadata.fileSize}</p>
                    </div>
                    <div className={`p-3 rounded ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Pages</p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{selectedCase.metadata.pages}</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <p className={`text-xs mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Tamper Detection</p>
                    <div className="flex items-center space-x-2">
                      {selectedCase.tamperCheck === 'Pass' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-green-400' : 'text-green-700'
                          }`}>No tampering detected</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-orange-400' : 'text-orange-700'
                          }`}>Manual verification required</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Actions Card */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Actions</h3>
                
                {selectedCase.mlScore >= 85 ? (
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleAction('verify', selectedCase.id)}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Verify FIR</span>
                    </button>
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit Details</span>
                    </button>
                    <button 
                      onClick={() => setShowCommentBox(!showCommentBox)}
                      className={`w-full px-4 py-3 border rounded font-medium text-sm flex items-center justify-center space-x-2 ${
                        isDarkMode 
                          ? 'border-gray-600 text-white hover:bg-gray-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Add Comment</span>
                    </button>
                    
                    {showCommentBox && (
                      <div className={`p-3 rounded border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Enter comments..."
                          className={`w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'border-gray-300'
                          }`}
                          rows={3}
                        />
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={handleAddComment}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => {
                              setShowCommentBox(false);
                              setComment('');
                            }}
                            className={`px-3 py-2 border rounded text-sm font-medium ${
                              isDarkMode 
                                ? 'border-gray-600 text-white hover:bg-gray-600' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
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
                      className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction('request-docs', selectedCase.id)}
                      className="w-full px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 font-medium text-sm"
                    >
                      Request Documents
                    </button>
                    <button className="w-full px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium text-sm">
                      Reject
                    </button>
                    <button 
                      onClick={() => setShowCommentBox(!showCommentBox)}
                      className={`w-full px-4 py-3 border rounded font-medium text-sm ${
                        isDarkMode 
                          ? 'border-gray-600 text-white hover:bg-gray-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Add Comment
                    </button>

                    {showCommentBox && (
                      <div className={`p-3 rounded border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Enter comments..."
                          className={`w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'border-gray-300'
                          }`}
                          rows={3}
                        />
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={handleAddComment}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => {
                              setShowCommentBox(false);
                              setComment('');
                            }}
                            className={`px-3 py-2 border rounded text-sm font-medium ${
                              isDarkMode 
                                ? 'border-gray-600 text-white hover:bg-gray-600' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Integration Status */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Integration Status</h3>
                
                <div className="space-y-3">
                  <div className={`p-3 rounded border ${
                    isDarkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      isDarkMode ? 'text-yellow-300' : 'text-yellow-900'
                    }`}>Tahsildar</p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
                    }`}>Pending verification</p>
                  </div>

                  <div className={`p-3 rounded border ${
                    isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      isDarkMode ? 'text-green-300' : 'text-green-900'
                    }`}>CCTNS</p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-green-400' : 'text-green-700'
                    }`}>✓ Verified</p>
                  </div>

                  <div className={`p-3 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>Collector</p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Not started</p>
                  </div>
                </div>
              </div>

              {/* Audit Trail */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Audit Trail</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Case Assigned</p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>POL001 • 2024-10-08 14:35:22</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>ML Analysis Complete</p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Score: {selectedCase.mlScore}% • 2024-10-08 14:33:45</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Hash Generated</p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>SHA-256 • 2024-10-08 14:32:30</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Case Submitted</p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Via mobile app • 2024-10-08 14:32:15</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MIS Report */}
              <div className={`rounded-lg shadow p-6 border ${
                isDarkMode ? 'bg-purple-900 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
              }`}>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-900'
                }`}>MIS Report</h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Generate reports with verified cases, efficiency metrics, and anomalies
                </p>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-medium text-sm flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'all-cases':
        return renderAllCases();
      case 'reports':
        return renderReports();
      case 'audit-logs':
        return renderAuditLogs();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={myLogo} alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            {isSidebarOpen && <span className="font-bold text-lg">DBT Portal</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => handleNavigation('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left hover:bg-gray-700 ${
              currentPage === 'dashboard' ? 'bg-gray-800' : ''
            }`}
          >
            <Home className="w-5 h-5" />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => handleNavigation('all-cases')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left hover:bg-gray-700 ${
              currentPage === 'all-cases' ? 'bg-gray-800' : ''
            }`}
          >
            <FileText className="w-5 h-5" />
            {isSidebarOpen && <span>All Cases</span>}
          </button>
          <button 
            onClick={() => handleNavigation('reports')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left hover:bg-gray-700 ${
              currentPage === 'reports' ? 'bg-gray-800' : ''
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            {isSidebarOpen && <span>Reports</span>}
          </button>
          <button 
            onClick={() => handleNavigation('audit-logs')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left hover:bg-gray-700 ${
              currentPage === 'audit-logs' ? 'bg-gray-800' : ''
            }`}
          >
            <Activity className="w-5 h-5" />
            {isSidebarOpen && <span>Audit Logs</span>}
          </button>
        </nav>

        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-800 space-y-3">
            <div className="bg-gray-800 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Verified</span>
                <span className="text-lg font-bold text-green-400">12</span>
              </div>
              <p className="text-xs text-gray-500">+3 from yesterday</p>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Pending</span>
                <span className="text-lg font-bold text-orange-400">8</span>
              </div>
              <p className="text-xs text-gray-500">Review required</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`shadow-sm border-b ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isSidebarOpen ? <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} /> : <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />}
              </button>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentPage === 'dashboard' ? 'Police Dashboard' :
                   currentPage === 'all-cases' ? 'All Cases' :
                   currentPage === 'reports' ? 'Reports & Analytics' :
                   currentPage === 'audit-logs' ? 'Audit Logs' : 
                   currentPage === 'profile' ? 'Police Profile' : 'Police Dashboard'}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tiruppur District</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search"
                  className={`pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300'
                  }`}
                />
              </div>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`p-2 rounded transition-colors duration-200 flex items-center space-x-1 ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                </button>
                
                {/* Language Dropdown */}
                {showLanguageMenu && (
                  <div className={`absolute right-0 top-12 w-48 py-2 rounded-lg shadow-lg border z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center justify-between ${
                          language === lang.code 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-xs opacity-70">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Dark Mode Toggle Button */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button className={`p-2 rounded relative ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className={`p-2 rounded ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Settings className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RK
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {policeProfile.name}
                  </span>
                </button>
                
                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className={`absolute right-0 top-12 w-48 py-2 rounded-lg shadow-lg border z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <button
                      onClick={() => handleNavigation('profile')}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center space-x-2 ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`w-full px-4 py-2 text-left hover:bg-red-600 hover:text-white flex items-center space-x-2 ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}