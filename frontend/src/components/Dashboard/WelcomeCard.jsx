import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, Zap, TrendingUp, Star } from 'lucide-react';

import achievement from '../../assets/dashboard/achievement.svg';
import growth from '../../assets/dashboard/growth.svg';
import checklist from '../../assets/dashboard/checklist.svg';
import creativity from '../../assets/dashboard/creativity.svg';
import briefcase from '../../assets/dashboard/briefcase.svg';

export default function WelcomeCard({ userName = "Prince Patel" }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentIcon, setCurrentIcon] = useState(0);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [streak, setStreak] = useState(7); // Example streak

    const icons = [
        { icon: briefcase, label: 'Career', color: '#7c3aed' },
        { icon: growth, label: 'Growth', color: '#06b6d4' },
        { icon: checklist, label: 'Goals', color: '#f59e0a' },
        { icon: achievement, label: 'Success', color: '#10b981' },
        { icon: creativity, label: 'Ideas', color: '#f97316' }
    ];

    const motivationalQuotes = [
        "Your career is a journey, not a destination.",
        "Every expert was once a beginner.",
        "Success is where preparation meets opportunity.",
        "The future belongs to those who prepare for it today.",
        "Your only limit is your ambition."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        const iconInterval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % icons.length);
        }, 3000);

        const quoteInterval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
        }, 8000);

        setIsVisible(true);

        return () => {
            clearInterval(timer);
            clearInterval(iconInterval);
            clearInterval(quoteInterval);
        };
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();

        if (hour >= 5 && hour < 12) {
            return { text: 'Good morning', emoji: '🌅', color: '#f59e0b' };
        } else if (hour >= 12 && hour < 17) {
            return { text: 'Good afternoon', emoji: '☀️', color: '#f97316' };
        } else if (hour >= 17 && hour < 22) {
            return { text: 'Good evening', emoji: '🌆', color: '#7c3aed' };
        } else {
            return { text: 'Good night', emoji: '🌙', color: '#06b6d4' };
        }
    };

    const formatTime = () => {
        return currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = () => {
        return currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const greeting = getGreeting();

    return (
        // <div className={`rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-gray-200 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        //     style={{ backgroundColor: 'white', backdropFilter: 'blur(20px)' }}>

        <div
            className={`rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left side - Greeting and Info */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                        {/* <span className="text-4xl animate-pulse">{greeting.emoji}</span> */}
                        <h1 className="md:ml-2 text-2xl md:text-3xl lg:text-4xl font-bold bg-white bg-clip-text text-transparent leading-[1.2] pb-1">
                            Welcome to FutureForge
                        </h1>

                    </div>

                    <p className="text-xl md:text-2xl font-semibold mb-6 md:mb-4 mx-0" style={{ color: greeting.color }}>
                        {greeting.text}, {userName}!
                    </p>

                    {/* Date and Time */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 md:gap-4 mb-2 md:mb-6">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl">
                            <Calendar className="w-5 h-5 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">{formatDate()}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl">
                            <Clock className="w-5 h-5 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">{formatTime()}</span>
                        </div>
                    </div>

                    {/* Motivational Quote */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl mb-4">
                        <div className="flex items-center justify-center lg:justify-start mb-4 md:mb-2">
                            <Star className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-800">Daily Inspiration</span>
                        </div>
                        <p className="text-slate-700 italic font-medium transition-all duration-500">
                            "{motivationalQuotes[currentQuote]}"
                        </p>
                    </div>

                    {/* Streak Counter */}
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-xl">
                            <Zap className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">{streak} day streak!</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-semibold text-orange-800">Keep going!</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Animated Visual */}
                <div className="hidden lg:flex flex-1 items-center justify-center">
                    <div className="relative">
                        {/* Main animated circle */}
                        <div className="w-56 h-56 bg-gradient-to-br rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl transition-all duration-500"
                            style={{ background: `linear-gradient(135deg, ${icons[currentIcon].color}20, ${icons[currentIcon].color}40, ${icons[currentIcon].color}60)` }}>

                            {/* Animated background waves */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute w-full h-full bg-gradient-to-r from-white to-transparent rounded-full animate-pulse"></div>
                                <div className="absolute w-32 h-32 bg-white rounded-full top-4 -right-8 opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                                <div className="absolute w-20 h-20 bg-white rounded-full bottom-8 -left-4 opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
                            </div>

                            {/* Center animated icon */}
                            <div className="text-7xl transform transition-all duration-700 ease-in-out scale-110 hover:scale-125 cursor-pointer">
                                <img src={icons[currentIcon].icon} alt={icons[currentIcon].label} className="size-20" />
                            </div>

                            {/* Rotating border */}
                            <div className="absolute inset-0 border-4 border-white border-dashed rounded-full animate-spin opacity-40" style={{ animationDuration: '10s' }}></div>
                            <div className="absolute inset-2 border-2 border-white border-dotted rounded-full animate-spin opacity-30" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                        </div>

                        {/* Enhanced floating particles */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80 shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute -top-2 -right-8 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-70 shadow-lg" style={{ animationDelay: '0.8s' }}></div>
                        <div className="absolute -bottom-6 -right-2 w-10 h-10 bg-green-400 rounded-full animate-bounce opacity-60 shadow-lg" style={{ animationDelay: '1.2s' }}></div>
                        <div className="absolute -bottom-2 -left-6 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-75 shadow-lg" style={{ animationDelay: '0.6s' }}></div>
                        <div className="absolute top-1/2 -left-8 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-65 shadow-lg" style={{ animationDelay: '1.4s' }}></div>
                        <div className="absolute top-1/4 -right-4 w-7 h-7 bg-indigo-400 rounded-full animate-bounce opacity-70 shadow-lg" style={{ animationDelay: '0.4s' }}></div>

                        {/* Enhanced label */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="bg-white px-6 py-3 rounded-full shadow-xl border-2 transition-all duration-500"
                                style={{ borderColor: icons[currentIcon].color }}>
                                <p className="font-bold text-sm transition-all duration-500"
                                    style={{ color: icons[currentIcon].color }}>
                                    {icons[currentIcon].label}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced progress indicator */}
            <div className="hidden lg:mt-8 lg:flex justify-center space-x-3">
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        className={`rounded-full transition-all duration-500 cursor-pointer hover:scale-125 ${index === currentIcon
                            ? 'w-10 h-3 shadow-lg'
                            : 'w-3 h-3 hover:w-6'
                            }`}
                        style={{
                            backgroundColor: index === currentIcon ? icon.color : '#e2e8f0'
                        }}
                        onClick={() => setCurrentIcon(index)}
                    />
                ))}
            </div>
        </div>
    );
}