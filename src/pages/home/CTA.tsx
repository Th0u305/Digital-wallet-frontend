import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-20 bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
            Join SecureWallet today and experience the future of digital
            payments. Your financial freedom is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-black px-5 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:text-black px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
