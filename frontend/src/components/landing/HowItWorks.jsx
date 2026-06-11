import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Add Resources",
    desc: "Upload books, journals, papers and digital resources."
  },
  {
    id: "02",
    title: "AI Organizes",
    desc: "AI automatically categorizes and indexes content."
  },
  {
    id: "03",
    title: "Readers Discover",
    desc: "Students find resources through smart search."
  },
  {
    id: "04",
    title: "Gain Insights",
    desc: "Track engagement and library performance."
  }
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">
      <h2 className="text-5xl font-bold text-center mb-16">
        How It Works
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <motion.div
            whileHover={{ y: -8 }}
            key={step.id}
            className="glass rounded-3xl p-6"
          >
            <h3 className="text-primary text-4xl font-bold">
              {step.id}
            </h3>

            <h4 className="text-xl font-semibold mt-4">
              {step.title}
            </h4>

            <p className="text-gray-400 mt-3">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}