import React from 'react';
import { ArrowRight, X } from 'lucide-react';

interface IntroScreenProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onStart: () => void;
  onSkip?: () => void;
  primaryColor?: string;
}

export default function IntroScreen({
  title,
  description,
  icon,
  features,
  onStart,
  onSkip,
  primaryColor = 'blue'
}: IntroScreenProps) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        {onSkip && (
          <button
            onClick={onSkip}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        <div className="mb-8">
          <div className={`inline-flex p-6 rounded-3xl bg-${primaryColor}-100 dark:bg-${primaryColor}-900/20 mb-6`}>
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className={`w-2 h-2 rounded-full bg-${primaryColor}-500 mr-3 flex-shrink-0`}></div>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-8 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Skip for now
            </button>
          )}
          <button
            onClick={onStart}
            className={`px-8 py-3 bg-${primaryColor}-600 text-white rounded-lg hover:bg-${primaryColor}-700 focus:ring-2 focus:ring-${primaryColor}-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 flex items-center justify-center group`}
          >
            Start Using {title}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}