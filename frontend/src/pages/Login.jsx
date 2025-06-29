import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from '../components/ui/Loader';

export default function Login() {

  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return { valid: false, message: "All fields are required" };
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return { valid: false, message: "Invalid email format" };
    }
    if (password.length < 4 || password.length > 20) {
      return { valid: false, message: "Password must be between 4 and 20 characters" };
    }
    return { valid: true };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    await login(formData, navigate);
    setFormData({ email: '', password: '' });
  };

  if (isLoggingIn) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #312e81 25%, #7e22ce 50%, #a78bfa 75%, #ec4899 100%)`
      }}>

      {/* Main Container */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}>

        <div className="flex flex-col lg:flex-row min-h-[550px]">

          {/* Left Panel - Welcome Back Section */}
          <div className="hidden lg:block lg:w-1/2 p-4 flex flex-col justify-center items-center text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, #312e81 0%, #7e22ce 50%, #3b82f6 100%)`
            }}>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-white"></div>
              <div className="absolute top-30 right-20 w-24 h-24 rounded-full border-2 border-white"></div>
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-white"></div>
              <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full border-2 border-white"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border border-white"></div>
            </div>

            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-6 p-16">
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <img src={logo} alt="logo" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Welcome Back to</h1>
                <h2 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  FutureForge
                </h2>

              </div>

              {/* Description */}
              <div className='p-auto w-full flex justify-center items-center'>
                <p className="text-center text-lg opacity-90 max-w-md leading-relaxed">
                  Welcome back to FutureForge.
                  Sign in to access your personalized gateway to innovation.
                </p>
              </div>


              {/* <div className="mt-12 flex space-x-8 text-sm">
                <button className="hover:text-yellow-400 transition-colors">EXPLORE HERE</button>
                <button className="hover:text-yellow-400 transition-colors">DISCOVER HERE</button>
              </div> */}
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="lg:w-1/2 md:p-12 p-8 bg-gray-50 flex items-center">
            <div className="max-w-md mx-auto w-full">
              <h3 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign In</h3>
              <p className="text-gray-600 text-center mb-8">Access your account</p>

              <div className="space-y-6">

                {/* Email Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">E-mail Address</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">Password</div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password : e.target.value})}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="text-gray-600 ml-10">Remember me</div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 hover:underline transition-colors md:text-md text-sm" >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoggingIn}
                    className="w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #7e22ce 100%)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Sign In
                  </button>
                </div>



                {/* Sign Up Link */}
                <div className="text-center pt-6">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link to="/Register">
                    <button className="text-blue-500 hover:text-blue-700 hover:underline font-semibold transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}