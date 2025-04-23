import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { useAuth } from './contexts/AuthContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavRoutes = ["/register",];
  const hideNavCondition = hideNavRoutes.includes(location.pathname);
  //const { user } = useAuth();

  return (
    <div className="relative flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Main App Content - above background */}
      <div className="relative z-10 flex flex-col flex-grow">
        {!hideNavCondition && <NavBar /*user={user}*/ />}
        <main className={`flex-grow ${!hideNavCondition ? 'pt-12' : ''}`}>
          {children}
        </main>
        {!hideNavCondition && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
