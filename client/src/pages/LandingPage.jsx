



import React from 'react';
import { 
  Brain, 
  Github, 
  LayoutGrid, 
  MessageSquare, 
  Calendar,
  Users,
  Target,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <CompatibilityShowcase />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/5"
    >
      <div className="px-6 md:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            CollabSphere
          </motion.div>

          {/* Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'How It Works', 'Projects'].map((item) => (
              <motion.a
                key={item}
                href="/login"
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
        <div className="flex items-center gap-4">
  <Link to="/login">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all"
    >
      Login
    </motion.button>
  </Link>

  <Link to="/register">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25"
    >
      Sign Up
    </motion.button>
  </Link>
</div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="px-6 md:px-20 py-20 md:py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">AI-Powered Team Building</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Build Elite Teams.</span>
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Instantly.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          AI-powered matchmaking for hackathons and startups. Stop searching. Start building.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group"
          >
            Get Matched
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            Explore Projects
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Problem Section
const Problem = () => {
  const problems = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Founders can't find complementary skills",
      description: "Your network is limited. The perfect co-founder might be just outside it."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Great ideas fail due to poor team balance",
      description: "Even the best ideas need the right execution team to succeed."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Networking is limited by geography",
      description: "Talent is global, but your network is local. Break free from borders."
    }
  ];

  return (
    <section className="px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Building the Right Team 
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Shouldn't Be Hard
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-3 mb-4">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Matchmaking",
      description: "Our AI analyzes skills, work styles, and goals to find your perfect team matches.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "Verified Skills",
      description: "GitHub integration validates real coding abilities. No more fake profiles.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Project Bazaar",
      description: "Browse open roles in exciting projects or post your own ideas.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-Time Collaboration",
      description: "Built-in chat, scheduling, and negotiation tools for seamless team formation.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Powerful Features for
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Perfect Matches
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Verified Profile",
      description: "Connect GitHub and showcase your skills with real data.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      number: "02",
      title: "AI Detects Skill Gaps",
      description: "Our AI analyzes your profile and identifies missing skills.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Build High-Performance Team",
      description: "Get matched with complementary talents and start building.",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <section className="px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          From Idea to
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dream Team in 3 Steps
          </span>
        </motion.h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block opacity-30" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 relative z-10">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-gray-600 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Compatibility Showcase
const CompatibilityShowcase = () => {
  return (
    <section className="px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          AI-Powered
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Compatibility Prediction
          </span>
        </motion.h2>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-[#0A0A0F]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold">John Doe</h3>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold">
                  Strong Complement
                </span>
              </div>

              {/* Skill Overlap */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Skill Overlap</span>
                  <span className="text-white font-semibold">92%</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['React', 'Node.js', 'Python', 'UI/UX'].map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibility Score */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Compatibility Score</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "87%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Final CTA Section
const FinalCTA = () => {
  return (
    <section className="px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          Your Next Winning Team
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Is One Match Away
          </span>
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 mx-auto group"
        >
          Start Building Now
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="px-6 md:px-20 py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CollabSphere
          </div>
          
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
          
          <div className="text-sm text-gray-400">
            © 2024 CollabSphere. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPage;
