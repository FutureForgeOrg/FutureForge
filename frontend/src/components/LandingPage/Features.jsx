import React from 'react'
import { Brain, Search, Mail } from 'lucide-react'
/**
 * Renders a visually styled section highlighting three key features of the career platform.
 *
 * Displays a heading, subtitle, and a responsive grid of feature cards, each with an icon, title, and description. Features include resume creation, smart job matching, and event notifications. The section uses gradient backgrounds, hover effects, and responsive design for enhanced user experience.
 * 
 * @returns {JSX.Element} The rendered features section component.
 */
function Features() {
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
    </>
  )
}

export default Features