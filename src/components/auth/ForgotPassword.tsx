import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, Shield, Clock } from 'lucide-react';

interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
}

export default function ForgotPassword({ onSwitchToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-600 rounded-2xl p-4">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h1>
            <p className="text-xl text-gray-600 mb-8">
              We've sent a password reset link to<br />
              <strong className="text-gray-900">{email}</strong>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-0.5">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Check your inbox</p>
                    <p className="text-blue-700 text-sm">Look for an email from MailCub with reset instructions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Click the secure link</p>
                    <p className="text-blue-700 text-sm">Follow the link to create a new password</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-0.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Link expires in 1 hour</p>
                    <p className="text-blue-700 text-sm">For security, the reset link will expire soon</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onSwitchToLogin}
                className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                style={{ backgroundColor: '#008748' }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </button>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-600 rounded-2xl p-4">
                  <Mail className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  We'll send you a secure link to reset your password
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: '#008748' }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending reset link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Remember your password?</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={onSwitchToLogin}
                  className="flex items-center justify-center text-blue-600 hover:text-blue-500 font-medium mx-auto transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}