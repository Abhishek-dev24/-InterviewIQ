import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Background Glow Left */}
      <div
        className="absolute top-10 left-[-120px]
                   w-[350px] h-[350px]
                   rounded-full
                   bg-purple-500/20
                   blur-[140px]"
      />

      {/* Background Glow Right */}
      <div
        className="absolute bottom-0 right-[-100px]
                   w-[320px] h-[320px]
                   rounded-full
                   bg-cyan-500/20
                   blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto
                   rounded-3xl
                   border border-white/10
                   bg-white/5
                   backdrop-blur-2xl
                   p-14 md:p-20
                   overflow-hidden
                   text-center"
      >

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0
                     bg-gradient-to-br
                     from-purple-500/10
                     via-indigo-500/10
                     to-pink-500/10"
        />

        <div className="relative z-10">

          {/* Small Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2
                       px-5 py-2 rounded-full
                       bg-white/5
                       border border-white/10
                       mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />

            <span className="text-sm text-gray-300">
              Trusted by Future Professionals
            </span>
          </motion.div>


          {/* Heading */}
          <h2
            className="text-4xl md:text-6xl
                       font-bold mb-6
                       leading-tight"
            style={{
              fontFamily:
                "Space Grotesk, sans-serif",
            }}
          >
            Ready To Crack Your <br />

            <span
              className="bg-gradient-to-r
                         from-indigo-400
                         via-purple-400
                         to-pink-400
                         bg-clip-text
                         text-transparent"
            >
              Dream Job Interview?
            </span>
          </h2>


          {/* Description */}
          <p
            className="text-gray-400
                       max-w-2xl mx-auto
                       mb-10 text-lg leading-8"
          >
            Join thousands of candidates improving
            their interview confidence using AI-powered
            mock interviews, instant scoring,
            and adaptive feedback.
          </p>


          {/* CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow:
                "0px 0px 35px rgba(168,85,247,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            className="group
                       px-9 py-4
                       rounded-full
                       bg-gradient-to-r
                       from-indigo-500
                       via-purple-500
                       to-pink-500
                       text-white
                       font-semibold
                       inline-flex items-center
                       gap-3"
          >
            Start Practicing Free

            <ArrowRight
              className="w-4 h-4
                         group-hover:translate-x-1
                         transition"
            />
          </motion.button>

        </div>
      </motion.div>
    </section>
  );
}