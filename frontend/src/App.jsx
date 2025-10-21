import React, { useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Terms from './components/Terms';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import Bookmark from './pages/Bookmark';
import Profile from './pages/Profile';
import Portfolio from './pages/tools/Portfolio';
import Resume from './pages/tools/Resume';
import Interview from './pages/tools/Interview';
import Quiz from './pages/tools/Quiz'
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from './components/ui/Loader';
import VerifyEmailPage from './pages/VerifyEmail';
import EmailVerificationHandler from './components/EmailVerificationHandler';
import PreviewPage from './components/ResumeMaker/PreviewPage';
import NotFound404 from './components/NotFound404';
function App() {

  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log("Checking authentication status...");
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader />
      </div>
    );
  }


  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* to implement protect route via authUser in future  */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/jobSearch' element={<JobSearch />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/profile' element={<Profile />} />

          {/* Define routes for tools */}
          <Route path='/tools/portfolio' element={<Portfolio />} />
          <Route path='/tools/resume' element={<Resume />} />
          <Route path='/tools/Interview/*' element={<Interview />} />
          <Route path='/tools/Quiz' element={<Quiz/>}/>
          <Route path='/preview-page' element={<PreviewPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-email/:token" element={<EmailVerificationHandler />} />
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound404/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App