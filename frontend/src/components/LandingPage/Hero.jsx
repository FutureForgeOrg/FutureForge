import React from 'react'
import {
    Sparkles,
    Target,
    ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom';
function Hero() {
    return (
        <>
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

                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Forge Ahead <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse">With Us</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                       Land your dream job with AI-powered matching, ace interviews with real-time feedback, and stand out with professional resumes and stunning portfolios
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
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">1K+</div>
                            <div className="text-gray-300 font-medium">Jobs Matched</div>
                        </div>
                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">3+ </div>
                            <div className="text-gray-300 font-medium">Professional Resume Formats</div>
                        </div>
                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-2">10+</div>
                            <div className="text-gray-300 font-medium">Portfolio Templates</div>
                        </div>
                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">15+</div>
                            <div className="text-gray-300 font-medium">Happy Users</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero