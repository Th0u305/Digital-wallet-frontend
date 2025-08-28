import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HowITWork = () => {
  const data = [
    {
      step: "01",
      title: "Sign Up",
      description:
        "Create your account in seconds with just your email and phone number.",
    },
    {
      step: "02",
      title: "Verify Identity",
      description:
        "Complete our secure verification process to ensure your account safety.",
    },
    {
      step: "03",
      title: "Start Transacting",
      description:
        "Add money to your wallet and start sending, receiving, and managing funds.",
    },
  ];
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join millions of users in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 text-white rounded-full text-xl font-bold mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full">
                  <ArrowRight className="h-6 w-6 text-primary-300 mx-auto" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowITWork;
