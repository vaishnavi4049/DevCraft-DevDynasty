import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Video, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CreatorLanding = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Navbar />

      <main className="relative">
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

/* ---------------- NAVBAR ---------------- */

const Navbar = () => (
  <motion.nav
    initial={{ y: -80 }}
    animate={{ y: 0 }}
    className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/5"
  >
    <div className="px-6 md:px-20 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        CreatorHub
      </div>

      <div className="flex gap-4">
        <Link to="/creator-dashboard">
          <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
            My Projects 
          </button>
        </Link>

        <Link to="/view-requests">
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-medium">
             View Requests
          </button>
        </Link>
      </div>
    </div>
  </motion.nav>
);

/* ---------------- HERO ---------------- */

const Hero = () => (
  <section className="px-6 md:px-20 py-24 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-gray-300">Built for Modern Creators</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Grow Your Audience.
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Monetize Smarter.
        </span>
      </h1>

      <p className="text-gray-400 mb-8">
        All-in-one platform for creators to manage content, collaborate,
        and scale their brand effortlessly.
      </p>

      <Link to="/register">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold flex items-center gap-2 mx-auto"
        >
          Start Creating
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </Link>
    </motion.div>
  </section>
);

/* ---------------- FEATURES ---------------- */

const Features = () => {
  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Content Management",
      desc: "Organize and publish your content seamlessly.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      desc: "Work with brands and other creators effortlessly.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Analytics & Growth",
      desc: "Track performance and scale your influence.",
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-3 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ---------------- CTA ---------------- */

const CTA = () => (
  <section className="px-6 md:px-20 py-20 text-center">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Level Up Your Creator Journey?
      </h2>

      <Link to="/register">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold">
          Join CreatorHub
        </button>
      </Link>
    </motion.div>
  </section>
);

/* ---------------- FOOTER ---------------- */

const Footer = () => (
  <footer className="px-6 md:px-20 py-8 border-t border-white/5 text-center text-gray-400 text-sm">
    © 2026 CreatorHub. All rights reserved.
  </footer>
);

export default CreatorLanding;
