import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
  HelpCircle,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "security", name: "Security", icon: Shield },
    { id: "payments", name: "Payments", icon: DollarSign },
    { id: "account", name: "Account", icon: Users },
    { id: "fees", name: "Fees & Pricing", icon: CreditCard },
    { id: "technical", name: "Technical", icon: Settings },
  ];

  const supportList = [
    {
      icon: HelpCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      href: "/contact",
    },
    {
      icon: Settings,
      title: "Help Center",
      description: "Browse our comprehensive help documentation",
      action: "Visit Help Center",
      href: "/features",
    },
    {
      icon: Users,
      title: "Contact Support",
      description: "Send us a message and we'll respond quickly",
      action: "Contact Us",
      href: "/contact",
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "security",
      question: "How secure is my money in SecureWallet?",
      answer:
        "Your money is protected by bank-level security measures including 256-bit SSL encryption, multi-factor authentication, and fraud detection AI. We also maintain FDIC insurance up to $250,000 per account.",
    },
    {
      id: 2,
      category: "security",
      question: "What should I do if I suspect unauthorized access?",
      answer:
        "Immediately change your password, enable two-factor authentication if not already active, and contact our support team at support@securewallet.com or call +1 (555) 123-4567. We monitor all accounts 24/7 for suspicious activity.",
    },
    {
      id: 3,
      category: "payments",
      question: "How long do transfers take?",
      answer:
        "Domestic transfers are instant within the SecureWallet network. Bank transfers typically take 1-3 business days. International transfers can take 1-5 business days depending on the destination country.",
    },
    {
      id: 4,
      category: "payments",
      question: "What are the transfer limits?",
      answer:
        "Personal accounts have a daily limit of $5,000 and monthly limit of $20,000. Premium accounts have daily limits of $25,000 and monthly limits of $100,000. Business accounts have custom limits based on verification level.",
    },
    {
      id: 5,
      category: "account",
      question: "How do I verify my account?",
      answer:
        "Account verification requires a government-issued ID (passport, driver's license, or national ID), proof of address (utility bill or bank statement), and sometimes a selfie for identity confirmation. The process usually takes 24-48 hours.",
    },
    {
      id: 6,
      category: "account",
      question: "Can I have multiple accounts?",
      answer:
        "Each person can have one personal account per email address. However, you can have separate business accounts with proper business documentation. Family members can each have their own individual accounts.",
    },
    {
      id: 7,
      category: "fees",
      question: "What fees do you charge?",
      answer:
        "Personal accounts have no monthly fees. Transaction fees vary: domestic transfers are free for Premium users, international transfers start at 1.5% + $1.99. See our pricing page for detailed fee structure.",
    },
    {
      id: 8,
      category: "fees",
      question: "Are there any hidden fees?",
      answer:
        "No, we believe in transparent pricing. All fees are clearly disclosed before you complete any transaction. You'll always see the exact amount you'll pay and what the recipient will receive.",
    },
    {
      id: 9,
      category: "technical",
      question: "Which devices and browsers are supported?",
      answer:
        "SecureWallet works on all modern browsers (Chrome, Firefox, Safari, Edge) and has native apps for iOS and Android. The web version is fully responsive and works on tablets and mobile browsers.",
    },
    {
      id: 10,
      category: "technical",
      question: "What if I forget my password?",
      answer:
        'Click "Forgot Password" on the login page and enter your email. You\'ll receive a secure reset link. For additional security, you may need to verify your identity through SMS or email before setting a new password.',
    },
    {
      id: 11,
      category: "payments",
      question: "Can I cancel a transfer after sending it?",
      answer:
        "Transfers within SecureWallet are instant and cannot be cancelled. Bank transfers can sometimes be cancelled within 30 minutes if they haven't been processed. Contact support immediately if you need to attempt a cancellation.",
    },
    {
      id: 12,
      category: "account",
      question: "How do I close my account?",
      answer:
        "You can close your account by contacting our support team. First, ensure your balance is zero by withdrawing all funds. Account closure is permanent and cannot be undone, so please consider carefully before proceeding.",
    },
    {
      id: 13,
      category: "security",
      question: "Do you share my data with third parties?",
      answer:
        "We never sell your personal data. We only share information as required by law or with trusted partners who help us provide our services (like fraud prevention). Read our Privacy Policy for complete details.",
    },
    {
      id: 14,
      category: "fees",
      question: "How do currency exchange rates work?",
      answer:
        "We use real-time market rates with a small markup (typically 0.5-1.5%) for currency conversion. You'll see the exact rate and total cost before confirming any international transfer.",
    },
    {
      id: 15,
      category: "technical",
      question: "Is there an API for developers?",
      answer:
        "Yes, we offer REST APIs for Business account holders. Our API allows integration of payment processing, account management, and transaction history into your applications. Documentation is available in your business dashboard.",
    },
  ];

  const toggleItem = (id: unknown) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary to-accent dark:from-primary-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Frequently Asked{" "}
              <span className="text-green-400">Questions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              Find answers to common questions about SecureWallet. Can't find
              what you're looking for? Contact our support team.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={
                    cn(
                        "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all",
                        {
                            "bg-primary text-white dark:text-black shadow-lg" : activeCategory === category.id,
                            "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" : activeCategory !== category.id
                        }
                    )
                }
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {openItems.has(faq.id) ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  <AnimatePresence>
                    {openItems.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our support team is here to assist you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportList.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col justify-evenly items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500 text-white rounded-full mb-4">
                  <item.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white dark:text-black hover:bg-gray-500 dark:hover:bg-gray-300 rounded-lg font-medium transition-colors"
                >
                  {item.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Topics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Most searched questions by our users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "How to send money internationally?",
              "Setting up two-factor authentication",
              "Understanding transaction fees",
              "Verifying your account",
              "Adding money to your wallet",
              "Troubleshooting login issues",
            ].map((topic, index) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSearchTerm(topic)}
                className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left group"
              >
                <span className="text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {topic}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
