import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
// import Terms from '../components/Terms';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from '../components/ui/Loader';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const { signup, isSiginingUp } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';

    if (name === 'username') {
      const validUsername = /^[a-zA-Z0-9 ]+$/.test(value);
      if (!validUsername && value !== '') {
        errorMsg = 'Username can only contain letters and numbers and spaces';
      }
    }

    if (name === 'email') {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!validEmail && value !== '') {
        errorMsg = 'Invalid email address';
      }
    }

    if (name === 'password') {
      if (value.length < 4 && value !== '') {
        errorMsg = 'Password must be at least 4 characters long';
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password && value !== '') {
        errorMsg = 'Passwords do not match';
      }
    }

    if (name === 'gender') {
      if (!value) {
        errorMsg = 'Please select your gender';
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setError(prev => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(error).some(msg => msg !== '')) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.gender) {
      toast.error('Please fill in all fields');
      return;
    }

    console.log('Form submitted:', formData);
    // toast.success('Account created successfully!');
    signup(formData, navigate);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setAgreedToTerms(false);
    setError({});
  };


  if (isSiginingUp) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
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
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl max-h-[700px]"
        style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}>

        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* Left Panel - Welcome Section */}
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
                <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
                <h2 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  FutureForge
                </h2>

              </div>

              {/* Description */}
              <div className='p-auto w-full flex justify-center items-center'>
                <p className="text-center text-lg opacity-90 max-w-md leading-relaxed">
                  Create your FutureForge account.
                  Unlock the next level of digital possibilities today.
                </p>
              </div>


              {/* <div className="mt-12 flex space-x-8 text-sm">
                <button className="hover:text-yellow-400 transition-colors">EXPLORE HERE</button>
                <button className="hover:text-yellow-400 transition-colors">DISCOVER HERE</button>
              </div> */}
            </div>
          </div>

          {/* Right Panel - Registration Form */}
          <div className="lg:w-1/2 p-4 bg-gray-50">
            <div className="max-w-md mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center font-monserat">Create your account</h3>

              <div className="space-y-2">

                {/* Username Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-1">Username</div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="w-full px-2 py-1 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                  />
                </div>
                {error.username && (
                  <p className="text-red-500 text-sm mt-1">{error.username}</p>
                )}

                {/* Email Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">E-mail Address</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-2 py-1 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                  />
                  {error.email && (
                    <p className="text-red-500 text-sm mt-1">{error.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">Password</div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full px-2 py-1 pr-12 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {error.password && (
                  <p className="text-red-500 text-sm mt-1">{error.password}</p>
                )}

                {/* Confirm Password Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">Confirm Password</div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full px-2 py-1 pr-12 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {error.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
                )}

                {/* Gender Field */}
                <div>
                  <div className="block text-gray-700 font-medium mb-2">Gender</div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-1 py-1 border-b-2 border-blue-200 bg-transparent focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>

                  </select>
                </div>
                {error.gender && (
                  <p className="text-red-500 text-sm mt-1">{error.gender}</p>
                )}

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-3 pt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <p>By signing up, I agree with</p>
                  <Link to="/terms"  state={{ from: "Register" }}>
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      Terms & Conditions
                    </span>
                  </Link>
                </div>


                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #7e22ce 100%)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Sign Up
                  </button>
                  <Link to="/login">
                    <button
                      type="button"
                      className="flex-1 py-3 px-6 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-300"
                    >
                      Sign In
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
