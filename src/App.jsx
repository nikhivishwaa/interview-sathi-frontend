import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import LoginReg from './screens/LoginReq';
import NotFound from './components/NotFound';
import Home from './components/Home';
function App() {

  return (
    <>
        <Header />
        <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginReg />} />

           {/* Or use a Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
        <Footer />
    </>
  )
}

export default App
