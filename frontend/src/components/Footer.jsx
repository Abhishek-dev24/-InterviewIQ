import { motion } from "framer-motion";
import {
  Brain,
  Circle,
  Globe,
  User
} from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "AI Interviews", "Dashboard"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Support", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/10
                 py-16 px-6 mt-10 overflow-hidden"
    >

      {/* Background Glow */}
      <div
        className="absolute bottom-0 left-[-100px]
                   w-[300px] h-[300px]
                   rounded-full
                   bg-purple-500/10
                   blur-[140px]"
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Top Footer */}
        <div className="grid md:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 mb-5"
            >
              <div
                className="w-11 h-11 rounded-2xl
                           bg-gradient-to-r
                           from-indigo-500
                           via-purple-500
                           to-pink-500
                           flex items-center
                           justify-center"
              >
                <Brain className="w-5 h-5 text-white" />
              </div>

              <span
                className="text-xl font-bold text-white"
                style={{
                  fontFamily:
                    "Space Grotesk, sans-serif",
                }}
              >
                InterviewIQ
              </span>
            </motion.div>

            <p className="text-gray-400 leading-7 text-sm">
              AI-powered interview preparation platform
              helping candidates practice smarter and
              perform better in real-world interviews.
            </p>
          </div>


          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white font-semibold
                           mb-4"
              >
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400
                                 hover:text-white
                                 transition duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


        {/* Bottom Footer */}
        <div
          className="border-t border-white/10
                     pt-8 flex flex-col md:flex-row
                     justify-between items-center gap-5"
        >

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2026 InterviewIQ. All rights reserved.
          </p>


          {/* Social Icons */}
          <div className="flex gap-5">

            <motion.div
              whileHover={{
                y: -3,
                scale: 1.1,
              }}
            >
              <User
                className="w-5 h-5
                           text-gray-400
                           hover:text-blue-400
                           cursor-pointer transition"
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -3,
                scale: 1.1,
              }}
            >
              <Circle 
                className="w-5 h-5
                           text-gray-400
                           hover:text-white
                           cursor-pointer transition"
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -3,
                scale: 1.1,
              }}
            >
              <Globe
                className="w-5 h-5
                           text-gray-400
                           hover:text-cyan-400
                           cursor-pointer transition"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </footer>
  );
}