import { motion } from "framer-motion";
import { Globe, Shield, TrendingUp, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Your money is protected with enterprise-level encryption and multi-factor authentication.",
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly with zero processing delays, 24/7.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Send money anywhere in the world with competitive exchange rates.",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description:
        "Track your spending patterns and get personalized financial insights.",
    },
  ];
  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SecureWallet?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with user-friendly design to
              deliver the most secure and convenient digital wallet experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow "
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gray-500 text-white">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
