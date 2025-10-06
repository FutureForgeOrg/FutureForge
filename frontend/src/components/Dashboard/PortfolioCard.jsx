import React, { useState, useEffect } from 'react';
import { Sparkles, Briefcase, Trophy, Star, Zap, TrendingUp } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const PortfolioCard = () => {
    // const [isHovered, setIsHovered] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);
    // const [showSparkle, setShowSparkle] = useState(false);
    const navigate = useNavigate();

    const motivationalTips = [
        "90% of recruiters check portfolios first!",
        "Stand out from 1000+ applicants",
        "Showcase your best projects professionally",
        "Get 3x more interview calls"
    ];

    const benefits = [
        { icon: Trophy, text: "Showcase Skills", color: "text-yellow-400" },
        { icon: TrendingUp, text: "Career Growth", color: "text-green-400" },
        { icon: Star, text: "Get Noticed", color: "text-blue-400" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
            // setShowSparkle(true);
            // setTimeout(() => setShowSparkle(false), 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <div
                className="relative rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent overflow-hidden"
            // onClick={handleCreatePortfolio}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-purple-400 rounded-full blur-xl"></div>
                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-400 rounded-full blur-xl"></div>
                </div>



                <div className="relative z-10 md:flex md:items-center md:justify-between">
                    {/* Left Side - Text Content */}
                    <div className="md:w-1/2 md:pr-8">
                        {/* Main motivational message */}
                        <div className="mb-4">
                            <h3 className="text-white font-bold text-xl mb-2">
                                Create Your Portfolio!
                            </h3>
                            <div className="h-12 flex items-center">
                                <p className="text-white text-sm transition-all duration-500">
                                    {motivationalTips[currentTip]}
                                </p>
                            </div>
                        </div>

                        {/* Benefits grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 border border-gray-100 rounded-lg p-3 text-center text-white hover:bg-white/20 hover:text-green-500 hover:shadow-md"
                                >
                                    <benefit.icon className={`w-5 h-5 mx-auto mb-1 ${benefit.color}`} />
                                    <p className="text-[10px] sm:text-[12px] font-bold">{benefit.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="bg-white/10 border border-gray-100 rounded-lg p-2 mb-3">
                            <div className="text-center">
                                <div className="text-white font-bold mb-0.5">5 min</div>
                                <div className="text-white text-[11px]">To get started</div>
                                <div className="flex items-center justify-center mt-1 space-x-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300"
                                            style={{ animationDelay: `${i * 200}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* CTA Button */}
                        <button onClick={() => navigate('/tools/Portfolio')}
                            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 relative overflow-hidden">
                            <span className="relative z-10">Start Building Now</span>
                            <Zap className="w-4 h-4 relative z-10" />
                        </button>

                        {/* Footer */}
                        <div className="text-center mt-3">
                            <p className="text-white text-xs">
                                Join 50,000+ professionals who got hired faster
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="md:w-1/2 relative hidden md:block">
                        <img
                            src="/themes/neobrutal.webp"
                            alt="Decorative Background"
                            className="absolute right-[-40px] top-[-100px] w-[500px] h-[500px] rotate-12 opacity-40 transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PortfolioCard;