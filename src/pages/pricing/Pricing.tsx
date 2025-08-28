import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';


const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Personal',
      description: 'Perfect for individuals and personal use',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        'Send & receive money',
        'Basic transaction history',
        'Mobile app access',
        'Email support',
        'Up to 10 transactions/month',
        '24/7 customer support'
      ],
      limitations: [
        'No priority support',
        'Basic analytics only',
        'Standard processing speed'
      ],
      cta: 'Get Started Free',
      color: 'gray'
    },
    {
      name: 'Premium',
      description: 'Ideal for frequent users and small businesses',
      price: { monthly: 9.99, yearly: 99.99 },
      popular: true,
      features: [
        'Everything in Personal',
        'Unlimited transactions',
        'Priority customer support',
        'Advanced analytics',
        'Instant transfers',
        'Multi-currency support',
        'Bill payment automation',
        'Spending insights',
        'Export transaction data'
      ],
      limitations: [
        'No white-label options',
        'Standard API limits'
      ],
      cta: 'Start Premium Trial',
      color: 'primary'
    },
    {
      name: 'Business',
      description: 'Designed for growing businesses and teams',
      price: { monthly: 29.99, yearly: 299.99 },
      popular: false,
      features: [
        'Everything in Premium',
        'Team management',
        'Advanced reporting',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'Advanced security features',
        'Bulk payment processing',
        'Custom transaction limits'
      ],
      limitations: [],
      cta: 'Contact Sales',
      color: 'accent'
    }
  ];


  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll be charged or credited proportionally.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! We believe in transparent pricing. All fees are clearly outlined in our pricing table and terms of service.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, bank transfers, and even payments from other digital wallets.'
    },
    {
      question: 'Is there a free trial for premium plans?',
      answer: 'Yes! Premium and Business plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'What happens if I exceed my transaction limits?',
      answer: 'For the Personal plan, additional transactions are charged at $0.50 each. Premium and Business plans have no transaction limits.'
    }
  ];


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
              Simple, <span className="text-green-500">Transparent</span> Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              Choose the perfect plan for your needs. No hidden fees, no surprises. 
              Start free and upgrade as you grow.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={ cn (
                    `relative bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow`,
                    {
                        'ring-2 ring-primary-500 scale-105' : plan.popular
                    }
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {billingCycle === 'monthly' ? plan.price.monthly: plan.price.yearly}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                      <p className="text-sm text-accent-500 mt-2">
                        Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-accent-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-500 dark:text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={
                        cn(
                            "w-full py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer",
                            {
                                "bg-primary hover:bg-primary dark:text-black text-white" : plan.popular,
                                'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' : !plan.popular
                            }
                        )
                    }
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get answers to common pricing questions
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;