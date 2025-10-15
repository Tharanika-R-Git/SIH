import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import {
  Bell,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  FolderOpen,
  BarChart3,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Eye,
  IndianRupee,
  MapPin,
  UserCheck,
  Clock,
  LogOut,
  DollarSign,
  CreditCard
} from "lucide-react";
import myLogo from '../assets/my-logo.png';

// Mock data for demonstration
const initialSanctionPackets = [
  {
    id: 'SP001',
    caseId: 'CASE-2025-001',
    beneficiaryName: 'Rajesh Kumar',
    state: 'Tamil Nadu',
    district: 'Chennai',
    sanctionedAmount: 50000,
    purpose: 'Pension Payment',
    status: 'pending',
    receivedDate: '2025-10-09',
    utr: null,
  },
  {
    id: 'SP002',
    caseId: 'CASE-2025-002',
    beneficiaryName: 'Priya Sharma',
    state: 'Karnataka',
    district: 'Bangalore',
    sanctionedAmount: 75000,
    purpose: 'Subsidy Payment',
    status: 'validated',
    receivedDate: '2025-10-08',
    utr: null,
  },
  {
    id: 'SP003',
    caseId: 'CASE-2025-003',
    beneficiaryName: 'Amit Patel',
    state: 'Gujarat',
    district: 'Ahmedabad',
    sanctionedAmount: 100000,
    purpose: 'Scholarship',
    status: 'disbursed',
    receivedDate: '2025-10-07',
    utr: 'UTR2025100712345',
  },
  {
    id: 'SP004',
    caseId: 'CASE-2025-004',
    beneficiaryName: 'Sunita Devi',
    state: 'Bihar',
    district: 'Patna',
    sanctionedAmount: 25000,
    purpose: 'Welfare Scheme',
    status: 'failed',
    receivedDate: '2025-10-06',
    utr: null,
  },
  {
    id: 'SP005',
    caseId: 'CASE-2025-005',
    beneficiaryName: 'Lakshmi Iyer',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    sanctionedAmount: 60000,
    purpose: 'Medical Assistance',
    status: 'disbursed',
    receivedDate: '2025-10-05',
    utr: 'UTR2025100598765',
  }
];

// Mock data for payment status
const paymentStatusData = [
  {
    id: 'PS001',
    beneficiaryName: 'Rajesh Kumar',
    accountNumber: 'XXXXXX1234',
    bankName: 'State Bank of India',
    amount: 50000,
    status: 'completed',
    paymentDate: '2025-10-10',
    utr: 'UTR2025101012345'
  },
  {
    id: 'PS002',
    beneficiaryName: 'Priya Sharma',
    accountNumber: 'XXXXXX5678',
    bankName: 'HDFC Bank',
    amount: 75000,
    status: 'in_progress',
    paymentDate: '2025-10-11',
    utr: null
  },
  {
    id: 'PS003',
    beneficiaryName: 'Amit Patel',
    accountNumber: 'XXXXXX9012',
    bankName: 'ICICI Bank',
    amount: 100000,
    status: 'completed',
    paymentDate: '2025-10-09',
    utr: 'UTR2025100987654'
  },
  {
    id: 'PS004',
    beneficiaryName: 'Sunita Devi',
    accountNumber: 'XXXXXX3456',
    bankName: 'Punjab National Bank',
    amount: 25000,
    status: 'failed',
    paymentDate: '2025-10-08',
    utr: null
  },
  {
    id: 'PS005',
    beneficiaryName: 'Lakshmi Iyer',
    accountNumber: 'XXXXXX7890',
    bankName: 'Axis Bank',
    amount: 60000,
    status: 'completed',
    paymentDate: '2025-10-07',
    utr: 'UTR2025100754321'
  }
];

// Chart data
const monthlyData = [
  { month: "Jan", disbursed: 45, pending: 25, failed: 5, amount: 1250000 },
  { month: "Feb", disbursed: 52, pending: 22, failed: 4, amount: 1560000 },
  { month: "Mar", disbursed: 48, pending: 28, failed: 6, amount: 1830000 },
  { month: "Apr", disbursed: 65, pending: 18, failed: 3, amount: 1740000 },
  { month: "May", disbursed: 72, pending: 15, failed: 2, amount: 2160000 },
  { month: "Jun", disbursed: 85, pending: 12, failed: 1, amount: 2040000 },
  { month: "Jul", disbursed: 78, pending: 16, failed: 4, amount: 2250000 },
  { month: "Aug", disbursed: 92, pending: 8, failed: 2, amount: 2460000 },
  { month: "Sep", disbursed: 88, pending: 10, failed: 3, amount: 2340000 },
];

const stateWiseData = [
  { state: "Tamil Nadu", packets: 320, disbursed: 180, pending: 85, failed: 55, amount: 4500000 },
  { state: "Karnataka", packets: 280, disbursed: 150, pending: 75, failed: 55, amount: 3800000 },
  { state: "Gujarat", packets: 350, disbursed: 250, pending: 65, failed: 35, amount: 4200000 },
  { state: "Bihar", packets: 190, disbursed: 95, pending: 55, failed: 40, amount: 2800000 },
  { state: "Maharashtra", packets: 420, disbursed: 320, pending: 65, failed: 35, amount: 5200000 },
];

const TreasuryDBTPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState("en");
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [paymentSearchTerm, setPaymentSearchTerm] = useState('');

  const [packets, setPackets] = useState(initialSanctionPackets);

  // Stats calculation
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

  const statusDistribution = [
    { name: "Disbursed", value: stats.disbursed, color: "#10b981" },
    { name: "Validated", value: stats.validated, color: "#3b82f6" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Failed", value: stats.failed, color: "#ef4444" }
  ];

  const filteredPackets = useMemo(() => {
    return packets.filter(p => {
      const matchesSearch = p.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [packets, searchTerm, filterStatus]);

  const filteredPaymentStatus = useMemo(() => {
    return paymentStatusData.filter(p => 
      p.beneficiaryName.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
      p.accountNumber.toLowerCase().includes(paymentSearchTerm.toLowerCase())
    );
  }, [paymentSearchTerm]);

  const translations = {
    en: {
      welcome: "Welcome, Treasury Officer",
      dashboard: "Dashboard",
      packets: "All Packets",
      paymentStatus: "Payment Status",
      reports: "Reports",
      quickActions: "Quick Actions",
      notifications: "Notifications",
    },
    hi: {
      welcome: "स्वागत है, ट्रेजरी अधिकारी",
      dashboard: "डैशबोर्ड",
      packets: "सभी पैकेट",
      paymentStatus: "भुगतान स्थिति",
      reports: "रिपोर्ट",
      quickActions: "त्वरित कार्य",
      notifications: "सूचनाएं",
    },
  };

  const t = translations[language];

  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-gray-100" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200";

  // Logout function
  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/login";
  };

  const handleOpenDialog = (packet) => {
    setSelectedPacket(packet);
    setIsDialogOpen(true);
  };

  const handleValidatePacket = (packetId) => {
    setPackets(prev => prev.map(p => 
      p.id === packetId ? { ...p, status: 'validated' } : p
    ));
  };

  const handleDisbursePayment = (packetId) => {
    setPackets(prev => prev.map(p => 
      p.id === packetId ? { ...p, status: 'disbursed', utr: `UTR${Date.now()}` } : p
    ));
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
  };

  const handleRedirectToPFMS = (beneficiary) => {
    // Redirect to PFMS website
    window.open('https://pfms.nic.in/static/NewLayoutCommonContent.aspx?RequestPagename=Static/FAQ.aspx', '_blank');
  };

  // Custom Dialog Component
  const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${cardBg} rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
          {children}
        </div>
      </div>
    );
  };

  const DialogContent = ({ children, className }) => {
    return (
      <div className={className}>
        {children}
      </div>
    );
  };

  const DialogHeader = ({ children }) => {
    return (
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        {children}
        <button
          onClick={() => setIsDialogOpen(false)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <XCircle size={20} />
        </button>
      </div>
    );
  };

  const DialogTitle = ({ children }) => {
    return <h3 className="text-lg font-semibold">{children}</h3>;
  };

  const Card = ({ children, className }) => {
    return (
      <div className={`${cardBg} rounded-lg shadow-md border ${borderClass} ${className}`}>
        {children}
      </div>
    );
  };

  const Button = ({ children, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors ${className}`}
      >
        {children}
      </button>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white p-3 rounded-lg shadow-xl border border-gray-600">
          <p className="font-bold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white p-3 rounded-lg shadow-xl border border-gray-600">
          <p className="font-bold text-sm">{payload[0].name}</p>
          <p className="text-sm">Packets: {payload[0].value}</p>
          <p className="text-sm">Percentage: {((payload[0].value / stats.total) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

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
            { id: "dashboard", icon: Home, label: t.dashboard },
            { id: "packets", icon: FolderOpen, label: t.packets },
            { id: "paymentStatus", icon: CreditCard, label: t.paymentStatus },
            { id: "reports", icon: BarChart3, label: t.reports },
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
            <h1 className="text-2xl font-bold">{t.welcome}</h1>
            <p className={textSecondary}>Direct Benefit Transfer Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
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
                {/* Enhanced Bar Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Monthly Packet Trends</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={textSecondary} />
                      <YAxis stroke={textSecondary} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Bar dataKey="disbursed" fill="#10b981" radius={[16, 16, 0, 0]} />
                      <Bar dataKey="pending" fill="#f59e0b" radius={[16, 16, 0, 0]} />
                      <Bar dataKey="failed" fill="#ef4444" radius={[16, 16, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Enhanced Pie Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Packet Status Distribution</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={60}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Additional Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* State-wise Performance Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">State-wise Performance</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stateWiseData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="state" stroke={textSecondary} />
                      <YAxis stroke={textSecondary} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="disbursed" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Amount Trend Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Disbursement Trend (in Lakhs)</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={textSecondary} />
                      <YAxis stroke={textSecondary} tickFormatter={(value) => `₹${value/100000}L`} />
                      <Tooltip />
                      <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* PACKETS SECTION */}
          {activeTab === "packets" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Packets</h2>
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

              {/* Search and Export */}
              <div className={`${cardBg} p-6 rounded-xl shadow-md border ${borderClass} flex justify-between items-center`}>
                <div className="relative max-w-md">
                  <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search by Case ID or Beneficiary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border ${borderClass} rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Download size={18} /> Export CSV
                </button>
              </div>
              
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Case ID</th>
                        <th className="py-3 px-4 font-semibold">Beneficiary Name</th>
                        <th className="py-3 px-4 font-semibold">State</th>
                        <th className="py-3 px-4 font-semibold">Amount</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Date Filed</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPackets.map((packet) => (
                        <tr 
                          key={packet.id} 
                          className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}
                          onClick={() => handleOpenDialog(packet)}
                        >
                          <td className="py-3 px-4">{packet.caseId}</td>
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">
                            {packet.beneficiaryName}
                          </td>
                          <td className="py-3 px-4">{packet.state}</td>
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
                          <td className="py-3 px-4">{packet.receivedDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDialog(packet);
                                }}
                                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              {packet.status === 'pending' && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleValidatePacket(packet.id);
                                  }}
                                  className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                  title="Validate"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              )}
                              {packet.status === 'validated' && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDisbursePayment(packet.id);
                                  }}
                                  className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
                                  title="Disburse"
                                >
                                  <DollarSign size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* PAYMENT STATUS SECTION */}
          {activeTab === "paymentStatus" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Payment Status</h2>
                <div className="flex gap-4">
                  <select className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}>
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div className={`${cardBg} p-6 rounded-xl shadow-md border ${borderClass}`}>
                <div className="relative max-w-md">
                  <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search by Beneficiary Name or Account Number..."
                    value={paymentSearchTerm}
                    onChange={(e) => setPaymentSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border ${borderClass} rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                </div>
              </div>
              
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Beneficiary Name</th>
                        <th className="py-3 px-4 font-semibold">Account Number</th>
                        <th className="py-3 px-4 font-semibold">Bank Name</th>
                        <th className="py-3 px-4 font-semibold">Amount</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Payment Date</th>
                        <th className="py-3 px-4 font-semibold">UTR Number</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPaymentStatus.map((payment) => (
                        <tr 
                          key={payment.id} 
                          className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                        >
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">
                            {payment.beneficiaryName}
                          </td>
                          <td className="py-3 px-4 font-mono">{payment.accountNumber}</td>
                          <td className="py-3 px-4">{payment.bankName}</td>
                          <td className="py-3 px-4 font-medium">₹{payment.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                payment.status === "completed"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : payment.status === "failed"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {payment.status === "completed" ? "Completed" : 
                               payment.status === "in_progress" ? "In Progress" : "Failed"}
                            </span>
                          </td>
                          <td className="py-3 px-4">{payment.paymentDate}</td>
                          <td className="py-3 px-4 font-mono">
                            {payment.utr || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => handleRedirectToPFMS(payment)}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                            >
                              <Eye size={16} />
                              View in PFMS
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* REPORTS SECTION */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Reports</h2>
              
              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

              {/* Report List */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Available Reports</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Monthly Disbursement Report - Oct 2025",
                      created: "2025-10-30",
                      status: "Completed",
                      size: "2.3 MB",
                    },
                    {
                      id: 2,
                      name: "Packet Performance Summary - Q4 2025",
                      created: "2025-10-25",
                      status: "In Progress",
                      size: "1.8 MB",
                    },
                    {
                      id: 3,
                      name: "Beneficiary Analysis Report",
                      created: "2025-10-20",
                      status: "Completed",
                      size: "3.1 MB",
                    },
                  ].map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 rounded-lg border ${borderClass} flex justify-between items-center hover:shadow-md transition-shadow`}
                    >
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className={textSecondary}>Created: {report.created}</p>
                        <p className={textSecondary}>Size: {report.size}</p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            report.status === "Completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg">
                        <Download size={18} /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Packet Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Packet Details</DialogTitle>
          </DialogHeader>
          {selectedPacket && (
            <div className="space-y-4 mt-2 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Beneficiary Name</p>
                  <p className="text-lg">{selectedPacket.beneficiaryName}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Case ID</p>
                  <p className="text-lg">{selectedPacket.caseId}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">State</p>
                  <p className="text-lg">{selectedPacket.state}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">District</p>
                  <p className="text-lg">{selectedPacket.district}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{selectedPacket.sanctionedAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Date Filed</p>
                  <p className="text-lg">{selectedPacket.receivedDate}</p>
                </div>
                {selectedPacket.utr && (
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-500 dark:text-gray-400">UTR Number</p>
                    <p className="text-lg font-mono">{selectedPacket.utr}</p>
                  </div>
                )}
              </div>
              <Button className="mt-4 w-full" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button> 

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TreasuryDBTPortal;