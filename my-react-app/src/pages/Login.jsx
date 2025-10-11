import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/my-logo.png';
import { Shield, Lock, User, AlertCircle, ChevronDown, Eye, EyeOff } from 'lucide-react';

export default function DBTOfficialLogin() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [officialType, setOfficialType] = useState('');
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Hardcoded credentials (replace with API integration later)
  const credentials = {
    police: { id: 'police123', password: 'police@123', path: '/police-dashboard' },
    tahsildar: { id: 'tahsildar123', password: 'tahsildar@123', path: '/tahsildar-dashboard' },
    welfare: { id: 'welfare123', password: 'welfare@123', path: '/welfare-dashboard' },
    collector: { id: 'collector123', password: 'collector@123', path: '/collector-dashboard' },
    treasury: { id: 'treasury123', password: 'treasury@123', path: '/treasury-dashboard' },
  };

  const officialRoles = [
    { value: 'police', label: 'Police Department', color: 'bg-blue-600' },
    { value: 'tahsildar', label: 'Tahsildar Office', color: 'bg-green-600' },
    { value: 'welfare', label: 'Social Welfare Department', color: 'bg-purple-600' },
    { value: 'collector', label: 'District Collector', color: 'bg-orange-600' },
    { value: 'treasury', label: 'Treasury Department', color: 'bg-red-600' },
  ];

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    setError('');

    if (!officialType) return setError('Please select your department.');
    if (!officialId.trim()) return setError('Please enter your Official ID.');
    if (!password.trim()) return setError('Please enter your password.');

    const user = credentials[officialType];
    if (user && officialId === user.id && password === user.password) {
      // Simulate login delay for UX feedback
      setTimeout(() => navigate(user.path), 500);
    } else {
      setError('Invalid credentials. Please check your ID or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2zM36 4V0h-2v4h-4v2h4v4h2V6h4V4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2zM6 4V0H4v4H0v2h4v4h2V6h4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={myLogo} alt="Logo" className="mx-auto mb-4 w-16 h-16" />
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Jan Mithra</h1>
          <p className="text-gray-600 text-sm">Direct Benefit Transfer System</p>
          <p className="text-xs text-gray-500 mt-1">PCR Act & PoA Act Implementation</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Official Login</h2>
            <p className="text-sm text-gray-500">Access your department dashboard</p>
          </div>

          <div className="space-y-5">
            {/* Department Dropdown */}
            <div ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department / Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-left flex items-center justify-between transition-all"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className={officialType ? 'text-gray-900' : 'text-gray-400'}>
                    {officialType
                      ? officialRoles.find((r) => r.value === officialType)?.label
                      : 'Select your department'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-slideDown"
                    role="listbox"
                  >
                    {officialRoles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => {
                          setOfficialType(role.value);
                          setIsDropdownOpen(false);
                          setError('');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                        <span className="text-gray-700">{role.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Official ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Official ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={officialId}
                  onChange={(e) => {
                    setOfficialId(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your official ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
<div className="mb-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>

      {/* Input container */}
      <div className="relative">
        {/* Lock icon */}
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        {/* Password input */}
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter your password"
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />

        {/* Eye toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>

            {/* Sign In */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Ministry of Social Justice & Empowerment</p>
          <p className="text-gray-400 mt-1">Government of India | Secure Portal</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
        @keyframes slideDown { from {opacity:0; transform:translateY(-10px);} to {opacity:1; transform:translateY(0);} }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}
