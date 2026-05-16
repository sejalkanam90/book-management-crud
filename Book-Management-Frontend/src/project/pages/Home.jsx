import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, TrendingUp, Award, Shield, Zap, Clock, 
  Headphones, Plus, Search, Edit, Trash2, Star, Quote,
  Mail, Phone, MapPin, ArrowRight, ChevronRight, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Static Books Data
  const featuredBooks = [
    { 
      id: 1, 
      title: 'Java', 
      author: 'James Gosling', 
      price: '₹700', 
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop', 
      rating: 5 
    },
    { 
      id: 3, 
      title: 'Wings of Fire', 
      author: 'A.P.J Abdul Kalam', 
      price: '₹350', 
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop', 
      rating: 5 
    },
    { 
      id: 4, 
      title: 'Ikigai', 
      author: 'Hector Garcia', 
      price: '₹800', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop', 
      rating: 5 
    }
  ];

  const statsData = [
    { icon: BookOpen, value: '1,248+', label: 'Total Books', color: '#3b82f6' },
    { icon: Users, value: '5,678+', label: 'Active Readers', color: '#10b981' },
    { icon: TrendingUp, value: '24+', label: 'Categories', color: '#f59e0b' },
    { icon: Award, value: '98%', label: 'Satisfaction', color: '#ef4444' }
  ];

  const features = [
    { icon: Shield, title: 'Secure Data', desc: 'Enterprise-grade encryption for your book data', color: '#3b82f6' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Quick search and retrieval in milliseconds', color: '#f59e0b' },
    { icon: Clock, title: 'Real-time Sync', desc: 'Instant updates across all devices', color: '#10b981' },
    { icon: Headphones, title: '24/7 Support', desc: 'Round the clock customer assistance', color: '#8b5cf6' }
  ];

  const actions = [
    { icon: Plus, title: 'Add Book', desc: 'Add new books to your library', link: '/add', bg: '#dbeafe', text: '#2563eb' },
    { icon: Search, title: 'Search Book', desc: 'Find books by title or author', link: '/search', bg: '#d1fae5', text: '#059669' },
    { icon: Edit, title: 'Update Book', desc: 'Modify book information', link: '/update', bg: '#fed7aa', text: '#ea580c' },
    { icon: Trash2, title: 'Remove Book', desc: 'Delete books from system', link: '/remove', bg: '#fee2e2', text: '#dc2626' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Head Librarian', text: 'This system has revolutionized our library management. Incredible efficiency!', rating: 5 },
    { name: 'Michael Chen', role: 'Book Store Owner', text: 'Best book management platform I\'ve ever used. Highly recommended!', rating: 5 },
    { name: 'Emily Davis', role: 'School Administrator', text: 'Easy to use and very professional. Our staff loves it!', rating: 5 }
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .float-delayed { animation: float 6s ease-in-out infinite 2s; }
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
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
              <a href="#home" className="text-gray-600 hover:text-gray-900 transition">Home</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#books" className="text-gray-600 hover:text-gray-900 transition">Books</a>
              <div className="w-px h-6 bg-gray-300"></div>
              <a href="/add" className="text-green-600 hover:text-green-700 transition font-medium">Add</a>
              <a href="/search" className="text-blue-600 hover:text-blue-700 transition font-medium">Search</a>
              <a href="/update" className="text-yellow-600 hover:text-yellow-700 transition font-medium">Update</a>
              <a href="/remove" className="text-red-600 hover:text-red-700 transition font-medium">Remove</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                <Users className="w-4 h-4" />
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="animate-on-scroll">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm mb-6">
                  <Sparkles className="w-4 h-4" />
                  Welcome to BookManager
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Manage Your <span className="gradient-text">Book Collection</span>
                  <br />With Ease
                </h1>
                <p className="text-lg mb-8 text-gray-600">
                  Streamline your library management with our modern, intuitive platform. 
                  Add, search, update, and track thousands of books effortlessly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/add" className="gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all flex items-center gap-2">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="#features" className="px-8 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="float-animation">
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=500&fit=crop"
                  alt="Library"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 float-delayed">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=180&h=140&fit=crop"
                  alt="Reading"
                  className="rounded-xl shadow-lg w-32 h-24 object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 float-animation">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=180&h=140&fit=crop"
                  alt="Books"
                  className="rounded-xl shadow-lg w-32 h-24 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 text-center transition-all hover:scale-105 animate-on-scroll bg-white shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3" style={{ color: stat.color }} />
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Quick Actions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600">Perform library operations with just a click</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 text-center transition-all hover:-translate-y-2 animate-on-scroll bg-white shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110" style={{ backgroundColor: action.bg }}>
                  <action.icon style={{ color: action.text, width: 32, height: 32 }} />
                </div>
                <h4 className="text-xl font-bold mb-2">{action.title}</h4>
                <p className="text-sm mb-4 text-gray-500">{action.desc}</p>
                <a href={action.link} className="inline-flex items-center gap-2 font-semibold transition hover:gap-3" style={{ color: action.text }}>
                  {action.title} Now <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 text-center transition-all hover:-translate-y-2 animate-on-scroll bg-white shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${feature.color}20` }}>
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h5 className="text-lg font-bold mb-2">{feature.title}</h5>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="books" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Books</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600">Discover our most popular collections</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book, index) => (
              <div 
                key={book.id}
                className="rounded-2xl overflow-hidden transition-all hover:scale-105 animate-on-scroll bg-white shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-bold text-xl mb-1">{book.title}</h4>
                  <p className="text-sm mb-2 text-gray-500">
                    by {book.author}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(book.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-xl">{book.price}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                      ID: {book.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="w-10 h-10 opacity-50 mb-4" />
                <p className="mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="font-semibold">{testimonial.name}</h6>
                    <p className="text-sm opacity-75">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="rounded-3xl p-12 animate-on-scroll gradient-bg text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 opacity-90">Join thousands of libraries using our platform</p>
            <a href="/add" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:gap-3">
              Add Your First Book <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <h5 className="text-white font-bold text-lg">BookManager</h5>
              </div>
              <p className="text-sm">Modern Book Management System for efficient library management.</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="hover:text-blue-400 transition">🐙</a>
                <a href="#" className="hover:text-blue-400 transition">🐦</a>
                <a href="#" className="hover:text-blue-400 transition">🔗</a>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/add" className="hover:text-blue-400 transition">Add Book</a></li>
                <li><a href="/search" className="hover:text-blue-400 transition">Search Book</a></li>
                <li><a href="/update" className="hover:text-blue-400 transition">Update Book</a></li>
                <li><a href="/remove" className="hover:text-blue-400 transition">Remove Book</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Info</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@bookmanager.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (234) 567-890</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Mumbai, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 BookManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;