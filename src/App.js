import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, } from './routes/routes';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';

// Set the base URL dynamically based on the environment
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8800";  // Fallback to local if not in production

function App() {
  return (
    <div className="font-inter">
      <Router>
        <AuthProvider>
          <Routes>
            {publicRoutes.map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Component />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
