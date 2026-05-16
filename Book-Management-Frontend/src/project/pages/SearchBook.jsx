import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, CheckCircle, AlertCircle, BookOpen, User, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/book';

const SearchBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bookId) return;

    setLoading(true);
    setMessage(null);
    setBook(null);

    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      if (response.data && response.data.id) {
        setBook(response.data);
        setMessage({ type: 'success', text: `Book with ID ${bookId} found successfully!` });
      } else {
        setMessage({ type: 'error', text: `Book with ID ${bookId} not found!` });
      }
    } catch {
      setMessage({ type: 'error', text: `Book with ID ${bookId} not found!` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style>{`
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Book<span className="text-blue-600">Manager</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
              <a href="/add" className="text-green-600 hover:text-green-700 transition font-medium">Add</a>
              <a href="/search" className="text-blue-600 hover:text-blue-700 transition font-medium">Search</a>
              <a href="/update" className="text-yellow-600 hover:text-yellow-700 transition font-medium">Update</a>
              <a href="/remove" className="text-red-600 hover:text-red-700 transition font-medium">Remove</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                <span>👤</span>
                <span className="text-sm">{user?.name || user?.email?.split('@')[0] || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition bg-red-500 text-white hover:bg-red-600">
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-2xl overflow-hidden animate-slide-in bg-white">
            <div className="p-6 gradient-bg text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Search Book</h2>
                  <p className="mt-1 opacity-90 text-sm">Enter Book ID to find details</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                  {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <input
                  type="number"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  placeholder="Enter Book ID"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Search className="w-5 h-5" />}
                  Search
                </button>
              </form>

              {book && (
                <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      Book Details
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="flex p-4">
                      <div className="w-32 font-semibold flex items-center gap-2">📖 Book ID</div>
                      <div className="flex-1 text-blue-600 font-bold">{book.id}</div>
                    </div>
                    <div className="flex p-4">
                      <div className="w-32 font-semibold flex items-center gap-2">📚 Book Name</div>
                      <div className="flex-1">{book.name}</div>
                    </div>
                    <div className="flex p-4">
                      <div className="w-32 font-semibold flex items-center gap-2">✍️ Author</div>
                      <div className="flex-1">{book.author}</div>
                    </div>
                    <div className="flex p-4">
                      <div className="w-32 font-semibold flex items-center gap-2">💰 Price</div>
                      <div className="flex-1 text-blue-600 font-bold">₹{book.price}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBook;