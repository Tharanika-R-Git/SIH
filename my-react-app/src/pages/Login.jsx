import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, ChevronDown } from 'lucide-react';

export default function DBTOfficialLogin() {
  const navigate = useNavigate();

  const [officialType, setOfficialType] = useState('');
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Hardcoded credentials (you can replace these with API checks later)
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
    { value: 'treasury', label: 'Treasury Department', color: 'bg-red-600' }
  ];

  const handleLogin = () => {
    setError('');

    if (!officialType) return setError('Please select your department');
    if (!officialId) return setError('Please enter your Official ID');
    if (!password) return setError('Please enter your password');

    const user = credentials[officialType];
    if (user && officialId === user.id && password === user.password) {
      // ✅ Login success — navigate to department dashboard
      navigate(user.path);
    } else {
      setError('Invalid credentials. Please check your ID or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DBT Portal</h1>
          <p className="text-gray-600 text-sm">Direct Benefit Transfer System</p>
          <p className="text-xs text-gray-500 mt-1">PCR Act & PoA Act Implementation</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Official Login</h2>
            <p className="text-sm text-gray-500">Access your department dashboard</p>
          </div>

          <div className="space-y-5">
            {/* Department Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department / Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
                >
                  <span className={officialType ? 'text-gray-900' : 'text-gray-400'}>
                    {officialType
                      ? officialRoles.find(r => r.value === officialType)?.label
                      : 'Select your department'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {officialRoles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => {
                          setOfficialType(role.value);
                          setIsDropdownOpen(false);
                          setError('');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
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
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleLogin();
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Ministry of Social Justice & Empowerment</p>
          <p className="text-xs text-gray-400 mt-1">Government of India | Secure Portal</p>
        </div>
      </div>
    </div>
  );
}
