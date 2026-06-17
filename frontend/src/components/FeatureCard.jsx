import { motion } from "framer-motion";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="group relative 
                 p-8 rounded-3xl 
                 border border-white/10
                 bg-white/5 
                 backdrop-blur-xl
                 overflow-hidden
                 cursor-pointer
                 transition-all duration-500"
    >

      {/* Hover Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-0 
                   group-hover:opacity-100
                   transition duration-500
                   bg-gradient-to-br
                   from-purple-500/10
                   via-indigo-500/10
                   to-transparent"
      />

      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-3xl 
                   opacity-0 group-hover:opacity-100
                   transition duration-500
                   border border-purple-400/20"
      />

      <div className="relative z-10">

        {/* Icon Box */}
        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.08,
          }}
          className="w-16 h-16 rounded-2xl
                     bg-gradient-to-r
                     from-indigo-500
                     via-purple-500
                     to-pink-500
                     flex items-center
                     justify-center
                     mb-6 shadow-xl"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>


        {/* Title */}
        <h3
          className="text-2xl font-bold 
                     mb-4 text-white"
          style={{
            fontFamily:
              "Space Grotesk, sans-serif",
          }}
        >
          {title}
        </h3>


        {/* Description */}
        <p
          className="text-gray-400 
                     leading-7"
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}