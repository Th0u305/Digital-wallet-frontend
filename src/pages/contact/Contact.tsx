import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Clock1, Headphones, HelpCircle, Mail, MapPin, MessageSquare, Phone, Send, Users } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {

  type FormType = {
    name : string,
    message : string,
    subject:string,
    email: string,
    category: string
  }

  const [formData, setFormData] = useState<FormType>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@securewallet.com',
      action: 'mailto:support@securewallet.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our support team directly',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come visit our headquarters',
      contact: '123 Finance St, Digital City, DC 12345',
      action: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'We\'re here to help during these hours',
      contact: 'Mon-Fri: 9AM-6PM EST',
      action: null
    }
  ];

  const supportCategories = [
    {
      icon: MessageSquare,
      title: 'General Inquiry',
      description: 'Questions about our services or features'
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Need help with the app or technical issues'
    },
    {
      icon: Users,
      title: 'Business Partnership',
      description: 'Interested in partnering with SecureWallet'
    },
    {
      icon: HelpCircle,
      title: 'Account Help',
      description: 'Issues with your account or transactions'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error:any) {
      toast.error('Failed to send message. Please try again.',);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in <span className="text-green-400">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              Have questions? We'd love to hear from you. Send us a message 
              and we'll respond as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <info.icon className="h-8 w-8 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {info.description}
                </p>
                {info.action ? (
                  <a
                    href={info.action}
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    {info.contact}
                  </a>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {info.contact}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Support Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="focus:border-0 focus:outline-0 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="focus:border-0 focus:outline-0 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-0 focus:outline-0"
                      >
                        <option value="">Select a category</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="business">Business Partnership</option>
                        <option value="account">Account Help</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="focus:border-0 focus:outline-0 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-0 focus:outline-0"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white dark:text-black py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send  className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Support Categories */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  How can we help?
                </h3>
                <div className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.title.toLowerCase().replace(' ', '_') }))}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          <category.icon  className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {category.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-4">
                    Need immediate help?
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/faq"
                      className="block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      → Check our FAQ section
                    </a>
                    <a
                      href="/features"
                      className="block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      → Browse our help center
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      → Call us directly
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Come see us in person at our headquarters
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop"
                alt="Office Building"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Finance Street<br />
                    Digital City, DC 12345
                  </p>
                </div>
                <div className="text-center">
                  <Clock1  className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Office Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM EST
                  </p>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567<br />
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;