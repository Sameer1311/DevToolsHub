"use client";
import { motion } from "framer-motion";
import { Code, Wrench, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "All-in-One Toolkit",
    desc: "From color pickers to regex testers — everything a dev needs in one hub.",
  },
  {
    icon: <Wrench className="w-6 h-6 text-primary" />,
    title: "Quick Access",
    desc: "No more hunting tools — run, debug, format, and convert in seconds.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Performance First",
    desc: "Optimized tools that load fast and feel smooth across all devices.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure & Ad-Free",
    desc: "Your tools, your data. No ads, no trackers, just productivity.",
  },
];

const About = () => {
  return (
    <section className="w-full py-12 px-6 md:px-20  text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          About DevToolsHub
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          DevToolsHub is a lightweight, developer-friendly toolkit crafted to save time and improve workflow. Whether {"you're"} debugging, formatting JSON, picking a color, or converting units — {"we've"} got you covered.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
