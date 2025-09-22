import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { SellerDashboard } from './components/pages/SellerDashboard';
import { OrganizationDashboard } from './components/pages/OrganizationDashboard';
import { ApplicationsPage } from './components/pages/ApplicationsPage';
import { OpportunitiesPage } from './components/pages/OpportunitiesPage';
import { QnaPage } from './components/pages/QnaPage';
import { CommunityPage } from './components/pages/CommunityPage';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'seller' | 'organization';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/seller"
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organization"
                element={
                  <ProtectedRoute>
                    <OrganizationDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <ApplicationsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/qna" element={<QnaPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}