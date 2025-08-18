import React from 'react'
import {Star} from 'lucide-react';
function Testimonials() {


    const testimonials = [
        {
            name: "Ananya Verma",
            role: "Data Analyst at Deloitte",
            content: "FutureForge’s smart job search found me roles I never saw elsewhere — landed two interviews within the first week!",
            avatar: "AV"
        },
        {
            name: "Rohan Mehta",
            role: "UI/UX Designer at Swiggy",
            content: "Their resume and portfolio tools helped me stand out. Recruiters loved my professional design and personal portfolio link!",
            avatar: "RM"
        },
        {
            name: "Simran Kapoor",
            role: "Software Engineer at Amazon",
            content: "The AI interviewer prepared me so well that my real interview felt easy — the feedback was spot-on every time!",
            avatar: "SK"
        }
    ];
    return (
        <>
            <section id="testimonials" className="px-6 py-40 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 leading-[1.2] pb-2">
                        Voices of the Forge
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

        </>
    )
}

export default Testimonials