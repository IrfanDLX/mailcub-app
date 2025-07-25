import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Building, Users, Zap } from 'lucide-react';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignup?: () => void;
}

export default function Signup({ onSwitchToLogin, onSignup }: SignupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.acceptTerms) {
      alert('Please accept the terms of service');
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSignup) {
        onSignup();
      } else {
        onSwitchToLogin();
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-blue-600 rounded-2xl p-4">
                <Mail className="h-12 w-12 text-white" />
              </div>
              <h1 className="ml-4 text-4xl font-bold text-gray-900">MailCub</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start your email infrastructure journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of developers and businesses who trust MailCub for their email delivery needs.
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast Setup</h3>
                  <p className="text-gray-600">Get started in minutes with our intuitive onboarding process</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Team Collaboration</h3>
                  <p className="text-gray-600">Invite team members and manage permissions effortlessly</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Enterprise Ready</h3>
                  <p className="text-gray-600">Scalable infrastructure that grows with your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <div className="bg-blue-600 rounded-xl p-3">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">MailCub</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Start your free trial today - no credit card required</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
              </div>
              <div className={`w-12 h-1 ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder="Acme Inc."
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">We'll use this to set up your account</p>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                        One number
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>
                    </span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Send me product updates and email delivery tips
                    </span>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.acceptTerms}
                    className="flex-1 text-white py-3 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                    style={{ backgroundColor: '#008748' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group"
                style={{ backgroundColor: '#008748' }}
                Sign in to your account →
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}