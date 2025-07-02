import React, { useState, useEffect } from 'react';
import { FileText, Briefcase, Trophy, Star, Zap, TrendingUp, Target, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResumeCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);
    const [showSparkle, setShowSparkle] = useState(false);
    const navigate = useNavigate();

    const motivationalTips = [
        "75% of resumes never reach human eyes!",
        "Beat ATS systems with optimized format",
        "Professional resume = 50% more interviews",
        "Land your dream job in 30 days"
    ];

    const benefits = [
        { icon: Target, text: "ATS Friendly", color: "text-green-400" },
        { icon: Award, text: "Professional", color: "text-blue-400" },
        { icon: CheckCircle, text: "Quick Build", color: "text-purple-400" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
            setShowSparkle(true);
            setTimeout(() => setShowSparkle(false), 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleCreateResume = () => {
        // This would navigate to resume maker tools
        console.log("Navigating to resume maker...");
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-6">
            <div
                className="relative rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent overflow-hidden"
                onClick={handleCreateResume}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-green-400 rounded-full blur-xl"></div>
                </div>

                {/* Floating sparkles */}
                {showSparkle && (
                    <div className="absolute top-3 right-3">
                        <FileText className="w-5 h-5 text-blue-500 animate-pulse" />
                    </div>
                )}

                <div className="relative z-10">
                    {/* Header - simplified */}
                    <div className="mb-4">
                    </div>

                    {/* Main motivational message */}
                    <div className="mb-4">
                        <h3 className="text-white font-bold text-xl mb-2">
                            Build Your Resume!
                        </h3>
                        <div className="h-12 flex items-center">
                            <p className={`text-white text-sm transition-all duration-500 ${showSparkle ? 'scale-105' : ''
                                }`}>
                                {motivationalTips[currentTip]}
                            </p>
                        </div>
                    </div>

                    {/* Benefits grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center hover:bg-gray-100 hover:shadow-md"
                            >
                                <benefit.icon className={`w-5 h-5 mx-auto mb-1 ${benefit.color}`} />
                                <p className="text-gray-700 text-xs font-bold">{benefit.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats to motivate */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-lg p-3 mb-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">3 min</div>
                            <div className="text-gray-600 text-xs">To create your resume</div>
                            <div className="flex items-center justify-center mt-2 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-2 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-300`}
                                        style={{ animationDelay: `${i * 200}ms` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button onClick={() => navigate('/tools/Resume')}
                    className="w-full bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 relative overflow-hidden">     
                        <span className="relative z-10">Create Resume Now</span>
                        <Zap className="w-4 h-4 relative z-10" />
                    </button>

                    {/* Small motivational footer */}
                    <div className="text-center mt-3">
                        <p className="text-white text-xs">
                            Trusted by 100,000+ job seekers worldwide
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeCard;