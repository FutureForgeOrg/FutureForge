import React from 'react'
import { Brain, Search, Mail } from 'lucide-react'
function Features() {


    const features = [
    {
      icon: Brain,
      title: "Smart Job Search",
      description: "Find relevant jobs with real-time scraping, advanced filters, bookmarking, and automated email alerts directly to your inbox"

    },
    {
      icon: Search,
      title: " Resume Builder",
      description: "Create ATS-friendly resumes with professional templates, instant previews, and downloads — no design skills required, just fill in details."
    },
    {
      icon: Mail,
      title: "Portfolio Builder",
      description:"Design stunning portfolios with customizable themes, instant deployment, SEO-friendly previews, and shareable links to showcase your skills globally."
    },
    {
      title:"AI Interviewer",
      description:"Practice interviews with AI, get instant scores, and receive feedback on answers through text or voice for skill improvement."
    }
  ];
  return (
    <>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 text-white transform hover:scale-105 hover:shadow-2xl"
              >
                {/* <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div> */}
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">{feature.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features