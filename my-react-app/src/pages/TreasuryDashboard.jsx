import React, { useState, useMemo } from 'react';
import { Download, Upload, Check, X, Eye, AlertCircle, FileText, Users, DollarSign, Clock, CheckCircle, XCircle, RefreshCw, Search, Filter, ChevronDown, ChevronUp, Shield, Activity, Bell, Settings, Menu, Home, BarChart3, Moon, Sun } from 'lucide-react';

const initialSanctionPackets = [
  {
    id: 'SP001',
    caseId: 'CASE-2025-001',
    beneficiaryName: 'Rajesh Kumar',
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
  }
];

const auditLogs = [
  { id: 1, action: 'Packet Received', user: 'system', caseId: 'CASE-2025-001', timestamp: '2025-10-09 10:30 AM', details: 'Sanction packet received from PFMS' },
  { id: 2, action: 'Validation Success', user: 'clerk@treasury.gov', caseId: 'CASE-2025-002', timestamp: '2025-10-09 11:15 AM', details: 'Beneficiary data validated successfully' },
  { id: 3, action: 'Payment Approved', user: 'admin@treasury.gov', caseId: 'CASE-2025-002', timestamp: '2025-10-09 02:30 PM', details: 'Payment approved for disbursement' },
  { id: 4, action: 'UTR Updated', user: 'clerk@treasury.gov', caseId: 'CASE-2025-003', timestamp: '2025-10-10 09:45 AM', details: 'UTR marked: UTR2025100712345' },
  { id: 5, action: 'Validation Failed', user: 'system', caseId: 'CASE-2025-004', timestamp: '2025-10-09 03:00 PM', details: 'Invalid IFSC code detected' }
];

