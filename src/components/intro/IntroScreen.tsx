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
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      accent: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      accent: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
      accent: 'text-purple-600'
    },
    indigo: {
      bg: 'bg-indigo-50',
      iconBg: 'bg-indigo-100',
      button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
      accent: 'text-indigo-600'
    },
    orange: {
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
      accent: 'text-orange-600'
    },
    teal: {
      bg: 'bg-teal-50',
      iconBg: 'bg-teal-100',
      button: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
      accent: 'text-teal-600'
    },
    pink: {
      bg: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      button: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
      accent: 'text-pink-600'
    }
  };

  const colors = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className={`${colors.bg} rounded-3xl p-12 border border-gray-200`}>
          <div className="text-center mb-12">
            <div className={`inline-flex p-6 rounded-3xl ${colors.iconBg} mb-8`}>
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