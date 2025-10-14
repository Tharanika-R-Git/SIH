import React, { useState, useMemo } from 'react';
import { 
  Download, Check, X, Eye, AlertCircle, FileText, DollarSign, Clock, 
  CheckCircle, XCircle, Search, Shield, Activity, Moon, Sun, PieChart, 
  Users, TrendingUp, BarChart3, IndianRupee, MapPin, UserCheck, FileCheck, 
  Globe, LogOut, Home, FolderOpen, Bell, Zap, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import myLogo from '../assets/my-logo.png'; 

// Mock data for demonstration with state information
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
    processedBy: null
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
    purpose: 'Subsidy Payment',
    status: 'validated',
    receivedDate: '2025-10-08',
    validationStatus: 'success',
    utr: null,
    approvedBy: 'admin@treasury.gov',
    processedBy: null
  },
  // ... rest of your mock data remains the same
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
    purpose: 'Scholarship',
    status: 'disbursed',
    receivedDate: '2025-10-07',
    validationStatus: 'success',
    utr: 'UTR2025100712345',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-10'
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
    validationError: 'Invalid IFSC code',
    utr: null,
    approvedBy: null,
    processedBy: null
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
    disbursedDate: '2025-10-09'
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
    purpose: 'Housing Scheme',
    status: 'disbursed',
    receivedDate: '2025-10-04',
    validationStatus: 'success',
    utr: 'UTR2025100443210',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-08'
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
    purpose: 'Education Grant',
    status: 'disbursed',
    receivedDate: '2025-10-03',
    validationStatus: 'success',
    utr: 'UTR2025100356789',
    approvedBy: 'admin@treasury.gov',
    processedBy: 'clerk@treasury.gov',
    disbursedDate: '2025-10-07'
  }
];

// Enhanced chart data with better visualization
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

