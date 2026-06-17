import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, BrainCircuit } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-36 pb-24 px-6 overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-30"></div>

      {/* Gradient Blur Orb 1 */}
      <div
        className="absolute top-20 left-[-120px] 
                   w-[400px] h-[400px] 
                   rounded-full 
                   bg-purple-600/20 
                   blur-[140px]"
      />

      {/* Gradient Blur Orb 2 */}
      <div
        className="absolute bottom-10 right-[-100px] 
                   w-[350px] h-[350px] 
                   rounded-full 
                   bg-cyan-500/20 
                   blur-[140px]"
      />

      <div className="relative max-w-7xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 
                     px-5 py-2 rounded-full 
                     border border-white/10 
                     bg-white/5 backdrop-blur-xl mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />

          <span className="text-sm text-gray-300">
            Powered by Adaptive AI Engine
          </span>
        </motion.div>


        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl 
                     font-bold leading-tight mb-8"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Crack Interviews <br />

          <span
            className="bg-gradient-to-r 
                       from-indigo-400 
                       via-purple-400 
                       to-pink-400
                       bg-clip-text 
                       text-transparent"
          >
            With AI Precision
          </span>
        </motion.h1>


        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl 
                     text-gray-400 
                     max-w-3xl mx-auto 
                     mb-12 leading-8"
        >
          Practice realistic mock interviews, receive intelligent feedback,
          improve weak areas, and build confidence before your dream job interview.
        </motion.p>


        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-5"
        >

          {/* Primary */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 35px rgba(168,85,247,0.45)"
            }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 rounded-full
                       bg-gradient-to-r
                       from-indigo-500
                       via-purple-500
                       to-pink-500
                       font-semibold text-white
                       flex items-center gap-2"
          >
            Start Practice

            <ArrowRight className="w-4 h-4" />
          </motion.button>


          {/* Secondary */}
          <motion.button
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(255,255,255,0.08)"
            }}
            className="px-8 py-4 rounded-full
                       border border-white/10
                       bg-white/5
                       backdrop-blur-xl
                       font-semibold text-white
                       flex items-center gap-2"
          >
            <Play className="w-4 h-4" />

            Watch Demo
          </motion.button>
        </motion.div>


        {/* Fake Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div
            className="rounded-3xl 
                       border border-white/10 
                       bg-white/5 
                       backdrop-blur-xl
                       p-4 shadow-2xl"
          >

            <div
              className="aspect-video rounded-2xl 
                         bg-gradient-to-br 
                         from-slate-900 
                         to-slate-800 
                         flex flex-col items-center 
                         justify-center gap-4"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3
                }}
              >
                <BrainCircuit className="w-16 h-16 text-purple-400" />
              </motion.div>

              <p className="text-gray-400 text-lg">
                AI Mock Interview Dashboard Preview
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}