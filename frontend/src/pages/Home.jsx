import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                IntelliProject
              </span>
            </div>
            <ul className="hidden md:flex gap-8">
              <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#how" className="hover:text-indigo-400 transition-colors">How It Works</a></li>
              <li><a href="#explore" className="hover:text-indigo-400 transition-colors">Explore</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#buildos" className="hover:text-indigo-400 transition-colors">Build</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Next <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Breakthrough Project</span> 🚀
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            IntelliProject generates AI-powered academic project ideas tailored to your skills, interests, and time budget. Get personalized recommendations that boost your resume and help you build practical experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Generate My Idea →
            </button>
            <button className="px-8 py-4 border-2 border-indigo-500 rounded-lg font-semibold hover:bg-indigo-500/10 transition-all">
              Explore Ideas
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-8 hover:border-indigo-500/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Enter Skills</h3>
              <p className="text-slate-300">
                Tell us about your programming skills, frameworks, and technologies you're proficient in.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-8 hover:border-indigo-500/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Choose Domain</h3>
              <p className="text-slate-300">
                Select the domain you're interested in: Healthcare, Finance, Education, or more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-8 hover:border-indigo-500/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Generate Ideas</h3>
              <p className="text-slate-300">
                Get personalized project recommendations with implementation roadmaps and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Projects Section */}
      <section id="explore" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-500/60 transition-all transform hover:scale-105">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💻</span>
                  <h3 className="text-2xl font-bold">AI Resume Analyzer</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Build an intelligent system that analyzes resumes and provides actionable feedback for improvement.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-sm text-cyan-300">Python</span>
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-sm text-cyan-300">FastAPI</span>
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-sm text-cyan-300">NLP</span>
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-sm text-cyan-300">React</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Resume Score</span>
                  <span className="text-2xl font-bold text-cyan-400">95/100</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all transform hover:scale-105">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📚</span>
                  <h3 className="text-2xl font-bold">Smart Study Planner</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Create an AI-powered study planning tool that adapts to student learning patterns and goals.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-purple-300">JavaScript</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-purple-300">React</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-purple-300">Firebase</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-purple-300">ML</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Resume Score</span>
                  <span className="text-2xl font-bold text-purple-400">88/100</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 transition-all transform hover:scale-105">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-2xl font-bold">IoT Health Dashboard</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Develop a real-time health monitoring system with IoT sensors and predictive analytics.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-sm text-orange-300">Python</span>
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-sm text-orange-300">IoT</span>
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-sm text-orange-300">Docker</span>
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-sm text-orange-300">AWS</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Resume Score</span>
                  <span className="text-2xl font-bold text-orange-400">92/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose IntelliProject?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl">
                  🏆
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
                <p className="text-slate-300">AI-generated project ideas tailored to your unique skill set and interests.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-xl">
                  ⚡
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Resume Boosting Projects</h3>
                <p className="text-slate-300">Projects designed to enhance your resume with relevant, industry-aligned experience.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white text-xl">
                  🌳
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Implementation Roadmaps</h3>
                <p className="text-slate-300">Step-by-step guides to help you build projects from concept to completion.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white text-xl">
                  🚀
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">BuildOS Integration</h3>
                <p className="text-slate-300">Seamlessly integrate with BuildOS to deploy and showcase your projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BuildOS Integration Section */}
      <section id="buildos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">BuildOS Integration</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Once you've developed your project, seamlessly integrate it with BuildOS to deploy, host, and showcase your work to the world. Our integration makes it simple to take your academic projects to production with professional-grade deployment pipelines and monitoring tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold mb-2 text-indigo-400">Deploy Instantly</h4>
                <p className="text-slate-400">Push your code and go live in minutes with zero downtime.</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold mb-2 text-purple-400">Professional Hosting</h4>
                <p className="text-slate-400">Enterprise-grade infrastructure for your projects with 99.9% uptime.</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold mb-2 text-pink-400">Monitor & Scale</h4>
                <p className="text-slate-400">Built-in analytics and auto-scaling capabilities for growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Generate your first project idea and begin your journey to becoming a proficient developer.
          </p>
          <button className="px-12 py-5 bg-white text-indigo-600 font-bold rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-2 mx-auto">
            Generate Your First Project Idea →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <h3 className="text-xl font-bold">IntelliProject</h3>
              </div>
              <p className="text-slate-400 text-sm">AI-powered academic project recommendations</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#explore" className="hover:text-indigo-400 transition-colors">Explore</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-slate-300">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#about" className="hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-slate-300">Connect</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 IntelliProject. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