const TreasuryDBTPortal = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser] = useState({
    email: 'clerk@treasury.gov',
    role: 'clerk',
    name: 'Treasury Officer'
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

  const stats = useMemo(() => {
    return {
      total: packets.length,
      pending: packets.filter(p => p.status === 'pending').length,
      validated: packets.filter(p => p.status === 'validated').length,
      disbursed: packets.filter(p => p.status === 'disbursed').length,
      failed: packets.filter(p => p.status === 'failed').length,
      totalAmount: packets.reduce((sum, p) => sum + p.sanctionedAmount, 0),
      disbursedAmount: packets.filter(p => p.status === 'disbursed').reduce((sum, p) => sum + p.sanctionedAmount, 0)
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

  // Enhanced chart data
  const pieChartData = [
    { name: 'Disbursed', value: stats.disbursed, color: '#10b981' },
    { name: 'Validated', value: stats.validated, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Failed', value: stats.failed, color: '#ef4444' }
  ];

  const barChartData = stateWiseData.map(state => ({
    name: state.state,
    amount: state.totalAmount / 100000, // Convert to lakhs
    beneficiaries: state.beneficiaries.length
  }));

  const filteredPackets = useMemo(() => {
    return packets.filter(p => {
      const matchesSearch = p.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase());
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
      ['Case ID', 'Beneficiary', 'State', 'District', 'Amount', 'Status', 'UTR'].join(','),
      ...filteredPackets.map(p => [p.caseId, p.beneficiaryName, p.state, p.district, p.sanctionedAmount, p.status, p.utr || 'N/A'].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treasury_report_${Date.now()}.csv`;
    a.click();
    showNotificationMessage('Report exported successfully', 'success');
  };

  const openModal = (type, packet = null) => {
    setModalType(type);
    setSelectedPacket(packet);
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

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'HI' : 'EN');
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
              <img 
                src={myLogo} 
                alt="Logo" 
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-xl font-bold">Treasury Dept</h2>
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
            { id: "packets", icon: FolderOpen, label: "All Cases" },
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
            <h1 className="text-2xl font-bold">Welcome, Treasury Officer</h1>
            <p className={textSecondary}>Direct Benefit Transfer Portal</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Small District Info */}
            <div className={`px-3 py-1 rounded-lg ${cardBg} border ${borderClass} text-sm`}>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Tiruppur, TN</span>
              </div>
            </div>

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
            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                className={`p-2 rounded-lg ${cardBg} border ${borderClass} hover:shadow-md transition-all`}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            {/* Logout Button */}
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
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Users className="text-blue-500" size={32} />
                  <h3 className={textSecondary}>Total Packets</h3>
                  <p className="text-4xl font-bold mt-2">{stats.total}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Clock className="text-orange-500" size={32} />
                  <h3 className={textSecondary}>Pending</h3>
                  <p className="text-4xl font-bold mt-2 text-orange-500">{stats.pending}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <UserCheck className="text-green-600" size={32} />
                  <h3 className="text-green-700">Validated</h3>
                  <p className="text-4xl font-bold mt-2 text-green-600">{stats.validated}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <CheckCircle className="text-blue-600" size={32} />
                  <h3 className="text-blue-700">Disbursed</h3>
                  <p className="text-4xl font-bold mt-2 text-blue-600">{stats.disbursed}</p>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <IndianRupee className="text-purple-500" size={32} />
                  <h3 className={textSecondary}>Total Sanctioned</h3>
                  <p className="text-4xl font-bold mt-2">₹{(stats.totalAmount / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>Across all states</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <DollarSign className="text-green-600" size={32} />
                  <h3 className="text-green-700">Total Disbursed</h3>
                  <p className="text-4xl font-bold mt-2 text-green-600">₹{(stats.disbursedAmount / 100000).toFixed(1)}L</p>
                  <p className={textSecondary}>{((stats.disbursedAmount / stats.totalAmount) * 100).toFixed(1)}% of total</p>
                </div>
              </div>

              {/* Enhanced Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Pie Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Packet Distribution</h3>
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
                        placeholder="Search by Case ID or Beneficiary..."
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
                {filteredPackets.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className={`w-16 h-16 ${textSecondary} mx-auto mb-4`} />
                    <p className={textSecondary}>No sanction packets found</p>
                    <p className={`text-sm ${textSecondary} mt-1`}>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* REPORTS SECTION */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Reports</h2>
              
              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <FileText className="text-blue-500" size={32} />
                  <h3 className={textSecondary}>Total Reports</h3>
                  <p className="text-4xl font-bold mt-2">15</p>
                  <p className={textSecondary}>This month</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <Download className="text-green-500" size={32} />
                  <h3 className={textSecondary}>Exported Files</h3>
                  <p className="text-4xl font-bold mt-2">8</p>
                  <p className={textSecondary}>CSV & PDF</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <BarChart3 className="text-purple-500" size={32} />
                  <h3 className={textSecondary}>Analytics Ready</h3>
                  <p className="text-4xl font-bold mt-2">12</p>
                  <p className={textSecondary}>Charts & Graphs</p>
                </div>
              </div>

              {/* Available Reports */}
              <div className={`${cardBg} rounded-2xl shadow-xl p-6 border ${borderClass}`}>
                <h3 className="text-xl font-bold mb-6">Available Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Monthly Disbursement Report', description: 'Complete overview of all disbursements', type: 'PDF' },
                    { title: 'Beneficiary Analysis', description: 'Detailed beneficiary demographics', type: 'CSV' },
                    { title: 'State-wise Performance', description: 'Performance across different states', type: 'PDF' },
                    { title: 'Failed Transactions', description: 'Analysis of failed disbursements', type: 'CSV' },
                    { title: 'Validation Reports', description: 'Packet validation statistics', type: 'PDF' },
                    { title: 'UTR Tracking Report', description: 'Complete UTR tracking details', type: 'CSV' }
                  ].map((report, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${borderClass} transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${textClass}`}>{report.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {report.type}
                        </span>
                      </div>
                      <p className={`text-sm ${textSecondary} mb-4`}>{report.description}</p>
                      <div className="flex gap-2">
                        <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          darkMode 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                        }`}>
                          View
                        </button>
                        <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          darkMode 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30' 
                            : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                        }`}>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${cardBg} rounded-2xl shadow-xl p-6 border ${borderClass}`}>
                <h3 className="text-xl font-bold mb-6">Quick Export</h3>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:scale-105 border border-blue-400/30"
                  >
                    <Download className="w-4 h-4" />
                    Export All Data (CSV)
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:scale-105 border border-green-400/30">
                    <FileText className="w-4 h-4" />
                    Generate PDF Report
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:scale-105 border border-purple-400/30">
                    <BarChart3 className="w-4 h-4" />
                    Analytics Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border ${borderClass}`}>
            <div className={`p-6 border-b ${borderClass} flex items-center justify-between ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}>
              <h3 className={`text-xl font-semibold ${textClass}`}>
                {modalType === 'view' && 'Packet Details'}
                {modalType === 'utr' && 'Update UTR'}
                {modalType === 'breakdown' && 'State-wise Disbursement Breakdown'}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-xl transition-all duration-200 hover:scale-110`}
              >
                <X className={`w-5 h-5 ${textSecondary}`} />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'view' && selectedPacket && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { label: 'Case ID', value: selectedPacket.caseId },
                      { label: 'Status', value: selectedPacket.status, badge: true },
                      { label: 'Beneficiary', value: selectedPacket.beneficiaryName },
                      { label: 'State', value: selectedPacket.state },
                      { label: 'District', value: selectedPacket.district },
                      { label: 'Amount', value: `₹${selectedPacket.sanctionedAmount.toLocaleString()}` },
                      { label: 'Purpose', value: selectedPacket.purpose },
                      { label: 'Aadhaar', value: selectedPacket.maskedAadhaar },
                      { label: 'Bank Account', value: selectedPacket.bankAccount },
                      { label: 'IFSC', value: selectedPacket.ifsc },
                      ...(selectedPacket.utr ? [{ label: 'UTR', value: selectedPacket.utr }] : [])
                    ].map((field, index) => (
                      <div key={index} className="space-y-2">
                        <label className={`text-sm font-medium ${textSecondary}`}>{field.label}</label>
                        {field.badge ? (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            selectedPacket.status === "disbursed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : selectedPacket.status === "failed"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              : selectedPacket.status === "validated"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}>
                            {field.value}
                          </span>
                        ) : (
                          <p className={`${textClass} font-medium`}>{field.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType === 'utr' && selectedPacket && (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h4 className={`text-lg font-semibold ${textClass} mb-2`}>Update UTR Number</h4>
                    <p className={textSecondary}>Enter the Unique Transaction Reference for {selectedPacket.beneficiaryName}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${textClass} mb-2`}>
                        Case ID
                      </label>
                      <div className={`px-4 py-3 rounded-xl border ${borderClass} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                        {selectedPacket.caseId}
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textClass} mb-2`}>
                        Enter UTR Number
                      </label>
                      <input
                        type="text"
                        value={utrInput}
                        onChange={(e) => setUtrInput(e.target.value)}
                        placeholder="e.g., UTR2025100712345"
                        className={`w-full px-4 py-3 border ${borderClass} rounded-xl ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className={`px-6 py-3 border ${borderClass} rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-all duration-200 hover:scale-105`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateUTR}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-105 border border-indigo-400/30"
                    >
                      Update UTR
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'breakdown' && (
                <div className="space-y-6">
                  <div className={`text-lg font-semibold ${textClass} text-center`}>
                    Total Disbursed: <span className="text-green-500">₹{stats.disbursedAmount.toLocaleString()}</span> across {stateWiseData.length} states
                  </div>
                  {stateWiseData.map((state, idx) => (
                    <div key={idx} className={`border ${borderClass} rounded-xl p-6 transition-all duration-200 ${darkMode ? 'hover:bg-gray-700/50 hover:border-gray-500' : 'hover:bg-gray-50 hover:border-gray-300'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-semibold ${textClass}`}>{state.state}</h4>
                        <div className="text-lg font-bold text-green-500">
                          ₹{state.totalAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {state.beneficiaries.map((beneficiary, bIdx) => (
                          <div key={bIdx} className={`flex items-center justify-between py-3 px-4 rounded-xl ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${textClass}`}>{beneficiary.name}</p>
                              <p className={`text-xs ${textSecondary}`}>{beneficiary.district} • {beneficiary.purpose}</p>
                              <p className={`text-xs ${textSecondary}`}>UTR: {beneficiary.utr}</p>
                            </div>
                            <div className={`text-sm font-semibold ${textClass}`}>
                              ₹{beneficiary.amount.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div> 
      )}
    </div>
  );
};

export default TreasuryDBTPortal;