const TreasuryDBTPortal = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser] = useState({
    email: 'clerk@treasury.gov',
    role: 'clerk',
    name: 'Treasury Officer'
  });

  const [activeTab, setActiveTab] = useState('pending');
  const [packets, setPackets] = useState(initialSanctionPackets);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [utrInput, setUtrInput] = useState('');
  const [logs] = useState(auditLogs);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const stats = useMemo(() => ({
    total: packets.length,
    pending: packets.filter(p => p.status === 'pending').length,
    validated: packets.filter(p => p.status === 'validated').length,
    disbursed: packets.filter(p => p.status === 'disbursed').length,
    failed: packets.filter(p => p.status === 'failed').length,
    totalAmount: packets.reduce((sum, p) => sum + p.sanctionedAmount, 0),
    disbursedAmount: packets.filter(p => p.status === 'disbursed').reduce((sum, p) => sum + p.sanctionedAmount, 0)
  }), [packets]);

  const filteredPackets = useMemo(() => {
    return packets.filter(p => {
      const matchesSearch = p.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || p.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [packets, searchTerm, activeTab]);

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
        const success = Math.random() > 0.1;
        return {
          ...p,
          status: success ? 'disbursed' : 'failed',
          disbursedDate: success ? new Date().toISOString().split('T')[0] : null,
          utr: success ? `UTR${Date.now()}` : null,
          processedBy: currentUser.email
        };
      }
      return p;
    }));
    showNotificationMessage('Payment disbursement initiated', 'success');
  };

  const handleUpdateUTR = () => {
    if (!utrInput.trim()) {
      showNotificationMessage('Please enter a valid UTR', 'error');
      return;
    }

    setPackets(prev => prev.map(p => {
      if (p.id === selectedPacket.id) {
        return { ...p, utr: utrInput, status: 'disbursed' };
      }
      return p;
    }));

    showNotificationMessage('UTR updated successfully', 'success');
    setShowModal(false);
    setUtrInput('');
    setSelectedPacket(null);
  };

  const handleExportCSV = () => {
    const csv = [
      ['Case ID', 'Beneficiary Name', 'Aadhaar', 'Bank Account', 'IFSC', 'Amount', 'Status', 'UTR'].join(','),
      ...filteredPackets.map(p => [
        p.caseId,
        p.beneficiaryName,
        p.maskedAadhaar,
        p.bankAccount,
        p.ifsc,
        p.sanctionedAmount,
        p.status,
        p.utr || 'N/A'
      ].join(','))
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
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'validated': return 'bg-blue-100 text-blue-800';
      case 'disbursed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PacketCard = ({ packet }) => (
    <div
      onClick={() => openModal('view', packet)}
      className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-5 cursor-pointer transition-colors`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{packet.caseId}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{packet.beneficiaryName}</p>
        </div>
        <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getStatusColor(packet.status)}`}>
          {packet.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount:</span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{packet.sanctionedAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Purpose:</span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{packet.purpose}</span>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bank:</span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{packet.ifsc}</span>
        </div>
      </div>

      {packet.validationError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded mb-3">
          <p className="text-xs font-bold text-red-800">⚠ Error</p>
          <p className="text-xs text-red-700">{packet.validationError}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
          {notificationType === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {notificationMessage}
        </div>
      )}

      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border-b`}>
        <div className="px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}
              >
                {isSidebarOpen ? <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} /> : <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />}
              </button>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Treasury DBT Portal</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tiruppur District</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg w-80 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button className={`p-2.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} relative`}>
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className={`p-2.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <Settings className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  TO
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white transition-all duration-300 overflow-hidden min-h-screen`}>
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-6 px-2">
              <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-base">DBT Portal</h2>
              </div>
            </div>

            <nav className="space-y-1 mb-6">
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 bg-gray-800 rounded font-medium text-sm">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-gray-800 rounded font-medium text-sm text-gray-400">
                <FileText className="w-5 h-5" />
                <span>All Packets</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-gray-800 rounded font-medium text-sm text-gray-400">
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-gray-800 rounded font-medium text-sm text-gray-400">
                <Activity className="w-5 h-5" />
                <span>Audit Logs</span>
              </button>
            </nav>

            <div className="border-t border-gray-800 pt-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1 px-2">
                    <span className="text-sm text-gray-400">Disbursed</span>
                    <span className="text-xl font-bold text-green-400">{stats.disbursed}</span>
                  </div>
                  <p className="text-xs text-gray-500 px-2">This month</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1 px-2">
                    <span className="text-sm text-gray-400">Pending</span>
                    <span className="text-xl font-bold text-yellow-400">{stats.pending}</span>
                  </div>
                  <p className="text-xs text-gray-500 px-2">Awaiting action</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {!selectedPacket ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>PENDING</span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stats.pending}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Awaiting Validation</p>
                  <p className="text-sm text-yellow-600 font-medium">Action required</p>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>VALIDATED</span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stats.validated}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Ready for Disbursement</p>
                  <p className="text-sm text-blue-600 font-medium">Approved packets</p>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>DISBURSED</span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stats.disbursed}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>₹{stats.disbursedAmount.toLocaleString()}</p>
                  <p className="text-sm text-green-600 font-medium">Successfully paid</p>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-5 shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>FAILED</span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stats.failed}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Validation Errors</p>
                  <p className="text-sm text-red-600 font-medium">Needs attention</p>
                </div>
              </div>

              {/* Packets Queue */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
                <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex px-1">
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`flex-1 py-4 px-4 font-semibold text-sm ${
                        activeTab === 'pending' 
                          ? 'text-yellow-600 border-b-2 border-yellow-600' 
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Pending ({stats.pending})
                    </button>
                    <button
                      onClick={() => setActiveTab('validated')}
                      className={`flex-1 py-4 px-4 font-semibold text-sm ${
                        activeTab === 'validated' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Validated ({stats.validated})
                    </button>
                    <button
                      onClick={() => setActiveTab('disbursed')}
                      className={`flex-1 py-4 px-4 font-semibold text-sm ${
                        activeTab === 'disbursed' 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Disbursed ({stats.disbursed})
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
                        placeholder="Search by case ID or beneficiary name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                    </div>
                    <button 
                      onClick={handleExportCSV}
                      className={`px-4 py-2 border rounded flex items-center space-x-2 ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Packets Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredPackets.map((packet) => (
                      <PacketCard key={packet.id} packet={packet} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </main>
      </div>

            {/* Modal */}
      {showModal && selectedPacket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {modalType === 'view' && 'Packet Details'}
                {modalType === 'utr' && 'Update UTR'}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'view' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Case ID</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{selectedPacket.caseId}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPacket.status)}`}>
                        {selectedPacket.status}
                      </span>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Beneficiary Name</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.beneficiaryName}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Masked Aadhaar</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.maskedAadhaar}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bank Account</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.bankAccount}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>IFSC Code</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.ifsc}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sanctioned Amount</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>₹{selectedPacket.sanctionedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Purpose</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.purpose}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Received Date</label>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.receivedDate}</p>
                    </div>
                    {selectedPacket.utr && (
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>UTR</label>
                        <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.utr}</p>
                      </div>
                    )}
                    {selectedPacket.disbursedDate && (
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Disbursed Date</label>
                        <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.disbursedDate}</p>
                      </div>
                    )}
                    {selectedPacket.approvedBy && (
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Approved By</label>
                        <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.approvedBy}</p>
                      </div>
                    )}
                    {selectedPacket.processedBy && (
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Processed By</label>
                        <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPacket.processedBy}</p>
                      </div>
                    )}
                    {selectedPacket.validationError && (
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-red-500">Validation Error</label>
                        <p className="text-red-700">{selectedPacket.validationError}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    {selectedPacket.status === 'pending' && currentUser.role !== 'clerk' && (
                      <button
                        onClick={() => {
                          handleValidatePacket(selectedPacket.id);
                          setShowModal(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Validate Packet
                      </button>
                    )}
                    {selectedPacket.status === 'validated' && currentUser.role !== 'clerk' && (
                      <button
                        onClick={() => {
                          handleDisbursePayment(selectedPacket.id);
                          setShowModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Disburse Payment
                      </button>
                    )}
                    {(selectedPacket.status === 'disbursed' || selectedPacket.status === 'processing') && (
                      <button
                        onClick={() => setModalType('utr')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Update UTR
                      </button>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'utr' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Case ID: {selectedPacket.caseId}
                    </label>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Beneficiary: {selectedPacket.beneficiaryName}
                    </label>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Enter UTR (Unique Transaction Reference)
                    </label>
                    <input
                      type="text"
                      value={utrInput}
                      onChange={(e) => setUtrInput(e.target.value)}
                      placeholder="e.g., UTR2025100712345"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className={`px-4 py-2 border rounded-lg transition ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateUTR}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Update UTR
                    </button>
                  </div>
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