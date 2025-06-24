import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';

import {
  Sparkles,
  Target,
  Star,
  ArrowRight,
  Menu,
  X,
  Brain,
  Search,
  Mail,
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Resume Maker",
      description: "Generate your resume quickly with smart suggestionss and No design skills needed — just fill in your info."

    },
    {
      icon: Search,
      title: "Smart Job Matching",
      description: "We scrape jobs from top platforms and use intelligent algorithms to find your ideal matches."
    },
    {
      icon: Mail,
      title: "Event Notifications",
      description: "Don’t waste time searching—events come to you.Weekly or instant notifications based on your preference."

    },
  ];

  const testimonials = [
    {
      name: "priya Sharma",
      role: "Software Engineer at Google",
      content: "FutureForge helped me land my dream job with 95% match accuracy!",
      avatar: "PS"
    },
    {
      name: "Rahul Patel",
      role: "Hackathon Winner",
      content: "Won 3 hackathons in 6 months using their event tracker.",
      avatar: "RP"
    },
    {
      name: "kriti patel",
      role: "Product Manager at Microsoft",
      content: "The AI career advisor guided my successful career transition.",
      avatar: "AS"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 px-6 py-4 z-50 backdrop-blur-md bg-black/80 border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="logo" />
            </div>
            <span className="text-2xl font-bold text-white">FutureForge</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#About Us" className="hover:text-purple-300 transition-all duration-300 text-white font-medium relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#features" className="hover:text-purple-300 transition-all duration-300 text-white font-medium relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="hover:text-purple-300 transition-all duration-300 text-white font-medium relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link to="/Login">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 border border-purple-400/30">
                Login
              </button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl p-6 border-t border-white/20 shadow-xl">
            <div className="flex flex-col space-y-4">
              <a href="#About Us" className="hover:text-purple-300 transition-colors py-2 text-white font-medium">About Us</a>
              <a href="#features" className="hover:text-purple-300 transition-colors py-2 text-white font-medium">Features</a>
              <a href="#testimonials" className="hover:text-purple-300 transition-colors py-2 text-white font-medium">Testimonials</a>
              <Link to="/Login">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold mt-4 hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Added padding-top to account for fixed header */}
      <section className="px-6 py-20 pt-32 text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg">
            <Target className="h-4 w-4 text-purple-300" />
            <span className="text-sm font-medium">AI-Powered Career Platform</span>
            <Sparkles className="h-4 w-4 text-blue-300" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Forge Ahead <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse">With Us</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover your ideal job, track top hackathons, and unlock personalized career insights - powered by AI and smart career tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link to="/Register">
              <button className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 border border-white/20">
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">50K+</div>
              <div className="text-gray-300 font-medium">Jobs Matched</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">95%</div>
              <div className="text-gray-300 font-medium">Success Rate</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-2">1000+</div>
              <div className="text-gray-300 font-medium">Hackathons</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">25K+</div>
              <div className="text-gray-300 font-medium">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* About us Section */}
      <section id='About Us' className="px-6 py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Heading */}
          <h2 className="text-3xl mt-6 md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            About Us
          </h2>
          <p className="text-gray-600 text-xl  mb-8 font-medium">
            Bridging the gap between education and career success
          </p>

          {/* Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 mb-12">
            <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
              <strong className="text-purple-600">FutureForge</strong> is a comprehensive career platform
              designed to empower students and professionals in their journey toward
              career success. We understand the challenges of navigating today's
              competitive job market and provide the tools, resources, and guidance
              needed to excel.
            </p>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Our platform combines cutting-edge technology with personalized career
              development strategies to help you discover opportunities, build
              essential skills, and connect with industry leaders. Whether you're a
              student preparing for your first job or a professional looking to
              advance your career, FutureForge is your trusted partner.
            </p>
          </div>

          {/* Enhanced Developers Section */}
          <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-purple-200/50 rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Meet Our Team</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-center bg-white/80 border-2 border-purple-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-800">Purv Patel</div>
                  <div className="text-sm text-purple-600 font-medium">Software Developer</div>
                </div>
              </div>

              <div className="flex items-center bg-white/80 border-2 border-blue-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg">
                  PB
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-800">Param Bhavsar</div>
                  <div className="text-sm text-blue-600 font-medium">Software Developer</div>
                </div>
              </div>

              <div className="flex items-center bg-white/80 border-2 border-indigo-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-800">Prince Patel</div>
                  <div className="text-sm text-indigo-600 font-medium">Ai developer</div>
                </div>
              </div>

              <div className="flex items-center bg-white/80 border-2 border-pink-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-800">Prit Patel</div>
                  <div className="text-sm text-pink-600 font-medium">Software Developer</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-center mt-8 italic">
              Built with passion by a dedicated team of developers committed to
              transforming career development.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200">
              Career Growth Made Simple
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Everything you need to accelerate your career journey in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 text-white transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">{feature.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-6 py-40 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm border-2 border-purple-100 rounded-3xl p-8 shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-0.5" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 italic text-lg font-medium">"{testimonial.content}"</p>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">{testimonial.name}</div>
                    <div className="text-purple-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="px-6 py-12 bg-gradient-to-br from-gray-900 to-black border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <img src={logo} alt="logo" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">FutureForge</span>
            </div>
            
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Terms</a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 FutureForge. All rights reserved. Empowering careers with AI.</p>
          </div>
        </div>
      </footer> */}
      
      <footer className="px-6 py-12 bg-gradient-to-br from-gray-900 to-black border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="logo" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">FutureForge</span>
            </div>

            <div className="flex items-center space-x-8 text-gray-400">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Terms</a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300 font-medium">Contact</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 FutureForge. All rights reserved. Empowering careers with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;