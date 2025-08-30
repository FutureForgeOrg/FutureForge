import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

import { useAuthStore } from './store/useAuthStore';
import { Loader } from './components/ui/Loader';
import ManageUsers from './pages/ManageUsers';
import ManageJobs from './pages/ManageJobs';
import EditJob from './pages/EditJob';

const App = () => {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log("Checking authentication status...");
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={authUser ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            // element={authUser ? <Navigate to="/dashboard" /> : <Signup />}
            element={<Signup />} // as admin who is already logged in can create new admin accounts 
          // (note: jwt will only be sent after login)
          />

          {/* Protected Admin Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              authUser?.role === 'admin' ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/users"
            element={
              authUser?.role === 'admin' ? (
                <ManageUsers />
              ) : (
                <Navigate to="/login" />
              )
            }
          />


          <Route
            path="/jobs"
            element={
              authUser?.role === 'admin' ? (
                <ManageJobs />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/jobs/:id/edit"
            element={
              authUser?.role === 'admin' ? (
                <EditJob />
              ) : (
                <Navigate to="/login" />
              )
            }
          />  


          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>

  );
};

export default App;
