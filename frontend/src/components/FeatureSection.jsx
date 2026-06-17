import { motion } from "framer-motion";
import { Bot, Mic, BarChart3, Target, Zap, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
    { icon: Bot, title: "AI Mock Interviews", description: "Realistic interview simulations powered by GPT-4 for any role." },
    { icon: Mic, title: "Voice Analysis", description: "Tone, pace and clarity feedback in real-time." },
    { icon: BarChart3, title: "Performance Analytics", description: "Detailed insights into your strengths and weaknesses." },
    { icon: Target, title: "Role-Specific Prep", description: "Curated questions for FAANG, startups, and 500+ roles." },
    { icon: Zap, title: "Instant Feedback", description: "Score, suggestions, and improvements after every answer." },
    { icon: Shield, title: "100% Private", description: "Your data is encrypted and never shared with employers." },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 ">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} className="text-center mb-16"
                >

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center ">
                        Everything you need to <span className="text-gradient">succeed</span>
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Powerful AI-driven tools designed to give you a competitive edge.
                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
                </div>
            </div>
        </section>
    );
}
