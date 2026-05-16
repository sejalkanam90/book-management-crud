import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, BookOpen, Shield, Zap, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill all fields!' });
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (password.length < 4) {
      setMessage({ type: 'error', text: 'Password must be at least 4 characters!' });
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setTimeout(() => {
      const success = signup(name, email, password);
      if (success) {
        setMessage({ type: 'success', text: 'Account created successfully!' });
        setTimeout(() => navigate('/'), 500);
      } else {
        setMessage({ type: 'error', text: 'Signup failed! Please try again.' });
      }
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style>{`
        .animate-slide-in { animation: slideIn 0.4s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Book<span className="text-blue-600">Manager</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Side */}
            <div className="hidden md:block">
              <div className="floating">
                <div className="rounded-3xl p-10 bg-white/50 backdrop-blur-sm">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-8 shadow-xl">
                    <UserPlus className="w-12 h-12 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold mb-4">
                    Join<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Us!</span>
                  </h1>
                  <p className="text-lg mb-8 leading-relaxed text-gray-600">
                    Create an account to start managing your book collection.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <span>Secure & Encrypted Data</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <span>Lightning Fast Access</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                      </div>
                      <span>Free Forever</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="rounded-3xl shadow-2xl overflow-hidden animate-slide-in bg-white">
              <div className="p-8 gradient-bg text-white text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
                  <UserPlus className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="mt-2 opacity-90">Join BookManager today</p>
              </div>

              <div className="p-8">
                {message && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span>{message.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-700">
                      <User className="w-4 h-4 text-blue-500" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-blue-500" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-700">
                      <Lock className="w-4 h-4 text-blue-500" />
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password (min 4 characters)"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Minimum 4 characters</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-700">
                      <Lock className="w-4 h-4 text-blue-500" />
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full gradient-bg text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg mt-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 font-semibold hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-400">
        <p>&copy; 2026 BookManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;