import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface IntroScreenProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onStart: () => void;
  primaryColor?: string;
}

export default function IntroScreen({
  title,
  description,
  icon,
  features,
  onStart,
  primaryColor = 'blue'
}: IntroScreenProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-green-50 dark:bg-gray-800',
      iconBg: 'bg-green-100 dark:bg-green-900',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      accent: 'text-green-600 dark:text-green-400'
    },
    green: {
      bg: 'bg-green-50 dark:bg-gray-800',
      iconBg: 'bg-green-100 dark:bg-green-900',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      accent: 'text-green-600 dark:text-green-400'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-gray-800',
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
      accent: 'text-purple-600 dark:text-purple-400'
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-gray-800',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900',
      button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
      accent: 'text-indigo-600 dark:text-indigo-400'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-gray-800',
      iconBg: 'bg-orange-100 dark:bg-orange-900',
      button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
      accent: 'text-orange-600 dark:text-orange-400'
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-gray-800',
      iconBg: 'bg-teal-100 dark:bg-teal-900',
      button: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
      accent: 'text-teal-600 dark:text-teal-400'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-gray-800',
      iconBg: 'bg-pink-100 dark:bg-pink-900',
      button: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
      accent: 'text-pink-600 dark:text-pink-400'
    }
  };

  const colors = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.green;

  return (
    <div className="min-h-[calc(100vh-200px)] p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-start space-x-12">
          {/* Left side - Icon and main content */}
          <div className="flex-1">
            <div className="mb-8">
              <div className={`inline-flex p-6 rounded-3xl ${colors.iconBg} mb-6`}>
                {icon}
              </div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">{description}</p>
            </div>

            <div className="mb-8">
              <button
                onClick={onStart}
                className={`inline-flex items-center px-8 py-4 ${colors.button} text-white text-lg font-semibold rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-200 group shadow-lg`}
              >
                Start Using {title}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                You can always access this feature from the sidebar menu
              </p>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="w-96">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Key Features</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

              {icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className={`inline-flex items-center px-8 py-4 ${colors.button} text-white text-lg font-semibold rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-200 group shadow-lg`}
            >
              Start Using {title}
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-gray-500 text-sm mt-6">
              You can always access this feature from the sidebar menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}