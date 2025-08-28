import { motion } from 'framer-motion';
import { Award, Globe, Linkedin, Mail, Target, Twitter, Users } from 'lucide-react';

const About = () => {
 const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make starts with how it benefits our users and their financial wellbeing."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible in digital finance and payment technology."
  },
  {
    icon: Award,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in our operations, fees, and how we protect your money."
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Financial services should be accessible to everyone, everywhere, regardless of their background."
  }
]

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former VP at Goldman Sachs with 15+ years in fintech. Passionate about democratizing financial services.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: { linkedin: '#', twitter: '#', email: 'alex@securewallet.com' }
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer specializing in security and scalable systems. MIT graduate with a PhD in Computer Science.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      social: { linkedin: '#', twitter: '#', email: 'sarah@securewallet.com' }
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Security',
      bio: 'Cybersecurity expert with 12+ years protecting financial institutions. Former NSA security consultant.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: { linkedin: '#', twitter: '#', email: 'michael@securewallet.com' }
    },
    {
      name: 'Emily Davis',
      role: 'Head of Product',
      bio: 'Product strategist with experience at Stripe and PayPal. Focused on creating intuitive user experiences.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      social: { linkedin: '#', twitter: '#', email: 'emily@securewallet.com' }
    }
  ];

  const milestones = [
    { year: '2020', event: 'SecureWallet founded by Alex and Sarah' },
    { year: '2021', event: 'Launched beta version with 1,000 users' },
    { year: '2022', event: 'Reached 1 million registered users' },
    { year: '2023', event: 'Expanded to international markets' },
    { year: '2024', event: 'Processed over $50 billion in transactions' }
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
              About <span className="text-green-500">SecureWallet</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              We're on a mission to make financial services accessible, secure, and simple for everyone. 
              Founded in 2020, we've grown from a small startup to a trusted platform serving millions worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                To democratize financial services by providing secure, fast, and affordable digital payment 
                solutions that empower individuals and businesses to thrive in the digital economy.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We believe that everyone deserves access to modern financial tools, regardless of their 
                location, background, or economic status. Our platform bridges the gap between traditional 
                banking and the digital future.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-500 mb-2">10M+</div>
                  <div className="text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-500 mb-2">$50B+</div>
                  <div className="text-gray-600 dark:text-gray-400">Processed</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we build products, 
              serve customers, and grow as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500 text-white rounded-lg mb-4">
                  <value.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Key milestones in our mission to transform digital payments
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 h-full"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-gray rounded-lg p-6 shadow-lg">
                    <div className="text-2xl font-bold text-primary dark:text-gray-600 mb-2">
                      {milestone.year}
                    </div>
                    <div className="text-gray-600">
                      {milestone.event}
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 dark:bg-white rounded-full border-4 border-white dark:border-gray-900"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in finance, 
              technology, and security to build the future of digital payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <div className="text-primary-500 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-primary-500">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-primary-500">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-primary-500">
                    <Mail  className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Us in Shaping the Future
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Whether you're looking for career opportunities or want to partner with us, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                View Careers
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;