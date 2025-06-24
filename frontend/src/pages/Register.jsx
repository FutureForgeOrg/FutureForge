// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     gender: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Add your form submission logic here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-700 flex items-center justify-center p-4">

//       {/* Registration Form Container */}
//       <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white border-opacity-20">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
//           <p className="text-gray-800 text-sm">Join us today and start your journey</p>
//         </div>

//         {/* Registration Form */}
//         <div>

//           {/* Username Field */}
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-800 text-sm font-medium mb-2">
//               Username
//             </label>
//             <input 
//               type="text" 
//               id="username" 
//               name="username" 
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 bg-white focus:border-purple-400 focus:outline-none"
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-800 text-sm font-medium mb-2">
//               Email Address
//             </label>
//             <input 
//               type="email" 
//               id="email" 
//               name="email" 
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 bg-white focus:border-purple-400 focus:outline-none"
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-800 text-sm font-medium mb-2">
//               Password
//             </label>
//             <input 
//               type="password" 
//               id="password" 
//               name="password" 
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 bg-white focus:border-purple-400 focus:outline-none"
//             />
//           </div>

//           {/* Confirm Password Field */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-gray-800 text-sm font-medium mb-2">
//               Confirm Password
//             </label>
//             <input 
//               type="password" 
//               id="confirmPassword" 
//               name="confirmPassword" 
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 bg-white focus:border-purple-400 focus:outline-none"
//             />
//           </div>

//           {/* Gender Selection */}
//           <div className="mb-6">
//             <label className="block text-gray-800 text-sm font-medium mb-3">Gender</label>
//             <div className="grid grid-cols-3 gap-3">
//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="gender" 
//                   value="male"
//                   checked={formData.gender === 'male'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-full px-4 py-3 border-2 rounded-lg text-center cursor-pointer font-medium ${
//                   formData.gender === 'male' 
//                     ? 'border-purple-400 bg-gradient-to-r from-purple-400 to-pink-500 text-white' 
//                     : 'border-gray-200 bg-white text-gray-800'
//                 }`}>
//                   Male
//                 </div>
//               </label>

//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="gender" 
//                   value="female"
//                   checked={formData.gender === 'female'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-full px-4 py-3 border-2 rounded-lg text-center cursor-pointer font-medium ${
//                   formData.gender === 'female' 
//                     ? 'border-purple-400 bg-gradient-to-r from-purple-400 to-pink-500 text-white' 
//                     : 'border-gray-200 bg-white text-gray-800'
//                 }`}>
//                   Female
//                 </div>
//               </label>

//               <label className="flex items-center">
//                 <input 
//                   type="radio" 
//                   name="gender" 
//                   value="other"
//                   checked={formData.gender === 'other'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-full px-4 py-3 border-2 rounded-lg text-center cursor-pointer font-medium ${
//                   formData.gender === 'other' 
//                     ? 'border-purple-400 bg-gradient-to-r from-purple-400 to-pink-500 text-white' 
//                     : 'border-gray-200 bg-white text-gray-800'
//                 }`}>
//                   Other
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             onClick={handleSubmit}
//             className="w-full py-4 bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-500 text-white text-lg font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-30"
//           >
//             Create Account
//           </button>
//         </div>

//         {/* Login Link */}
//         <div className="text-center mt-6 text-gray-800 text-sm">
//           Already have an account?{' '}
//           <Link to="/login">
//           <a href="#login" className="text-purple-700 font-semibold hover:text-pink-500">
//             Sign in here
//           </a>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
export default function Register() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
  };

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

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-3 pt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="text-gray-600">
                    By signing up, I agree with <span className="text-blue-500 hover:underline cursor-pointer">Terms & Conditions</span>
                  </div>
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