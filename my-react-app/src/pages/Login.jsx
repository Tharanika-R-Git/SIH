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
  const [isErrorShaking, setIsErrorShaking] = useState(false);

  // ✅ Hardcoded credentials (replace with API integration later)
  const credentials = {
    police: { id: 'police123', password: 'police@123', path: '/police-dashboard' },
    tahsildar: { id: 'tahsildar123', password: 'tahsildar@123', path: '/tahsildar-dashboard' },
    welfare: { id: 'welfare123', password: 'welfare@123', path: '/welfare-dashboard' },
    treasury: { id: 'treasury123', password: 'treasury@123', path: '/treasury-dashboard' },
    Admin: { id: 'admin123', password: 'admin@123', path: '/admin-dashboard' },
  };

  const officialRoles = [
    { value: 'police', label: 'Police Department', color: 'bg-blue-600' },
    { value: 'tahsildar', label: 'Tahsildar Office', color: 'bg-green-600' },
    { value: 'welfare', label: 'Social Welfare Department', color: 'bg-purple-600' },
    { value: 'treasury', label: 'Treasury Department', color: 'bg-red-600' },
    { value: 'Admin', label: 'Admin', color: 'bg-orange-600' },
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

  // ✅ Auto-fill credentials when official type is selected
  useEffect(() => {
    if (officialType && credentials[officialType]) {
      const user = credentials[officialType];
      setOfficialId(user.id);
      setPassword(user.password);
      setError('');
    }
  }, [officialType]);

  const triggerErrorAnimation = () => {
    setIsErrorShaking(true);
    setTimeout(() => setIsErrorShaking(false), 400);
  };

  const handleLogin = () => {
    setError('');

    if (!officialType) {
      setError('Please select your department.');
      triggerErrorAnimation();
      return;
    }
    if (!officialId.trim()) {
      setError('Please enter your Official ID.');
      triggerErrorAnimation();
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      triggerErrorAnimation();
      return;
    }

    const user = credentials[officialType];
    if (user && officialId === user.id && password === user.password) {
      // Simulate login delay for UX feedback
      setTimeout(() => navigate(user.path), 500);
    } else {
      setError('Invalid credentials. Please check your ID or password.');
      triggerErrorAnimation();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2zM36 4V0h-2v4h-4v2h4v4h2V6h4V4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2zM6 4V0H4v4H0v2h4v4h2V6h4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Login Card */}
      <div className={`w-full max-w-md relative z-10 ${isErrorShaking ? 'animate-shake' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img src={myLogo} alt="Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Jan Mitra</h1>
          <p className="text-gray-300 text-sm mb-1">Direct Benefit Transfer System</p>
          <p className="text-xs text-gray-400">PCR Act & PoA Act Implementation</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Official Login</h2>
            <p className="text-gray-400">Access your department dashboard</p>
          </div>

          <div className="space-y-6">
            {/* Department Dropdown */}
            <div ref={dropdownRef} className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Department / Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3.5 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700 text-left flex items-center justify-between transition-all hover:border-slate-500"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className={officialType ? 'text-white font-medium' : 'text-gray-400'}>
                    {officialType
                      ? officialRoles.find((r) => r.value === officialType)?.label
                      : 'Select your department'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute z-20 w-full mt-2 bg-slate-700 border border-slate-600 rounded-xl shadow-lg overflow-hidden"
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
                        className="w-full px-4 py-3.5 text-left hover:bg-slate-600 transition-colors flex items-center space-x-3 border-b border-slate-600 last:border-b-0"
                      >
                        <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                        <span className="text-gray-300 font-medium">{role.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Official ID */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Official ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={officialId}
                  onChange={(e) => {
                    setOfficialId(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your official ID"
                  className="w-full pl-10 pr-4 py-3.5 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400 transition-all hover:border-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3.5 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400 transition-all hover:border-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-3 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 font-medium">Ministry of Social Justice & Empowerment</p>
          <p className="text-xs text-gray-500 mt-2">Government of India | Secure Portal</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}