import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ to, suffix = "" }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));
    const [val, setVal] = useState(0);
    useEffect(() => {
        const controls = animate(count, to, { duration: 2 });
        const unsub = rounded.on("change", (v) => setVal(v));
        return () => { controls.stop(); unsub(); };
    }, [to]);
    return <span>{val.toLocaleString()}{suffix}</span>;
}

const stats = [
    { v: 50000, s: "+", l: "Active Users" },
    { v: 95, s: "%", l: "Success Rate" },
    { v: 1000000, s: "+", l: "Interviews Done" },
    { v: 500, s: "+", l: "Companies Covered" },
];

export default function StatsSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div key={s.l}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-2xl glass text-center"
                    >
                        <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                            <Counter to={s.v} suffix={s.s} />
                        </div>
                        <div className="text-sm text-muted-foreground">{s.l}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}