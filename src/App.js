import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from './routes/routes';

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
