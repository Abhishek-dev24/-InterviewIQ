import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Role",
    description:
      "Select your target job role and choose difficulty level tailored to your interview preparation.",
  },
  {
    number: "02",
    title: "Start AI Interview",
    description:
      "Begin a realistic AI-powered mock interview experience designed to simulate actual interviews.",
  },
  {
    number: "03",
    title: "Receive Feedback",
    description:
      "Get intelligent scoring, personalized feedback, and suggestions to improve weak areas instantly.",
  },
  {
    number: "04",
    title: "Track Progress",
    description:
      "Monitor your interview performance growth over multiple practice sessions and improve consistently.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6 overflow-hidden"
    >

      {/* Background Glow */}
      <div
        className="absolute top-20 left-[-100px]
                   w-[300px] h-[300px]
                   rounded-full
                   bg-indigo-500/10
                   blur-[130px]"
      />

      <div
        className="absolute bottom-0 right-[-80px]
                   w-[280px] h-[280px]
                   rounded-full
                   bg-purple-500/10
                   blur-[130px]"
      />


      <div className="max-w-7xl mx-auto relative">

        {/* Section Heading */}
        <div className="text-center mb-20">

          <p className="text-purple-400 mb-4 text-sm uppercase tracking-widest">
            Process
          </p>

          <h2
            className="text-4xl md:text-6xl font-bold text-white"
            style={{
              fontFamily:
                "Space Grotesk, sans-serif",
            }}
          >
            How InterviewIQ <br />

            <span
              className="bg-gradient-to-r
                         from-indigo-400
                         via-purple-400
                         to-pink-400
                         bg-clip-text
                         text-transparent"
            >
              Works
            </span>
          </h2>
        </div>


        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
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
                y: -8,
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

                {/* Step Number */}
                <div
                  className="w-16 h-16 mb-6
                             rounded-2xl
                             flex items-center justify-center
                             bg-gradient-to-r
                             from-indigo-500
                             via-purple-500
                             to-pink-500"
                >
                  <span className="text-white font-bold text-xl">
                    {step.number}
                  </span>
                </div>


                {/* Title */}
                <h3
                  className="text-xl font-bold
                             mb-4 text-white"
                  style={{
                    fontFamily:
                      "Space Grotesk, sans-serif",
                  }}
                >
                  {step.title}
                </h3>


                {/* Description */}
                <p
                  className="text-gray-400
                             text-sm leading-7"
                >
                  {step.description}
                </p>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}