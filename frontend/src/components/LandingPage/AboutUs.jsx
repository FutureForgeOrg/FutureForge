import React from 'react'

function AboutUs() {
  return (
    <>
      <section id='About Us' className="px-6 py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Heading */}
          <h2 className="text-3xl mt-6 md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            About Us
          </h2>
          <p className="text-gray-600 text-xl  mb-8 font-medium">
            Bridging the gap between education and career success
          </p>

          {/* Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 mb-12">
            <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed font-style: italic">
              <strong className="text-purple-600 ">FutureForge</strong> is a comprehensive career platform
              designed to empower students and professionals in their journey toward
              career success. We understand the challenges of navigating today's
              competitive job market and provide the tools, resources, and guidance
              needed to excel.
            </p>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-style: italic">
              Our platform combines cutting-edge technology with personalized career
              development strategies to help you discover opportunities, build
              essential skills, and connect with industry leaders. Whether you're a
              student preparing for your first job or a professional looking to
              advance your career, FutureForge is your trusted partner.
            </p>
          </div>

          {/* Enhanced Developers Section */}
          <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-purple-200/50 rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
            {/* Heading */}
            <h3 className="text-3xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 relative inline-block">
              Meet Our Team
              <span className="block w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-2"></span>
            </h3>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 text-left">

              {/* Purv Patel */}
              <div className="flex items-center bg-white/90 border-2 border-purple-100 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg ring-4 ring-purple-200">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">Purv Patel</div>
                  <div className="text-sm text-purple-600 font-medium mb-2">Software Developer</div>
                  <a
                    href="https://github.com/purvpatel123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Param Bhavsar */}
              <div className="flex items-center bg-white/90 border-2 border-blue-100 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg ring-4 ring-blue-200">
                  PB
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">Param Bhavsar</div>
                  <div className="text-sm text-blue-600 font-medium mb-2">Software Developer</div>
                  <a
                    href="https://github.com/ParamPS25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Prince Patel */}
              <div className="flex items-center bg-white/90 border-2 border-indigo-100 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg ring-4 ring-indigo-200">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">Prince Patel</div>
                  <div className="text-sm text-indigo-600 font-medium mb-2">AI Developer</div>
                  <a
                    href="https://github.com/prince2004patel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Prit Patel */}
              <div className="flex items-center bg-white/90 border-2 border-pink-100 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold flex items-center justify-center mr-4 shadow-lg ring-4 ring-pink-200">
                  PP
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">Prit Patel</div>
                  <div className="text-sm text-pink-600 font-medium mb-2">Technical Support</div>
                  <a
                    href="https://github.com/Pritlimbani269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Footer text */}
            <p className="text-gray-600 text-center mt-12 italic text-lg">
              Built with passion by a dedicated team of developers committed to transforming career development.
            </p>
          </div>
        </div>
      </section>

    </>
  )
}

export default AboutUs