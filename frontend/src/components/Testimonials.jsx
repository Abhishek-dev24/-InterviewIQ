import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer @ Google",
    quote:
      "InterviewIQ completely changed my preparation process. The AI feedback felt incredibly realistic and helped me improve fast.",
  },
  {
    name: "Rahul Verma",
    role: "Product Manager @ Microsoft",
    quote:
      "The closest thing to a real interview simulation. I improved my confidence dramatically within just a few weeks.",
  },
  {
    name: "Aisha Khan",
    role: "Data Scientist @ Meta",
    quote:
      "The adaptive questioning engine is brilliant. Every session felt personalized to my weaknesses.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 px-6 overflow-hidden"
    >

      {/* Background Glow */}
      <div
        className="absolute top-20 right-[-100px]
                   w-[300px] h-[300px]
                   rounded-full
                   bg-purple-500/10
                   blur-[140px]"
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-purple-400 mb-4 uppercase text-sm tracking-widest">
            Testimonials
          </p>

          <h2
            className="text-4xl md:text-6xl
                       font-bold text-white"
            style={{
              fontFamily:
                "Space Grotesk, sans-serif",
            }}
          >
            Trusted By <br />

            <span
              className="bg-gradient-to-r
                         from-indigo-400
                         via-purple-400
                         to-pink-400
                         bg-clip-text
                         text-transparent"
            >
              Future Professionals
            </span>
          </h2>
        </div>


        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
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
                         rounded-3xl
                         border border-white/10
                         bg-white/5
                         backdrop-blur-xl
                         p-8
                         overflow-hidden
                         transition-all duration-500"
            >

              {/* Hover Overlay */}
              <div
                className="absolute inset-0
                           opacity-0
                           group-hover:opacity-100
                           transition duration-500
                           bg-gradient-to-br
                           from-purple-500/10
                           to-transparent"
              />

              <div className="relative z-10">

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4
                                 text-yellow-400
                                 fill-yellow-400"
                    />
                  ))}
                </div>


                {/* Quote */}
                <p
                  className="text-gray-300
                             leading-8 mb-8"
                >
                  "{item.quote}"
                </p>


                {/* User */}
                <div className="flex items-center gap-4">

                  {/* Fake Avatar */}
                  <div
                    className="w-12 h-12 rounded-full
                               bg-gradient-to-r
                               from-indigo-500
                               via-purple-500
                               to-pink-500
                               flex items-center
                               justify-center
                               text-white font-bold"
                  >
                    {item.name.charAt(0)}
                  </div>


                  <div>
                    <h4 className="font-semibold text-white">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-400">
                      {item.role}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}