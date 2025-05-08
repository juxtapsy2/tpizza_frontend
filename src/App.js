import React from 'react';
import './App.css';
import Layout from './pages/Layouts/Layout';
import AdminLayout from './pages/Layouts/AdminLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from './routes/routes';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { PizzaProvider } from './contexts/PizzaContext';
import ProtectedRoute from './components/RouteManipulation/ProtectedRoute';
import GuestRoute from './components/RouteManipulation/GuestRoute';
import { GUEST_ONLY_ROUTES } from './constants';

// Set the base URL dynamically based on the environment
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8800";  // Fallback to local if not in production

function App() {
  return (
    <div className="font-inter">
      <Router>
        <AuthProvider>
          <PizzaProvider>
            <CartProvider>
              <Routes>
                {publicRoutes.map((route) => {
                  const Component = route.component;
                  const roles = route.roles;
                  const isProtected = roles.length > 0;
                  const isGuestOnly = roles.length === 0 && GUEST_ONLY_ROUTES.includes(route.path);
                  const element = (
                    <Layout>
                      <Component />
                    </Layout>
                  );

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        isProtected ? (<ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>)
                         : isGuestOnly ? (<GuestRoute>{element}</GuestRoute>) : (element)
                      }
                    />
                  );
                })}
                {adminRoutes.map((route) => {
                  const Component = route.component;
                  const element = (
                    <AdminLayout>
                      <Component />
                    </AdminLayout>
                  );

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.protected
                          ? <ProtectedRoute allowedRoles={route.roles}>{element}</ProtectedRoute>
                          : element
                      }
                    />
                  );
                })}
              </Routes>
            </CartProvider>
          </PizzaProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
