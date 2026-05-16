import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Search, Save, CheckCircle, AlertCircle, BookOpen, RefreshCw, User, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/book';

const UpdateBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); //user //logout
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({ name: '', author: '', price: '' });  //data store
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //featch all books for display
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/getbooks`);
      setBooks(response.data);
    } catch {
      console.error('Error fetching books');
    }
  };

  
  useEffect(() => {
    fetchBooks();
  }, []);

  //user logout function
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //search book by id
  const handleSearch = async (e) => {  
    e.preventDefault();
    if (!bookId) return;

    setLoading(true);
    setMessage(null);
    setBook(null);

    //fetch book details by id 
    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      if (response.data && response.data.id) {
        setBook(response.data);
        setFormData({ 
          name: response.data.name, 
          author: response.data.author, 
          price: response.data.price 
        });
        setMessage({ type: 'success', text: `Book with ID ${bookId} found! You can now update.` });
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

  //update book details
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${API_URL}/updatebook`, {  //put request
        id: book.id,
        name: formData.name,
        author: formData.author,
        price: parseFloat(formData.price)
      });
      setMessage({ type: 'success', text: `Book with ID ${book.id} updated successfully!` });
      fetchBooks();  //refresh
      setBook(null); //clear
      setBookId(''); 
      setFormData({ name: '', author: '', price: '' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update book!' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  
  const handleEditClick = (selectedBook) => {
    setBookId(selectedBook.id);
    setBook(selectedBook);
    setFormData({
      name: selectedBook.name,
      author: selectedBook.author,
      price: selectedBook.price
    });
    setMessage({ type: 'success', text: `Book "${selectedBook.name}" loaded for editing!` });
    setTimeout(() => setMessage(null), 3000);
    document.getElementById('updateForm')?.scrollIntoView({ behavior: 'smooth' });
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
          {/* Search Section */}
          <div className="rounded-2xl shadow-2xl overflow-hidden animate-slide-in mb-8 bg-white">
            <div className="p-6 gradient-bg text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Edit className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Update Book</h2>
                  <p className="mt-1 opacity-90 text-sm">Search by ID to update book details</p>
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

              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="number"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  placeholder="Enter Book ID to search"
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
            </div>
          </div>

          {/* Update Form */}
          {book && (
            <div id="updateForm" className="rounded-2xl shadow-2xl overflow-hidden animate-slide-in mb-8 bg-white">
              <div className="p-4 bg-green-500 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Edit Book Details
                </h3>
              </div>
              <div className="p-6 md:p-8">
                <form onSubmit={handleUpdate} className="space-y-5">
                  <div>
                    <label className="block font-semibold mb-2 text-sm text-gray-700">Book ID</label>
                    <input type="text" value={book.id} readOnly className="w-full px-4 py-3 rounded-xl border-2 bg-gray-100 border-gray-200 text-gray-500" />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-sm text-gray-700">Book Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-sm text-gray-700">Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-sm text-gray-700">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required />
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Save className="w-5 h-5" />}
                    Update Book
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Current Books Table */}
          <div className="rounded-2xl shadow-2xl overflow-hidden bg-white">
            <div className="p-4 gradient-bg text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Current Books
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
                    books.map((b) => (
                      <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="p-3 font-medium">{b.id}</td>
                        <td className="p-3">{b.name}</td>
                        <td className="p-3">{b.author}</td>
                        <td className="p-3 text-blue-600 font-bold">₹{b.price}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleEditClick(b)}
                            className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition flex items-center gap-1 mx-auto"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
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

export default UpdateBook;