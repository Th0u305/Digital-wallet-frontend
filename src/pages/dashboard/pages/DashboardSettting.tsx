import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Bell, Download, HelpCircle, Settings, Shield, Sun, Trash2 } from 'lucide-react';

const DashboardSetting = () => {


  const settingSections = [
    {
      title: 'Appearance',
      icon: Sun,
      items: [
        {
          label: 'Theme',
          description: 'Choose between light and dark mode',
          action: (
            <button
          
            >
           
            </button>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Theme',
          description: 'Change theme',
          action: (
            <Switch id='theme'/>
          )
        },
        {
          label: 'Email Notifications',
          description: 'Receive transaction alerts via email',
          action: (
            <Switch/>
          )
        },
        {
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
          action: (
            <Switch/>
          )
        },
        {
          label: 'SMS Notifications',
          description: 'Receive important alerts via SMS',
          action: (
            <Switch/>
          )
        }
      ]
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        {
          label: 'Restart Tour',
          description: 'Take the guided tour again',
          action: (
            <button
              className="px-4 py-2 text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            >
              Start Tour
            </button>
          )
        }
      ]
    },
    {
      title: 'Data & Privacy',
      icon: Shield,
      items: [
        {
          label: 'Export Data',
          description: 'Download a copy of your data',
          action: (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Download  className="h-4 w-4" />
              <span>Export</span>
            </button>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-primary-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <section.icon className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-red-200 dark:border-red-800"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <div className="ml-4">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardSetting;