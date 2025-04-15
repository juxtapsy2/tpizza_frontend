import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow" style={{ paddingTop: "4.6rem" }}>
            {children}
        </main>
        <Footer />
    </div>
  )
}
