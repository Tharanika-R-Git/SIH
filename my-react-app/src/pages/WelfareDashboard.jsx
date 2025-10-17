import React, { useState, useMemo } from 'react';
import { 
  Download, Check, X, Eye, AlertCircle, FileText, DollarSign, Clock, 
  CheckCircle, XCircle, Search, Shield, Activity, Moon, Sun, PieChart, 
  Users, TrendingUp, BarChart3, IndianRupee, MapPin, UserCheck, FileCheck, 
  Globe, LogOut, Home, FolderOpen, Bell, Zap, ChevronLeft, ChevronRight,
  UserPlus, Calculator, AlertTriangle, BookOpen, Scale, TrendingDown, Award,
  Bookmark, Target, Calendar, Filter, FileBarChart, PieChart as PieChartIcon,
  Shield as ShieldIcon, User, Database
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import myLogo from '../assets/my-logo.png'; // Adjust the path according to your file structure
// Enhanced mock data with welfare case information
const initialSanctionPackets = [
  {
    id: 'SP001',
    caseId: 'CASE-2025-001',
    beneficiaryName: 'Rajesh Kumar',
    state: 'Tamil Nadu',
    district: 'Chennai',
    maskedAadhaar: 'XXXX-XXXX-3421',
    bankAccount: 'XXXX-XXXX-7890',
    ifsc: 'SBIN0001234',
    sanctionedAmount: 50000,
    purpose: 'Pension Payment',
    status: 'pending',
    receivedDate: '2025-10-09',
    validationStatus: 'pending',
    utr: null,
    approvedBy: null,
    processedBy: null,
    caseType: 'atrocity',
    firNumber: 'FIR/2025/001',
    casteVerified: true,
    schemeType: 'PoA Relief',
    eligibleAmount: 50000,
    remarks: null
  },
  {
    id: 'SP002',
    caseId: 'CASE-2025-002',
    beneficiaryName: 'Priya Sharma',
    state: 'Karnataka',
    district: 'Bangalore',
    maskedAadhaar: 'XXXX-XXXX-8765',
    bankAccount: 'XXXX-XXXX-4321',
    ifsc: 'HDFC0002345',
    sanctionedAmount: 75000,
    purpose: 'Atrocity Compensation',
    status: 'validated',
    receivedDate: '2025-10-08',
    validationStatus: 'success',
    utr: null,
    approvedBy: 'admin@treasury.gov',
    processedBy: null,
    caseType: 'atrocity',
    firNumber: 'FIR/2025/002',
    casteVerified: true,
    schemeType: 'PCR Scheme',
    eligibleAmount: 75000,
    remarks: 'Approved for immediate disbursement'
  },
  {
    id: 'SP003',
    caseId: 'CASE-2025-003',
    beneficiaryName: 'Amit Patel',
    state: 'Gujarat',
    district: 'Ahmedabad',
    maskedAadhaar: 'XXXX-XXXX-5432',
    bankAccount: 'XXXX-XXXX-9876',
    ifsc: 'ICIC0003456',
    sanctionedAmount: 100000,
    purpose: 'Medical & Rehabilitation',
    status: 'disbursed',
    receivedDate: '2025-10-07',
    validationStatus: 'success',
    utr: 'UTR2025100712345',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-10',
    caseType: 'atrocity',
    firNumber: 'FIR/2025/003',
    casteVerified: true,
    schemeType: 'PoA Relief',
    eligibleAmount: 100000,
    remarks: 'Emergency case - Fast tracked'
  },
  {
    id: 'SP004',
    caseId: 'CASE-2025-004',
    beneficiaryName: 'Sunita Devi',
    state: 'Bihar',
    district: 'Patna',
    maskedAadhaar: 'XXXX-XXXX-6789',
    bankAccount: 'XXXX-XXXX-1111',
    ifsc: 'SBIN0004567',
    sanctionedAmount: 25000,
    purpose: 'Welfare Scheme',
    status: 'failed',
    receivedDate: '2025-10-06',
    validationStatus: 'failed',
    validationError: 'Caste certificate verification pending',
    utr: null,
    approvedBy: null,
    processedBy: null,
    caseType: 'welfare',
    firNumber: null,
    casteVerified: false,
    schemeType: 'General Welfare',
    eligibleAmount: 25000,
    remarks: 'Resubmit with valid caste certificate'
  },
  {
    id: 'SP005',
    caseId: 'CASE-2025-005',
    beneficiaryName: 'Lakshmi Iyer',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    maskedAadhaar: 'XXXX-XXXX-9012',
    bankAccount: 'XXXX-XXXX-2222',
    ifsc: 'HDFC0005678',
    sanctionedAmount: 60000,
    purpose: 'Medical Assistance',
    status: 'disbursed',
    receivedDate: '2025-10-05',
    validationStatus: 'success',
    utr: 'UTR2025100598765',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-09',
    caseType: 'atrocity',
    firNumber: 'FIR/2025/005',
    casteVerified: true,
    schemeType: 'PoA Relief',
    eligibleAmount: 60000,
    remarks: 'Medical emergency case'
  },
  {
    id: 'SP006',
    caseId: 'CASE-2025-006',
    beneficiaryName: 'Mohammed Ali',
    state: 'Karnataka',
    district: 'Mysore',
    maskedAadhaar: 'XXXX-XXXX-3456',
    bankAccount: 'XXXX-XXXX-3333',
    ifsc: 'SBIN0006789',
    sanctionedAmount: 80000,
    purpose: 'Housing & Livelihood',
    status: 'disbursed',
    receivedDate: '2025-10-04',
    validationStatus: 'success',
    utr: 'UTR2025100443210',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-08',
    caseType: 'atrocity',
    firNumber: 'FIR/2025/006',
    casteVerified: true,
    schemeType: 'PCR Scheme',
    eligibleAmount: 80000,
    remarks: 'Property damage case'
  },
  {
    id: 'SP007',
    caseId: 'CASE-2025-007',
    beneficiaryName: 'Deepak Singh',
    state: 'Maharashtra',
    district: 'Mumbai',
    maskedAadhaar: 'XXXX-XXXX-7890',
    bankAccount: 'XXXX-XXXX-4444',
    ifsc: 'ICIC0007890',
    sanctionedAmount: 90000,
    purpose: 'Education & Legal Aid',
    status: 'disbursed',
    receivedDate: '2025-10-03',
    validationStatus: 'success',
    utr: 'UTR2025100356789',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-07',
    caseType: 'atrocity',
    firNumber: 'FIR/2025/007',
    casteVerified: true,
    schemeType: 'PoA Relief',
    eligibleAmount: 90000,
    remarks: 'Legal proceedings ongoing'
  }
];

// Budget and fund allocation data
const budgetData = {
  totalAllocated: 5000000,
  totalUtilized: 555000,
  totalPending: 125000,
  totalRemaining: 4320000,
  monthlyLimit: 500000,
  currentMonthUtilized: 230000
};

// Scheme-wise allocation data
const schemeWiseData = [
  { scheme: 'PoA Relief', allocated: 2000000, utilized: 300000, cases: 4 },
  { scheme: 'PCR Scheme', allocated: 1500000, utilized: 155000, cases: 2 },
  { scheme: 'General Welfare', allocated: 1000000, utilized: 25000, cases: 1 },
  { scheme: 'Emergency Relief', allocated: 500000, utilized: 75000, cases: 0 }
];

// Monthly utilization trend
const monthlyUtilizationData = [
  { month: 'Apr', utilized: 350000, allocated: 500000 },
  { month: 'May', utilized: 420000, allocated: 500000 },
  { month: 'Jun', utilized: 480000, allocated: 500000 },
  { month: 'Jul', utilized: 510000, allocated: 500000 },
  { month: 'Aug', utilized: 390000, allocated: 500000 },
  { month: 'Sep', utilized: 460000, allocated: 500000 },
  { month: 'Oct', utilized: 230000, allocated: 500000 }
];

const monthlyTrendData = [
  { month: 'Jan', disbursed: 45, pending: 25, failed: 5 },
  { month: 'Feb', disbursed: 52, pending: 22, failed: 4 },
  { month: 'Mar', disbursed: 48, pending: 28, failed: 6 },
  { month: 'Apr', disbursed: 65, pending: 18, failed: 3 },
  { month: 'May', disbursed: 72, pending: 15, failed: 2 },
  { month: 'Jun', disbursed: 85, pending: 12, failed: 1 },
  { month: 'Jul', disbursed: 78, pending: 16, failed: 4 },
  { month: 'Aug', disbursed: 92, pending: 8, failed: 2 },
  { month: 'Sep', disbursed: 88, pending: 10, failed: 3 },
  { month: 'Oct', disbursed: 95, pending: 5, failed: 1 }
];

// Audit logs data
const auditLogs = [
  { id: 'AUD001', timestamp: '2025-10-15 14:30:22', user: 'collector@welfare.gov', action: 'Case Sanctioned', caseId: 'CASE-2025-001', description: 'Approved PoA Relief for Rajesh Kumar', ipAddress: '192.168.1.100', status: 'success' },
  { id: 'AUD002', timestamp: '2025-10-15 14:25:15', user: 'clerk@treasury.gov', action: 'Payment Disbursed', caseId: 'CASE-2025-003', description: 'UTR: UTR2025100712345 generated', ipAddress: '192.168.1.101', status: 'success' },
  { id: 'AUD003', timestamp: '2025-10-15 14:20:30', user: 'system', action: 'Budget Alert', caseId: 'SYSTEM', description: 'Monthly utilization at 85% of limit', ipAddress: 'SYSTEM', status: 'warning' },
  { id: 'AUD004', timestamp: '2025-10-15 14:15:45', user: 'collector@welfare.gov', action: 'Case Rejected', caseId: 'CASE-2025-004', description: 'Caste certificate verification pending', ipAddress: '192.168.1.100', status: 'error' },
  { id: 'AUD005', timestamp: '2025-10-15 14:10:20', user: 'clerk@treasury.gov', action: 'Report Generated', caseId: 'ALL', description: 'Monthly fund utilization report', ipAddress: '192.168.1.101', status: 'success' }
];

const TreasuryDBTPortal = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser] = useState({
    email: 'collector@welfare.gov',
    role: 'collector',
    name: 'District Collector'
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [packets, setPackets] = useState(initialSanctionPackets);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [utrInput, setUtrInput] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [language, setLanguage] = useState('EN');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sanctionRemarks, setSanctionRemarks] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const stats = useMemo(() => {
    return {
      total: packets.length,
      pending: packets.filter(p => p.status === 'pending').length,
      validated: packets.filter(p => p.status === 'validated').length,
      disbursed: packets.filter(p => p.status === 'disbursed').length,
      failed: packets.filter(p => p.status === 'failed').length,
      totalAmount: packets.reduce((sum, p) => sum + p.sanctionedAmount, 0),
      disbursedAmount: packets.filter(p => p.status === 'disbursed').reduce((sum, p) => sum + p.sanctionedAmount, 0),
      atrocityCases: packets.filter(p => p.caseType === 'atrocity').length,
      verifiedCases: packets.filter(p => p.casteVerified).length
    };
  }, [packets]);

  const stateWiseData = useMemo(() => {
    const stateMap = {};
    packets.filter(p => p.status === 'disbursed').forEach(p => {
      if (!stateMap[p.state]) {
        stateMap[p.state] = {
          state: p.state,
          totalAmount: 0,
          beneficiaries: []
        };
      }
      stateMap[p.state].totalAmount += p.sanctionedAmount;
      stateMap[p.state].beneficiaries.push({
        name: p.beneficiaryName,
        amount: p.sanctionedAmount,
        purpose: p.purpose,
        district: p.district,
        utr: p.utr
      });
    });
    return Object.values(stateMap);
  }, [packets]);

  const pieChartData = [
    { name: 'Disbursed', value: stats.disbursed, color: '#10b981' },
    { name: 'Validated', value: stats.validated, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Failed', value: stats.failed, color: '#ef4444' }
  ];

  const barChartData = stateWiseData.map(state => ({
    name: state.state,
    amount: state.totalAmount / 100000,
    beneficiaries: state.beneficiaries.length
  }));

  const filteredPackets = useMemo(() => {
    return packets.filter(p => {
      const matchesSearch = p.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.firNumber && p.firNumber.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [packets, searchTerm, filterStatus]);

  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const calculateEligibleAmount = (caseType, schemeType) => {
    const amounts = {
      'PoA Relief': { min: 50000, max: 100000 },
      'PCR Scheme': { min: 75000, max: 150000 },
      'General Welfare': { min: 25000, max: 50000 }
    };
    const scheme = amounts[schemeType] || amounts['General Welfare'];
    return scheme.max;
  };

  const handleSanctionApproval = (packetId, approved) => {
    if (approved && !sanctionRemarks.trim()) {
      showNotificationMessage('Please provide sanction remarks', 'error');
      return;
    }

    setPackets(prev => prev.map(p => {
      if (p.id === packetId) {
        if (approved) {
          // Check budget availability
          const remainingBudget = budgetData.totalRemaining;
          if (p.sanctionedAmount > remainingBudget) {
            showNotificationMessage('Insufficient budget available', 'error');
            return p;
          }
          return {
            ...p,
            status: 'validated',
            validationStatus: 'success',
            approvedBy: currentUser.email,
            remarks: sanctionRemarks
          };
        } else {
          return {
            ...p,
            status: 'failed',
            validationStatus: 'failed',
            validationError: sanctionRemarks || 'Case rejected by collector',
            remarks: sanctionRemarks
          };
        }
      }
      return p;
    }));
    
    showNotificationMessage(
      approved ? 'Case sanctioned successfully' : 'Case rejected',
      approved ? 'success' : 'error'
    );
    setSanctionRemarks('');
    setShowModal(false);
  };

  const handleValidatePacket = (packetId) => {
    setPackets(prev => prev.map(p => {
      if (p.id === packetId) {
        const isValid = Math.random() > 0.2;
        return {
          ...p,
          status: isValid ? 'validated' : 'failed',
          validationStatus: isValid ? 'success' : 'failed',
          validationError: isValid ? null : 'Bank account validation failed',
          approvedBy: isValid ? currentUser.email : null
        };
      }
      return p;
    }));
    showNotificationMessage('Validation completed', 'success');
  };

  const handleDisbursePayment = (packetId) => {
    setPackets(prev => prev.map(p => {
      if (p.id === packetId && p.status === 'validated') {
        return { ...p, status: 'processing', processedBy: currentUser.email };
      }
      return p;
    }));
    
    setTimeout(() => {
      setPackets(prev => prev.map(p => {
        if (p.id === packetId) {
          const success = Math.random() > 0.1;
          return {
            ...p,
            status: success ? 'disbursed' : 'failed',
            disbursedDate: success ? new Date().toISOString().split('T')[0] : null,
            utr: success ? `UTR${Date.now()}` : null
          };
        }
        return p;
      }));
      showNotificationMessage('Payment disbursement initiated', 'success');
    }, 2000);
  };

  const handleUpdateUTR = () => {
    if (!utrInput.trim()) {
      showNotificationMessage('Please enter a valid UTR', 'error');
      return;
    }
    setPackets(prev => prev.map(p => p.id === selectedPacket.id ? { ...p, utr: utrInput, status: 'disbursed' } : p));
    showNotificationMessage('UTR updated successfully', 'success');
    setShowModal(false);
    setUtrInput('');
    setSelectedPacket(null);
  };

  const handleExportCSV = () => {
    const csv = [
      ['Case ID', 'Beneficiary', 'State', 'District', 'Amount', 'Status', 'UTR', 'FIR', 'Scheme'].join(','),
      ...filteredPackets.map(p => [
        p.caseId, 
        p.beneficiaryName, 
        p.state, 
        p.district, 
        p.sanctionedAmount, 
        p.status, 
        p.utr || 'N/A',
        p.firNumber || 'N/A',
        p.schemeType
      ].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `welfare_report_${Date.now()}.csv`;
    a.click();
    showNotificationMessage('Report exported successfully', 'success');
  };

  const openModal = (type, packet = null) => {
    setModalType(type);
    setSelectedPacket(packet);
    if (type === 'sanction' && packet) {
      setCalculatedAmount(calculateEligibleAmount(packet.caseType, packet.schemeType));
    }
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: darkMode ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300',
      validated: darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      disbursed: darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
      failed: darkMode ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      processing: darkMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return colors[status] || (darkMode ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300');
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/login";
  };

  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-gray-100" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`flex h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      {/* Sidebar */}
      <div
        className={`bg-black text-white transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <img src={myLogo} alt="Logo" className="w-12 h-12 object-contain" />
              <h2 className="text-xl font-bold">Welfare Dept</h2>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "cases", icon: FolderOpen, label: "Case Review" },
            { id: "budget", icon: IndianRupee, label: "Budget Tracking" },
            { id: "packets", icon: FileCheck, label: "All Cases" },
            { id: "reports", icon: BarChart3, label: "Reports" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${cardBg} border-b ${borderClass} p-4 flex items-center justify-between`}>
          <div>
            <h1 className="text-2xl font-bold">Welcome, District Collector</h1>
            <p className={textSecondary}>Welfare Department - Fund Management Portal</p>
          </div>
          <div className="flex items-center gap-4">
        
            
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}
            >
              <option value="EN">English</option>
              <option value="HI">हिन्दी</option>
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${cardBg} border ${borderClass} hover:shadow-md transition-all ${
                darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <button
                className={`p-2 rounded-lg ${cardBg} border ${borderClass} hover:shadow-md transition-all`}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.pending}
                </span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${cardBg} border ${borderClass} hover:shadow-md transition-all text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {showNotification && (
            <div className={`fixed top-4 right-4 z-50 ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-right-8 duration-300 border ${
              notificationType === 'success' ? 'border-green-400' : 'border-red-400'
            }`}>
              {notificationType === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {notificationMessage}
            </div>
          )}

          {/* Dashboard Section */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Alert Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-amber-600 dark:text-amber-400">Pending Action Required</h4>
                    <p className={textSecondary}>You have {stats.pending} cases pending for sanction approval</p>
                  </div>
                </div>
              </div>

              {/* Key Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <UserCheck className="text-green-600" size={32} />
                  <h3 className="text-green-700">Verified Cases</h3>
                  <p className="text-4xl font-bold mt-2 text-green-600">{stats.verifiedCases}</p>
                  <p className="text-sm text-green-500 mt-1">Caste Verified</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <CheckCircle className="text-blue-600" size={32} />
                  <h3 className="text-blue-700">Disbursed</h3>
                  <p className="text-4xl font-bold mt-2 text-blue-600">{stats.disbursed}</p>
                  <p className="text-sm text-blue-500 mt-1">Successfully Paid</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Users className="text-blue-500" size={32} />
                  <h3 className={textSecondary}>Total Cases</h3>
                  <p className="text-4xl font-bold mt-2">{stats.total}</p>
                  <p className="text-sm text-blue-500 mt-1">
                    {stats.atrocityCases} Atrocity Cases
                  </p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Clock className="text-orange-500" size={32} />
                  <h3 className={textSecondary}>Pending Review</h3>
                  <p className="text-4xl font-bold mt-2 text-orange-500">{stats.pending}</p>
                  <p className="text-sm text-orange-500 mt-1">Awaiting Sanction</p>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <IndianRupee className="text-purple-500" size={32} />
                  <h3 className={textSecondary}>Total Sanctioned</h3>
                  <p className="text-4xl font-bold mt-2">₹{(stats.totalAmount / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>Across all schemes</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <DollarSign className="text-green-600" size={32} />
                  <h3 className="text-green-700">Total Disbursed</h3>
                  <p className="text-4xl font-bold mt-2 text-green-600">₹{(stats.disbursedAmount / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>{((stats.disbursedAmount / stats.totalAmount) * 100).toFixed(1)}% of total</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <TrendingDown className="text-red-500" size={32} />
                  <h3 className={textSecondary}>Budget Remaining</h3>
                  <p className="text-4xl font-bold mt-2">₹{(budgetData.totalRemaining / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>Available for allocation</p>
                </div>
              </div>

              {/* Enhanced Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Pie Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Case Distribution</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <RechartsPie>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={60}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>

                {/* State-wise Disbursement */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">State-wise Disbursement (in Lakhs)</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={textSecondary} />
                      <YAxis stroke={textSecondary} tickFormatter={(value) => `₹${value}L`} />
                      <Tooltip />
                      <Bar 
                        dataKey="amount" 
                        fill="#10b981"
                        name="Amount (₹ Lakhs)" 
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Trend Chart */}
              <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-bold">Monthly Disbursement Trend</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="month" stroke={textSecondary} />
                    <YAxis stroke={textSecondary} />
                    <Tooltip />
                    <Area type="monotone" dataKey="disbursed" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="pending" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* CASE REVIEW SECTION */}
          {activeTab === "cases" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Case Review & Sanction</h2>
                <div className="flex gap-3">
                  <button className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass} flex items-center gap-2`}>
                    <Calculator size={18} />
                    Calculate Relief
                  </button>
                </div>
              </div>

              {/* Pending Cases for Review */}
              <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden border ${borderClass}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold">Pending Sanction Approval</h3>
                  <p className={textSecondary}>Review verified cases and approve fund allocation</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Case Details</th>
                        <th className="py-3 px-4 font-semibold">FIR & Verification</th>
                        <th className="py-3 px-4 font-semibold">Scheme</th>
                        <th className="py-3 px-4 font-semibold">Eligible Amount</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packets.filter(p => p.status === 'pending').map(packet => (
                        <tr 
                          key={packet.id} 
                          className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-blue-600 dark:text-blue-400">{packet.caseId}</div>
                            <div className="font-medium">{packet.beneficiaryName}</div>
                            <div className={textSecondary}>{packet.district}, {packet.state}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {packet.firNumber && (
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                                  {packet.firNumber}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {packet.casteVerified ? (
                                <span className="flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircle size={14} />
                                  Caste Verified
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600 text-sm">
                                  <XCircle size={14} />
                                  Not Verified
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{packet.schemeType}</div>
                            <div className={textSecondary}>{packet.purpose}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-green-600">₹{packet.eligibleAmount.toLocaleString()}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openModal('sanction', packet)} 
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                  darkMode 
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30' 
                                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                }`}
                              >
                                Review & Sanction
                              </button>
                              <button 
                                onClick={() => openModal('view', packet)} 
                                className={`p-2 text-indigo-500 ${darkMode ? 'hover:bg-indigo-500/20' : 'hover:bg-indigo-50'} rounded-lg transition-all duration-200 hover:scale-110 border border-indigo-500/30`}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {packets.filter(p => p.status === 'pending').length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle className={`w-16 h-16 ${textSecondary} mx-auto mb-4`} />
                    <p className={textSecondary}>No pending cases for review</p>
                  </div>
                )}
              </div>

              {/* Recently Sanctioned */}
              <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden border ${borderClass}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold">Recently Sanctioned Cases</h3>
                </div>
                <div className="p-6 space-y-4">
                  {packets.filter(p => p.status === 'validated').slice(0, 3).map(packet => (
                    <div key={packet.id} className={`p-4 rounded-xl border ${borderClass} transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{packet.beneficiaryName}</div>
                          <div className={`text-sm ${textSecondary}`}>{packet.caseId} • {packet.schemeType}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">₹{packet.sanctionedAmount.toLocaleString()}</div>
                          <div className="text-xs text-green-500">Sanctioned</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BUDGET TRACKING SECTION */}
          {activeTab === "budget" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Budget & Fund Tracking</h2>
              
              {/* Budget Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Award className="text-purple-500" size={32} />
                  <h3 className={textSecondary}>Total Allocated</h3>
                  <p className="text-4xl font-bold mt-2">₹{(budgetData.totalAllocated / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>Annual Budget</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <TrendingUp className="text-green-500" size={32} />
                  <h3 className={textSecondary}>Total Utilized</h3>
                  <p className="text-4xl font-bold mt-2 text-green-500">₹{(budgetData.totalUtilized / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>{((budgetData.totalUtilized / budgetData.totalAllocated) * 100).toFixed(1)}% of budget</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Clock className="text-orange-500" size={32} />
                  <h3 className={textSecondary}>Pending Allocation</h3>
                  <p className="text-4xl font-bold mt-2 text-orange-500">₹{(budgetData.totalPending / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>Awaiting disbursement</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <TrendingDown className="text-blue-500" size={32} />
                  <h3 className={textSecondary}>Remaining Budget</h3>
                  <p className="text-4xl font-bold mt-2 text-blue-500">₹{(budgetData.totalRemaining / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>{((budgetData.totalRemaining / budgetData.totalAllocated) * 100).toFixed(1)}% available</p>
                </div>
              </div>

              {/* Budget Alert */}
              {(budgetData.currentMonthUtilized / budgetData.monthlyLimit) > 0.8 && (
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-500 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400">Budget Threshold Alert</h4>
                      <p className={textSecondary}>Monthly utilization is at {((budgetData.currentMonthUtilized / budgetData.monthlyLimit) * 100).toFixed(1)}% of the limit</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Scheme-wise Budget Allocation */}
              <div className={`${cardBg} rounded-2xl shadow-xl p-6 border ${borderClass}`}>
                <h3 className="text-xl font-bold mb-6">Scheme-wise Budget Allocation</h3>
                <div className="space-y-4">
                  {schemeWiseData.map((scheme, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${borderClass}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{scheme.scheme}</h4>
                          <p className={`text-sm ${textSecondary}`}>{scheme.cases} active cases</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{(scheme.allocated / 100000).toFixed(1)}L</div>
                          <div className="text-sm text-green-600">₹{(scheme.utilized / 100000).toFixed(1)}L used</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(scheme.utilized / scheme.allocated) * 100}%` }}
                        ></div>
                      </div>
                      <div className={`text-xs ${textSecondary} mt-1`}>
                        {((scheme.utilized / scheme.allocated) * 100).toFixed(1)}% utilized
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Utilization Trend */}
              <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
                  <h3 className="text-xl font-bold">Monthly Budget Utilization</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyUtilizationData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="month" stroke={textSecondary} />
                    <YAxis stroke={textSecondary} tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
                    <Tooltip formatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                    <Legend />
                    <Line type="monotone" dataKey="utilized" stroke="#10b981" strokeWidth={2} name="Utilized" />
                    <Line type="monotone" dataKey="allocated" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Monthly Limit" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* PACKETS SECTION - All Cases */}
          {activeTab === "packets" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Cases</h2>
                <div className="flex gap-4">
                  <select className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}>
                    <option>All States</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Gujarat</option>
                  </select>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="validated">Validated</option>
                    <option value="disbursed">Disbursed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
              
              {/* Enhanced Filters and Search */}
              <div className={`${cardBg} rounded-2xl shadow-xl p-6 border ${borderClass}`}>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="relative max-w-md">
                      <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
                      <input
                        type="text"
                        placeholder="Search by Case ID, Beneficiary or FIR..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border ${borderClass} rounded-xl ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:scale-105 border border-green-400/30"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Table */}
              <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden border ${borderClass}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Case ID</th>
                        <th className="py-3 px-4 font-semibold">Beneficiary</th>
                        <th className="py-3 px-4 font-semibold">State</th>
                        <th className="py-3 px-4 font-semibold">Amount</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPackets.map(packet => (
                        <tr 
                          key={packet.id} 
                          className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-blue-600 dark:text-blue-400">{packet.caseId}</div>
                            <div className={textSecondary}>{packet.receivedDate}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{packet.beneficiaryName}</div>
                            <div className={textSecondary}>{packet.purpose}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{packet.state}</div>
                            <div className={textSecondary}>{packet.district}</div>
                          </td>
                          <td className="py-3 px-4 font-medium">₹{packet.sanctionedAmount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                packet.status === "disbursed"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : packet.status === "failed"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  : packet.status === "validated"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {packet.status.charAt(0).toUpperCase() + packet.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openModal('view', packet)} 
                                className={`p-2 text-indigo-500 ${darkMode ? 'hover:bg-indigo-500/20' : 'hover:bg-indigo-50'} rounded-lg transition-all duration-200 hover:scale-110 border border-indigo-500/30`}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {packet.status === 'pending' && (
                                <button 
                                  onClick={() => handleValidatePacket(packet.id)} 
                                  className={`p-2 text-blue-500 ${darkMode ? 'hover:bg-blue-500/20' : 'hover:bg-blue-50'} rounded-lg transition-all duration-200 hover:scale-110 border border-blue-500/30`}
                                  title="Validate"
                                >
                                  <FileCheck className="w-4 h-4" />
                                </button>
                              )}
                              {packet.status === 'validated' && (
                                <button 
                                  onClick={() => handleDisbursePayment(packet.id)} 
                                  className={`p-2 text-green-500 ${darkMode ? 'hover:bg-green-500/20' : 'hover:bg-green-50'} rounded-lg transition-all duration-200 hover:scale-110 border border-green-500/30`}
                                  title="Disburse Payment"
                                >
                                  <DollarSign className="w-4 h-4" />
                                </button>
                              )}
                              {packet.status === 'disbursed' && (
                                <button 
                                  onClick={() => openModal('utr', packet)} 
                                  className={`p-2 text-purple-500 ${darkMode ? 'hover:bg-purple-500/20' : 'hover:bg-purple-50'} rounded-lg transition-all duration-200 hover:scale-110 border border-purple-500/30`}
                                  title="Update UTR"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS SECTION */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Reports & Transparency</h2>
              
              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <FileBarChart className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold">Fund Utilization</h3>
                  </div>
                  <p className={textSecondary}>Detailed analysis of budget allocation and spending patterns</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <PieChartIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold">Scheme Performance</h3>
                  </div>
                  <p className={textSecondary}>Success rates and efficiency metrics across all welfare schemes</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                      <ShieldIcon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-semibold">Atrocity Cases</h3>
                  </div>
                  <p className={textSecondary}>Comprehensive report on SC/ST atrocity case handling</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <Database className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="font-semibold">Audit Trail</h3>
                  </div>
                  <p className={textSecondary}>Complete transaction history and user activity logs</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-xl">
                      <User className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="font-semibold">Beneficiary Reports</h3>
                  </div>
                  <p className={textSecondary}>Demographic and geographic analysis of beneficiaries</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl">
                      <Calendar className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h3 className="font-semibold">Monthly Summary</h3>
                  </div>
                  <p className={textSecondary}>Monthly performance and financial summary reports</p>
                </div>
              </div>

              {/* Audit Logs */}
              <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden border ${borderClass}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Audit Logs</h3>
                    <p className={textSecondary}>System activity and user actions tracking</p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Export Logs
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Timestamp</th>
                        <th className="py-3 px-4 font-semibold">User</th>
                        <th className="py-3 px-4 font-semibold">Action</th>
                        <th className="py-3 px-4 font-semibold">Case ID</th>
                        <th className="py-3 px-4 font-semibold">Description</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map(log => (
                        <tr key={log.id} className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                          <td className="py-3 px-4">
                            <div className="text-sm font-mono">{log.timestamp}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">{log.user}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{log.action}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-blue-600 dark:text-blue-400">{log.caseId}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={textSecondary}>{log.description}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                log.status === "success"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : log.status === "warning"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
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
          )}
        </main>
      </div>

      {/* Modal for Sanction Review */}
      {showModal && modalType === 'sanction' && selectedPacket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold">Review & Sanction Case</h3>
              <p className={textSecondary}>Case ID: {selectedPacket.caseId}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Case Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Beneficiary</label>
                  <p className="font-medium">{selectedPacket.beneficiaryName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Scheme Type</label>
                  <p className="font-medium">{selectedPacket.schemeType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">FIR Status</label>
                  <div className="flex items-center gap-2">
                    {selectedPacket.firNumber ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span>{selectedPacket.firNumber ? 'FIR Registered' : 'No FIR'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Caste Verification</label>
                  <div className="flex items-center gap-2">
                    {selectedPacket.casteVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span>{selectedPacket.casteVerified ? 'Verified' : 'Pending'}</span>
                  </div>
                </div>
              </div>

              {/* Amount Calculation */}
              <div className={`p-4 rounded-xl border ${borderClass}`}>
                <h4 className="font-semibold mb-3">Amount Calculation</h4>
                <div className="flex justify-between items-center">
                  <span>Eligible Amount:</span>
                  <span className="text-2xl font-bold text-green-600">₹{calculatedAmount.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Based on {selectedPacket.schemeType} scheme guidelines
                </div>
              </div>

              {/* Budget Check */}
              <div className={`p-4 rounded-xl ${
                calculatedAmount > budgetData.totalRemaining 
                  ? 'bg-red-500/20 border border-red-500/30' 
                  : 'bg-green-500/20 border border-green-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Budget Availability</h4>
                    <p className="text-sm">
                      Remaining Budget: ₹{budgetData.totalRemaining.toLocaleString()}
                    </p>
                  </div>
                  {calculatedAmount > budgetData.totalRemaining ? (
                    <div className="text-red-600 font-semibold">Insufficient Funds</div>
                  ) : (
                    <div className="text-green-600 font-semibold">Funds Available</div>
                  )}
                </div>
              </div>

              {/* Sanction Remarks */}
              <div>
                <label className="block text-sm font-medium mb-2">Sanction Remarks *</label>
                <textarea
                  value={sanctionRemarks}
                  onChange={(e) => setSanctionRemarks(e.target.value)}
                  placeholder="Enter remarks for approval or rejection..."
                  className={`w-full p-3 border ${borderClass} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white'
                  }`}
                  rows={3}
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 border ${borderClass} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSanctionApproval(selectedPacket.id, false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject Case
              </button>
              <button
                onClick={() => handleSanctionApproval(selectedPacket.id, true)}
                disabled={calculatedAmount > budgetData.totalRemaining || !sanctionRemarks.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  calculatedAmount > budgetData.totalRemaining || !sanctionRemarks.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Approve Sanction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Details */}
      {showModal && modalType === 'view' && selectedPacket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold">Case Details</h3>
              <p className={textSecondary}>Complete information for {selectedPacket.caseId}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Case ID</label>
                  <p>{selectedPacket.caseId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Beneficiary</label>
                  <p>{selectedPacket.beneficiaryName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <p>{selectedPacket.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">District</label>
                  <p>{selectedPacket.district}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Case Type</label>
                  <p>{selectedPacket.caseType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Scheme</label>
                  <p>{selectedPacket.schemeType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">FIR Number</label>
                  <p>{selectedPacket.firNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Caste Verified</label>
                  <p>{selectedPacket.casteVerified ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <p className="font-semibold">₹{selectedPacket.sanctionedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPacket.status === "disbursed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : selectedPacket.status === "failed"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : selectedPacket.status === "validated"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {selectedPacket.status.charAt(0).toUpperCase() + selectedPacket.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {selectedPacket.remarks && (
                <div>
                  <label className="block text-sm font-medium mb-1">Remarks</label>
                  <p className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {selectedPacket.remarks}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for UTR Update */}
      {showModal && modalType === 'utr' && selectedPacket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold">Update UTR Number</h3>
              <p className={textSecondary}>Case: {selectedPacket.caseId}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">UTR Number *</label>
                <input
                  type="text"
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="Enter UTR number..."
                  className={`w-full p-3 border ${borderClass} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white'
                  }`}
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                UTR (Unique Transaction Reference) is required for successful payment tracking.
              </p>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUTR}
                disabled={!utrInput.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !utrInput.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Update UTR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasuryDBTPortal;