import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from './routes/routes';
import axios from 'axios';

// Set the base URL dynamically based on the environment
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8800";  // Fallback to localhost if not in production

function App() {
  return (
    <div className="font-inter">
    <Router>
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
    </Router>
    </div>
  );
}

export default App;
