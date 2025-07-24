import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-6">
            <Play className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get started with our powerful platform and discover all the features available to you.
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            <span>Easy setup and configuration</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            <span>Comprehensive feature set</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            <span>24/7 support available</span>
          </div>
        </div>
        
        <button
          onClick={onComplete}
          className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;