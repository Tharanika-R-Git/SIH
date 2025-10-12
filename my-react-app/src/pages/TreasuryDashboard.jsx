import React, { useState, useMemo } from 'react';
import { Download, Check, X, Eye, AlertCircle, FileText, DollarSign, Clock, CheckCircle, XCircle, Search, Shield, Activity, Moon, Sun, PieChart, Users, TrendingUp, BanknoteIcon } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  const pieChartData = [
    { name: 'Disbursed', value: stats.disbursedAmount, color: '#10b981' },
    { name: 'Pending', value: stats.totalAmount - stats.disbursedAmount, color: '#f59e0b' }
  ];

  const barChartData = stateWiseData.map(state => ({
    name: state.state,
    amount: state.totalAmount,
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
      pending: darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      validated: darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      disbursed: darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      failed: darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      processing: darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
    };
    return colors[status] || (darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800');
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, onClick, trend }) => (
    <div 
      onClick={onClick}
      className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-sm p-6 border ${onClick ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mb-1`}>{value}</p>
          {subtitle && (
            <div className="flex items-center gap-2">
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{subtitle}</p>
              {trend && (
                <div className={`flex items-center text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className={`w-3 h-3 ${trend > 0 ? '' : 'rotate-180'}`} />
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-200`}>
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-8 duration-300`}>
          {notificationType === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {notificationMessage}
        </div>
      )}

      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                <Shield className={`w-6 h-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Treasury DBT Portal
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>PFMS Integration Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentUser.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`${cardBgClass} shadow-sm border-b ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'packets', label: 'Sanction Packets', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-6 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? `text-indigo-600 ${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'}`
                    : `${secondaryTextClass} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${textClass}`}>Dashboard Overview</h2>
              <div className={`text-sm px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${secondaryTextClass}`}>
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                title="Total Packets" 
                value={stats.total} 
                color="#6366f1"
                trend={2.5}
              />
              <StatCard 
                icon={Clock} 
                title="Pending" 
                value={stats.pending} 
                color="#f59e0b"
                trend={-1.2}
              />
              <StatCard 
                icon={CheckCircle} 
                title="Disbursed" 
                value={stats.disbursed} 
                color="#10b981"
                trend={3.8}
              />
              <StatCard 
                icon={XCircle} 
                title="Failed" 
                value={stats.failed} 
                color="#ef4444"
                trend={0.5}
              />
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatCard 
                icon={BanknoteIcon} 
                title="Total Sanctioned Amount" 
                value={`₹${stats.totalAmount.toLocaleString()}`}
                subtitle="Across all states"
                color="#8b5cf6"
                onClick={() => openModal('breakdown')}
              />
              <StatCard 
                icon={DollarSign} 
                title="Total Disbursed Amount" 
                value={`₹${stats.disbursedAmount.toLocaleString()}`}
                subtitle={`${((stats.disbursedAmount / stats.totalAmount) * 100).toFixed(1)}% of total`}
                color="#10b981" 
                trend={4.2}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`${cardBgClass} rounded-xl shadow-sm p-6 border ${borderClass}`}>
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-3 ${textClass}`}>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                    <PieChart className={`w-5 h-5 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
                  </div>
                  Disbursement Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} 
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              <div className={`${cardBgClass} rounded-xl shadow-sm p-6 border ${borderClass}`}>
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-3 ${textClass}`}>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                    <Activity className={`w-5 h-5 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
                  </div>
                  State-wise Disbursement
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={darkMode ? '#9ca3af' : '#6b7280'}
                      fontSize={12}
                    />
                    <YAxis 
                      stroke={darkMode ? '#9ca3af' : '#6b7280'}
                      fontSize={12}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: darkMode ? '#f3f4f6' : '#111827'
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="amount" 
                      fill="#10b981" 
                      name="Amount (₹)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packets' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className={`${cardBgClass} rounded-xl shadow-sm p-6 border ${borderClass}`}>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 w-full md:w-auto">
                  <div className="relative max-w-md">
                    <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${secondaryTextClass}`} />
                    <input
                      type="text"
                      placeholder="Search by Case ID or Beneficiary..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border ${borderClass} rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-4 py-3 border ${borderClass} rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="validated">Validated</option>
                    <option value="disbursed">Disbursed</option>
                    <option value="failed">Failed</option>
                  </select>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className={`${cardBgClass} rounded-xl shadow-sm overflow-hidden border ${borderClass}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${borderClass}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>Case ID</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>Beneficiary</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>State</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>Amount</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>Status</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${secondaryTextClass} uppercase tracking-wider`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${borderClass}`}>
                    {filteredPackets.map(packet => (
                      <tr 
                        key={packet.id} 
                        className={`transition-colors duration-150 ${
                          darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className={`text-sm font-semibold ${textClass}`}>{packet.caseId}</div>
                          <div className={`text-xs ${secondaryTextClass}`}>{packet.receivedDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-medium ${textClass}`}>{packet.beneficiaryName}</div>
                          <div className={`text-xs ${secondaryTextClass}`}>{packet.purpose}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm ${textClass}`}>{packet.state}</div>
                          <div className={`text-xs ${secondaryTextClass}`}>{packet.district}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-bold ${textClass}`}>₹{packet.sanctionedAmount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(packet.status)}`}>
                            {packet.status.charAt(0).toUpperCase() + packet.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button 
                              onClick={() => openModal('view', packet)} 
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-150" 
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {packet.status === 'pending' && (
                              <button 
                                onClick={() => handleValidatePacket(packet.id)} 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150" 
                                title="Validate"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            {packet.status === 'validated' && (
                              <button 
                                onClick={() => handleDisbursePayment(packet.id)} 
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150" 
                                title="Disburse Payment"
                              >
                                <DollarSign className="w-4 h-4" />
                              </button>
                            )}
                            {packet.status === 'disbursed' && (
                              <button 
                                onClick={() => openModal('utr', packet)} 
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-150" 
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
                  <AlertCircle className={`w-16 h-16 ${secondaryTextClass} mx-auto mb-4`} />
                  <p className={secondaryTextClass}>No sanction packets found</p>
                  <p className={`text-sm ${secondaryTextClass} mt-1`}>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`${cardBgClass} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200`}>
            <div className={`p-6 border-b ${borderClass} flex items-center justify-between`}>
              <h3 className={`text-xl font-semibold ${textClass}`}>
                {modalType === 'view' && 'Packet Details'}
                {modalType === 'utr' && 'Update UTR'}
                {modalType === 'breakdown' && 'State-wise Disbursement Breakdown'}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
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
                        <label className={`text-sm font-medium ${secondaryTextClass}`}>{field.label}</label>
                        {field.badge ? (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(field.value)}`}>
                            {field.value}
                          </span>
                        ) : (
                          <p className={textClass}>{field.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType === 'utr' && selectedPacket && (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} flex items-center justify-center`}>
                      <FileText className={`w-8 h-8 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                    </div>
                    <h4 className={`text-lg font-semibold ${textClass} mb-2`}>Update UTR Number</h4>
                    <p className={secondaryTextClass}>Enter the Unique Transaction Reference for {selectedPacket.beneficiaryName}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${textClass} mb-2`}>
                        Case ID
                      </label>
                      <div className={`px-4 py-3 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
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
                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className={`px-6 py-3 border ${borderClass} rounded-lg transition-colors duration-200 ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateUTR}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
                    >
                      Update UTR
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'breakdown' && (
                <div className="space-y-6">
                  <div className={`text-lg font-semibold ${textClass} text-center`}>
                    Total Disbursed: <span className="text-green-600">₹{stats.disbursedAmount.toLocaleString()}</span> across {stateWiseData.length} states
                  </div>
                  {stateWiseData.map((state, idx) => (
                    <div key={idx} className={`border ${borderClass} rounded-xl p-6 transition-colors duration-200 hover:${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-semibold ${textClass}`}>{state.state}</h4>
                        <div className={`text-lg font-bold text-green-600`}>
                          ₹{state.totalAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {state.beneficiaries.map((beneficiary, bIdx) => (
                          <div key={bIdx} className={`flex items-center justify-between py-3 px-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${textClass}`}>{beneficiary.name}</p>
                              <p className={`text-xs ${secondaryTextClass}`}>{beneficiary.district} • {beneficiary.purpose}</p>
                              <p className={`text-xs ${secondaryTextClass}`}>UTR: {beneficiary.utr}</p>
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