import React from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Left Sidebar - Preview/Demo Area */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gray-800 dark:bg-gray-950 p-8 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #008748 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #008748 0%, transparent 50%)`,
          }}></div>
        </div>
        
        {/* Screen Preview Image */}
        <div className="relative z-10 w-full max-w-md">
          {getScreenPreview(title)}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-green-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce"></div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                {React.cloneElement(icon as React.ReactElement, { 
                  className: "h-8 w-8 text-white relative z-10" 
                })}
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-3 w-3 text-white/80 animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center lg:text-left">
            <button
              onClick={onStart}
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg relative overflow-hidden group mb-6"
              style={{ backgroundColor: '#008748' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative">Get Started</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 relative" />
            </button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto lg:mx-0">
              This introduction will only show once. You can always access help and documentation from the sidebar menu.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center lg:justify-start space-x-8 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">10M+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Emails Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get screen-specific preview images
const getScreenPreview = (screenTitle: string) => {
  const getScreenImage = () => {
    switch (screenTitle) {
      case 'Team Management':
        return 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'API Key Management':
        return 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Domain Management':
        return 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Email Accounts':
        return 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Send Test Email':
        return 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Email Logs':
        return 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Support Tickets':
        return 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      default:
        return 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
    }
  };

  return (
    <div className="bg-gray-700 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {/* Browser Header */}
      <div className="bg-gray-600 dark:bg-gray-700 p-3 border-b border-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="ml-4 text-gray-300 text-sm">MailCub - {screenTitle}</div>
        </div>
      </div>
      
      {/* Screen Preview */}
      <div className="relative">
        <img
          src={getScreenImage()}
          alt={`${screenTitle} preview`}
          className="w-full h-64 object-cover"
        />
        {/* Overlay to make it look like a dashboard */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/20"></div>
        
        {/* Mock UI Elements */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded"></div>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-1.5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mock Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="h-2 bg-blue-400 rounded w-8 mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="h-2 bg-green-400 rounded w-10 mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-14"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};