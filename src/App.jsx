import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact';
import AI_Interviewer from './components/AI_Interviewer';
import LoginReg from './screens/LoginReq';
import NotFound from './components/NotFound';
import Home from './components/Home';


function App() {

  const location = useLocation();


  return (
    <>
      {location.pathname !== '/AI-Interviewer' && <Header />}

      <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/AI-Interviewer" element={<AI_Interviewer />} />
          <Route path="/login" element={<LoginReg />} />

          {/* Or use a Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {location.pathname !== '/AI-Interviewer' && <Footer />}
    </>
  )
}

export default App
