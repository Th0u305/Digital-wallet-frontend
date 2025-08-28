/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const DashboardStats = ({ stats }: any) => {

  return (
    <div id='status'  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat:any, index:number) => (
        <motion.div
          id={stat.id}
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {/* {stat.loading ? (
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded"></div>
                ) : (
                  stat.value
                )} */}
                {stat.value}
              </p>
            </div>
            <div className={ cn(`p-3 rounded-lg bg-primary text-white dark:text-black`,
              {
                'bg-accent text-white' : stat.color === "accent",
                'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : stat.color === "success",
                'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' : stat.color === "warning",
                'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' : stat.color === "error",
              }
            )}>
              <stat.icon  className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;