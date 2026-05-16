import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, CheckCircle, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/book';

const RemoveBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/getbooks`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setMessage({ type: 'error', text: '❌ Failed to connect to server!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    
    if (!bookId) {
      setMessage({ type: 'error', text: '❌ Please enter a Book ID!' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const id = parseInt(bookId);
    const bookExists = books.some(book => book.id === id);
    
    if (!bookExists) {
      setMessage({ type: 'error', text: `❌ Book with ID ${bookId} not found!` });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await axios.delete(`${API_URL}/delete/${bookId}`);
      setMessage({ type: 'success', text: `✅ Book with ID ${bookId} removed successfully!` });
      setBookId('');
      fetchBooks();
    } catch {
      setMessage({ type: 'error', text: '❌ Failed to remove book!' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteFromTable = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setMessage({ type: 'success', text: `✅ Book "${name}" removed successfully!` });
        fetchBooks();
      } catch {
        setMessage({ type: 'error', text: '❌ Failed to remove book!' });
      } finally {
        setTimeout(() => setMessage(null), 3000);
      }
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
        <div className="max-w-6xl mx-auto">
          {/* Remove Form */}
          <div className="rounded-2xl shadow-2xl overflow-hidden animate-slide-in mb-8 bg-white">
            <div className="p-6 bg-red-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Remove Book</h2>
                  <p className="mt-1 opacity-90 text-sm">Enter Book ID to remove from library</p>
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

              <form onSubmit={handleRemove} className="flex gap-3">
                <input
                  type="number"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  placeholder="Enter Book ID"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Trash2 className="w-5 h-5" />}
                  Remove
                </button>
              </form>
            </div>
          </div>

          {/* Current Books Table */}
          <div className="rounded-2xl shadow-2xl overflow-hidden bg-white">
            <div className="p-4 gradient-bg text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Current Books in Library
              </h3>
              <button onClick={fetchBooks} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Book Name</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {books.length === 0 ? (
                    <tr className="border-b border-gray-200">
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        No books found in library
                       </td>
                     </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="p-3 font-medium">{book.id}</td>
                        <td className="p-3">{book.name}</td>
                        <td className="p-3">{book.author}</td>
                        <td className="p-3 text-blue-600 font-bold">₹{book.price}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteFromTable(book.id, book.name)}
                            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition flex items-center gap-1 mx-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBook;