import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';
import Testimonials from '../components/LandingPage/Testimonials';
import Features from '../components/LandingPage/Features';
import AboutUs from '../components/LandingPage/AboutUs';
import Hero from '../components/LandingPage/Hero';
import AnimatedSection from '../components/ui/AnimatedSection';
import futureForgeLogo from '/bg-hd.png';

import {

  Menu,
  X,
} from 'lucide-react';

import Terms from '../components/Terms';
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 px-6 py-4 z-50 backdrop-blur-md bg-black/80 border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-xl pb-2 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src={futureForgeLogo} alt="logo" />
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
            <Link to="/login">
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
              <Link to="/login">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold mt-4 hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>


      <Hero />

      <AnimatedSection delay={0.2}>
        <AboutUs />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <Features />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <Testimonials />
      </AnimatedSection>
      <footer className="px-6 py-12 bg-gradient-to-br from-gray-900 to-black border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-12 h-14 pb-2 rounded-xl flex items-center justify-center shadow-lg">
                <img src={futureForgeLogo} alt="logo" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                FutureForge
              </span>
            </div>

            {/* Links Section */}
            <div className="flex items-center space-x-8 text-gray-400">
              {/* Scroll to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Existing Terms */}
              <Link
                to="/terms"
                state={{ from: "LandingPage" }}
                className="hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                Terms & Conditions
              </Link>

              {/* Email */}
              <a
                href="mailto:contact.futureforge@gmail.com"
                className="hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                Email
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/FutureForgeOrg/FutureForge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p className="text-lg">
              &copy; 2025 FutureForge. All rights reserved. Empowering careers with AI.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;