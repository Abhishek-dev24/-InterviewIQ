import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const links = ["Features", "How It Works", "Testimonials"];
    const navigate = useNavigate();

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 
                 border-b border-white/10 
                 backdrop-blur-xl 
                 bg-black/30"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">

                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                       shadow-lg"
                    >
                        <Brain className="w-5 h-5 text-white" />
                    </div>

                    <span
                        className="text-xl font-bold text-white tracking-wide"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                        InterviewIQ
                    </span>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                            whileHover={{ y: -2 }}
                            className="relative text-gray-300 text-sm font-medium 
                         hover:text-white transition duration-300
                         after:absolute after:left-0 after:-bottom-1
                         after:h-[2px] after:w-0
                         after:bg-purple-400
                         after:transition-all after:duration-300
                         hover:after:w-full"
                        >
                            {link}
                        </motion.a>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.button
                    onClick={() => navigate("/login")}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 0px 25px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-2.5 rounded-full 
             bg-gradient-to-r 
             from-indigo-500 
             via-purple-500 
             to-pink-500
             text-white 
             text-sm 
             font-semibold
             transition-all duration-300"
                >
                    Get Started
                </motion.button>
            </div>
        </motion.nav>
    );
}