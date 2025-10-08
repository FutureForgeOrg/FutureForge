import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Brain, TrendingUp, CheckCircle } from 'lucide-react';

const AiInterviewCard = () => {
    const [currentTip, setCurrentTip] = useState(0);
    const navigate = useNavigate();
    const motivationalTips = [
        "80% of interviews are won in the first 5 minutes!",
        "Practice with AI for real-time feedback",
        "Boost confidence with unlimited attempts",
        "Master behavioral questions effortlessly"
    ];

    const benefits = [
        { icon: Brain, text: "AI Powered", color: "text-purple-400" },
        { icon: TrendingUp, text: "Skill Boost", color: "text-orange-400" },
        { icon: CheckCircle, text: "Instant Feedback", color: "text-green-400" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleStartPractice = () => {
        navigate('/tools/interview');
        console.log('Navigate to AI Interview Practice');
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <div className="relative rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#2a1f2f]/60 to-[#1a1a2f]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent overflow-hidden">

                {/* Background Glows */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-purple-400 rounded-full blur-xl"></div>
                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-orange-400 rounded-full blur-xl"></div>
                </div>

                <div className="relative z-10 md:flex md:items-center md:justify-between">
                    {/* Left Content */}
                    <div className="md:w-1/2 md:pr-8">
                        <div className="mb-4">
                            <h3 className="text-white font-bold text-xl mb-2">AI Interview Practice!</h3>
                            <div className="h-12 flex items-center">
                                <p className="text-white text-sm transition-all duration-500">{motivationalTips[currentTip]}</p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 border border-gray-100 rounded-lg p-3 text-center text-white hover:bg-white/20 hover:text-purple-400 hover:shadow-md transition-all duration-300"
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
                                <div className="text-white text-[11px]">Practice session duration</div>
                                <div className="flex items-center justify-center mt-1 space-x-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full transition-all duration-300"
                                            style={{ animationDelay: `${i * 200}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleStartPractice}
                            className="w-full bg-gradient-to-r from-purple-600 via-orange-600 to-purple-600 text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10">Start Practice Now</span>
                            <MessageCircle className="w-4 h-4 relative z-10" />
                        </button>

                        {/* Footer */}
                        <div className="text-center mt-3">
                            <p className="text-white text-xs">
                                Used by 50,000+ professionals for interview prep
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="md:w-1/2 relative hidden md:block">
                        <img
                            src="/robot.png"
                            alt="Decorative Background"
                            className="absolute right-[-40px] top-[-100px] w-[500px] h-[500px] rotate-12 opacity-40 transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiInterviewCard;