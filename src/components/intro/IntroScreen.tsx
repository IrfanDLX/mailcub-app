import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onStart: () => void;
  primaryColor?: string;
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
    iconBg: 'bg-blue-600 dark:bg-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    accent: 'bg-blue-600 dark:bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400'
  },
  green: {
    gradient: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
    iconBg: 'bg-green-600 dark:bg-green-500',
    button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
    accent: 'bg-green-600 dark:bg-green-500',
    text: 'text-green-600 dark:text-green-400'
  },
  purple: {
    gradient: 'from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
    iconBg: 'bg-purple-600 dark:bg-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600',
    accent: 'bg-purple-600 dark:bg-purple-500',
    text: 'text-purple-600 dark:text-purple-400'
  },
  indigo: {
    gradient: 'from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20',
    iconBg: 'bg-indigo-600 dark:bg-indigo-500',
    button: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
    accent: 'bg-indigo-600 dark:bg-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-400'
  },
  orange: {
    gradient: 'from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20',
    iconBg: 'bg-orange-600 dark:bg-orange-500',
    button: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600',
    accent: 'bg-orange-600 dark:bg-orange-500',
    text: 'text-orange-600 dark:text-orange-400'
  },
  teal: {
    gradient: 'from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20',
    iconBg: 'bg-teal-600 dark:bg-teal-500',
    button: 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600',
    accent: 'bg-teal-600 dark:bg-teal-500',
    text: 'text-teal-600 dark:text-teal-400'
  },
  pink: {
    gradient: 'from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20',
    iconBg: 'bg-pink-600 dark:bg-pink-500',
    button: 'bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600',
    accent: 'bg-pink-600 dark:bg-pink-500',
    text: 'text-pink-600 dark:text-pink-400'
  }
};

export default function IntroScreen({ 
  title, 
  description, 
  icon, 
  features, 
  onStart, 
  primaryColor = 'blue' 
}: IntroScreenProps) {
  const colors = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${colors.iconBg} rounded-2xl mb-6 shadow-lg`}>
              {icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-200">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 ${colors.accent} rounded-full mt-2 flex-shrink-0`}></div>
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={onStart}
              className={`inline-flex items-center px-8 py-3 ${colors.button} text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-200">
              This introduction will only show once. You can always access help from the sidebar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}