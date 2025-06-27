import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Terms from './components/Terms';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import Bookmark from './pages/Bookmark';
import Profile from './components/Profile';
import Portfolio from './pages/tools/Portfolio';
import Resume from './pages/tools/Resume';
import Reviews from './pages/tools/Reviews';
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/terms" element={<Terms/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/JobSearch' element={<JobSearch/>}/>
        <Route path='/Bookmark' element={<Bookmark/>}/>
        <Route path='/profile' element={<Profile/>} />
  
        {/* Define routes for tools */}
        <Route path='/tools/portfolio' element={<Portfolio/>} />
        <Route path='/tools/resume' element={<Resume/>} />
        <Route path='/tools/reviews' element={<Reviews/>} />
        {/* Add more routes as needed */}
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App