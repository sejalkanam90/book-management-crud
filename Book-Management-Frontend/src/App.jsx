import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './project/context/AuthContext';
import Home from './project/pages/Home';
import Login from './project/pages/Login';
import Signup from './project/pages/Signup';
import AddBook from './project/pages/AddBook';
import SearchBook from './project/pages/SearchBook';
import UpdateBook from './project/pages/UpdateBook';
import RemoveBook from './project/pages/RemoveBook';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/add" element={
        <ProtectedRoute>
          <AddBook />
        </ProtectedRoute>
      } />
      <Route path="/search" element={
        <ProtectedRoute>
          <SearchBook />
        </ProtectedRoute>
      } />
      <Route path="/update" element={
        <ProtectedRoute>
          <UpdateBook />
        </ProtectedRoute>
      } />
      <Route path="/remove" element={
        <ProtectedRoute>
          <RemoveBook />
        </ProtectedRoute>
      } />
    
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;



// import React from 'react'
// import FormHandling from './learn react/FormHandling'

// const App = () => {
//   return (
//     <div>
//       <FormHandling/>
      
//     </div>
//   )
// }

// export default App
