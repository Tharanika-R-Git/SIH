import React, { useState } from "react";
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
} from "recharts";
import {
  Bell,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  FolderOpen,
  BarChart3,
  Zap,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Download,
  ClipboardList,
  Send,
  PlusCircle,
  X,
} from "lucide-react";

const WelfareDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState("en");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dummy data
  const caseStats = { total: 1247, pending: 342, approved: 678, rejected: 227 };

  const monthlyData = [
    { month: "Jan", approved: 45, rejected: 12, pending: 8 },
    { month: "Feb", approved: 52, rejected: 15, pending: 10 },
    { month: "Mar", approved: 61, rejected: 18, pending: 12 },
    { month: "Apr", approved: 58, rejected: 14, pending: 9 },
    { month: "May", approved: 72, rejected: 20, pending: 14 },
    { month: "Jun", approved: 68, rejected: 16, pending: 11 },
  ];

  const statusDistribution = [
    { name: "Approved", value: 678, color: "#10b981" },
    { name: "Pending", value: 342, color: "#f59e0b" },
    { name: "Rejected", value: 227, color: "#ef4444" },
  ];

  const quickActionsData = [
    {
      id: 1,
      icon: FileText,
      title: "Generate Case Report",
      desc: "Download monthly case reports",
      action: "Download",
    },
    {
      id: 2,
      icon: PlusCircle,
      title: "Register New Case",
      desc: "Add a new victim case record",
      action: "Add",
    },
    {
      id: 3,
      icon: Send,
      title: "Send Notification",
      desc: "Notify welfare officers",
      action: "Send",
    },
    {
      id: 4,
      icon: ClipboardList,
      title: "Review Pending",
      desc: "Check and approve pending cases",
      action: "Review",
    },
  ];

  // Dummy case data - updated with act and amount fields
  const casesData = [
    { id: 101, victim: "Asha Devi", district: "Madurai", status: "Pending", date: "2025-09-21", act: "PoA Act 1989", amount: "₹0" },
    { id: 102, victim: "Ravi Kumar", district: "Madurai", status: "Approved", date: "2025-09-19", act: "PCR Act 2018", amount: "₹3,00,000" },
    { id: 103, victim: "Meena Raj", district: "Madurai", status: "Rejected", date: "2025-09-15", act: "PoA Act 1989", amount: "₹0" },
    { id: 104, victim: "Ramesh", district: "Madurai", status: "Approved", date: "2025-09-10", act: "PoA Act 1989", amount: "₹5,00,000" },
    { id: 105, victim: "Priya S", district: "Madurai", status: "Pending", date: "2025-09-08", act: "PCR Act 2018", amount: "₹0" },
  ];

  // Dummy report data
  const reportsData = [
    {
      id: 1,
      name: "Monthly Status Report - Sept 2025",
      created: "2025-09-30",
      status: "Completed",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Case Performance Summary - Q3 2025",
      created: "2025-09-25",
      status: "In Progress",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Victim Rehabilitation Report",
      created: "2025-09-20",
      status: "Completed",
      size: "3.1 MB",
    },
  ];

  const translations = {
    en: {
      welcome: "Welcome, Officer Kumar",
      dashboard: "Dashboard",
      cases: "Cases",
      reports: "Reports",
      quickActions: "Quick Actions",
      notifications: "Notifications",
    },
    hi: {
      welcome: "स्वागत है, अधिकारी कुमार",
      dashboard: "डैशबोर्ड",
      cases: "मामले",
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

  // Custom Dialog Component (replacement for Shadcn Dialog)
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
          <X size={20} />
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

  const handleOpenDialog = (caseItem) => {
    setSelectedCase(caseItem);
    setIsDialogOpen(true);
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
          <p className="text-sm">Cases: {payload[0].value}</p>
          <p className="text-sm">Percentage: {((payload[0].value / 1247) * 100).toFixed(1)}%</p>
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
          {!sidebarCollapsed && <h2 className="text-xl font-bold">Welfare Dept</h2>}
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
            { id: "cases", icon: FolderOpen, label: t.cases },
            { id: "reports", icon: BarChart3, label: t.reports },
            { id: "actions", icon: Zap, label: t.quickActions },
            { id: "notifications", icon: Bell, label: t.notifications },
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
            <p className={textSecondary}>PoA/PCR Victim Compensation Portal</p>
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
              className={`p-2 rounded-lg ${cardBg} border ${borderClass} hover:shadow-md transition-all`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
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
                  <h3 className={textSecondary}>Total Cases</h3>
                  <p className="text-4xl font-bold mt-2">{caseStats.total}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <AlertTriangle className="text-orange-500" size={32} />
                  <h3 className={textSecondary}>Pending Review</h3>
                  <p className="text-4xl font-bold mt-2 text-orange-500">{caseStats.pending}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <CheckCircle className="text-green-600" size={32} />
                  <h3 className="text-green-700">Approved</h3>
                  <p className="text-4xl font-bold mt-2 text-green-600">{caseStats.approved}</p>
                </div>

                <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderClass} hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                  <XCircle className="text-red-600" size={32} />
                  <h3 className="text-red-700">Rejected</h3>
                  <p className="text-4xl font-bold mt-2 text-red-600">{caseStats.rejected}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Monthly Case Trends</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={textSecondary} />
                      <YAxis stroke={textSecondary} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Bar dataKey="approved" fill="#10b981" radius={[16, 16, 0, 0]} />
                      <Bar dataKey="rejected" fill="#ef4444" radius={[16, 16, 0, 0]} />
                      <Bar dataKey="pending" fill="#f59e0b" radius={[16, 16, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className={`${cardBg} p-8 rounded-2xl shadow-lg border ${borderClass} hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-bold">Case Status Distribution</h3>
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
            </div>
          )}

          {/* CASES SECTION - Updated with enhanced case list */}
          {activeTab === "cases" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Case Records</h2>
                <div className="flex gap-4">
                  <select className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}>
                    <option>All Districts</option>
                    <option>Madurai</option>
                    <option>Coimbatore</option>
                    <option>Salem</option>
                  </select>
                  <select className={`px-4 py-2 rounded-lg ${cardBg} border ${borderClass}`}>
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>
              
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${borderClass}`}>
                        <th className="py-3 px-4 font-semibold">Case ID</th>
                        <th className="py-3 px-4 font-semibold">Victim Name</th>
                        <th className="py-3 px-4 font-semibold">District</th>
                        <th className="py-3 px-4 font-semibold">Act</th>
                        <th className="py-3 px-4 font-semibold">Amount</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Date Filed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {casesData.map((caseItem) => (
                        <tr 
                          key={caseItem.id} 
                          className={`border-b ${borderClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}
                          onClick={() => handleOpenDialog(caseItem)}
                        >
                          <td className="py-3 px-4">{caseItem.id}</td>
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">
                            {caseItem.victim}
                          </td>
                          <td className="py-3 px-4">{caseItem.district}</td>
                          <td className="py-3 px-4">{caseItem.act}</td>
                          <td className="py-3 px-4 font-medium">{caseItem.amount}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                caseItem.status === "Approved"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : caseItem.status === "Rejected"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {caseItem.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{caseItem.date}</td>
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
            <div>
              <h2 className="text-2xl font-bold mb-4">Reports</h2>
              <div className="space-y-4">
                {reportsData.map((r) => (
                  <div
                    key={r.id}
                    className={`${cardBg} p-6 rounded-xl shadow-md border ${borderClass} flex justify-between items-center hover:shadow-lg transition-shadow`}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{r.name}</h3>
                      <p className={textSecondary}>Created: {r.created}</p>
                      <p className={textSecondary}>Size: {r.size}</p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                          r.status === "Completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg">
                      <Download size={18} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUICK ACTIONS SECTION */}
          {activeTab === "actions" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{t.quickActions}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActionsData.map((action) => (
                  <div
                    key={action.id}
                    className={`${cardBg} p-6 rounded-xl shadow-md border ${borderClass} hover:shadow-lg hover:-translate-y-1 transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                        <action.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold">{action.title}</h3>
                    </div>
                    <p className={textSecondary}>{action.desc}</p>
                    <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all font-medium">
                      {action.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Case Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Case Details</DialogTitle>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-4 mt-2 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Victim Name</p>
                  <p className="text-lg">{selectedCase.victim}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Case ID</p>
                  <p className="text-lg">{selectedCase.id}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Act</p>
                  <p className="text-lg">{selectedCase.act}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Amount</p>
                  <p className={`text-lg font-bold ${
                    selectedCase.amount === "₹0" ? "text-red-600" : "text-green-600"
                  }`}>
                    {selectedCase.amount}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCase.status === "Approved"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : selectedCase.status === "Rejected"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {selectedCase.status}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Date Filed</p>
                  <p className="text-lg">{selectedCase.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-gray-500 dark:text-gray-400">District</p>
                  <p className="text-lg">{selectedCase.district}</p>
                </div>
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

export default WelfareDashboard;