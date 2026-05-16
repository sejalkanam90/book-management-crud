import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Plus, User, IndianRupee, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/book';

const AddBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({ name: '', author: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //user logout function
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };


  //redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    //validation
    if (!formData.name || !formData.author || !formData.price) {
      setMessage({ type: 'error', text: 'Please fill all fields!' });
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    //submit data to backend
    try {
      await axios.post(API_URL, {
        name: formData.name,
        author: formData.author,
        price: Number(formData.price) 
      });

      setMessage({ type: 'success', text: 'Book Added Successfully!' });

     
      setFormData({ name: '', author: '', price: '' }); //reset after submit

      setLoading(false);

     
      setTimeout(() => {
        setMessage(null); //clear 
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to add book!' });
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

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

            {/* Header */}
            <div className="p-6 gradient-bg text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Add New Book</h2>
                  <p className="mt-1 opacity-90 text-sm">Fill in the details to add a new book to the library</p>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter book name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" required />
                <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Enter author name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" required />

                <button type="submit" disabled={loading} className="w-full gradient-bg text-white py-3 rounded-xl">
                  {loading ? 'Adding Book...' : 'Add Book'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;