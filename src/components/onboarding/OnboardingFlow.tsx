import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Globe, Users, Key, Zap, Target, Building } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to MailCub!',
    description: 'Let\'s get you set up in just a few minutes'
  },
  {
    id: 'domain',
    title: 'Add Your First Domain',
    description: 'Connect your domain to start sending emails'
  },
  {
    id: 'verification',
    title: 'Verify Your Domain',
    description: 'Add DNS records to verify domain ownership'
  },
  {
    id: 'team',
    title: 'Invite Your Team',
    description: 'Collaborate with team members (optional)'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Start sending emails with MailCub'
  }
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    domain: '',
    teamEmails: ['']
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamEmails: [...formData.teamEmails, '']
    });
  };

  const updateTeamEmail = (index: number, email: string) => {
    const newEmails = [...formData.teamEmails];
    newEmails[index] = email;
    setFormData({
      ...formData,
      teamEmails: newEmails
    });
  };

  const removeTeamMember = (index: number) => {
    const newEmails = formData.teamEmails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      teamEmails: newEmails.length > 0 ? newEmails : ['']
    });
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 rounded-3xl p-6">
                <Mail className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MailCub!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your powerful email infrastructure platform is ready to go.
              Let's get you set up in just a few simple steps.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="bg-blue-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Send emails with 99.9% deliverability and real-time tracking</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="bg-green-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Precise Analytics</h3>
                <p className="text-gray-600 text-sm">Monitor opens, clicks, bounces, and delivery rates</p>
              </div>
            </div>
          </div>
        );

      case 'domain':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-purple-600 rounded-3xl p-6">
                <Globe className="h-16 w-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add Your First Domain</h2>
            <p className="text-gray-600 mb-8">
              Connect your domain to start sending emails from your own address.
              Don't worry, we'll help you verify it in the next step.
            </p>
            
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Domain Name
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example.com"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-left">
                Enter your domain without www or https://
              </p>
            </div>
          </div>
        );

      case 'verification':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-600 rounded-3xl p-6">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Domain Verification</h2>
            <p className="text-gray-600 mb-8">
              We've added your domain! You can verify it later by adding DNS records.
              For now, let's continue with the setup.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-4">What's Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-0.5">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">DNS Records</p>
                    <p className="text-blue-700 text-sm">Add SPF, DKIM, and MX records to verify your domain</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-0.5">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Domain Management</p>
                    <p className="text-blue-700 text-sm">Access the Domains section to complete verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-indigo-600 rounded-3xl p-6">
                <Users className="h-16 w-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Invite Your Team</h2>
            <p className="text-gray-600 mb-8">
              Collaborate with your team members by inviting them to your MailCub workspace.
              You can always do this later from the Team Management section.
            </p>
            
            <div className="max-w-md mx-auto space-y-4">
              {formData.teamEmails.map((email, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateTeamEmail(index, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="teammate@company.com"
                    />
                  </div>
                  {formData.teamEmails.length > 1 && (
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={addTeamMember}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                + Add another team member
              </button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-600 rounded-3xl p-6">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">You're All Set!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to MailCub! Your account is ready and you can start sending emails right away.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="bg-blue-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verify Domain</h3>
                <p className="text-gray-600 text-sm">Complete DNS verification to start sending</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="bg-green-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Send Test Email</h3>
                <p className="text-gray-600 text-sm">Try sending your first test email</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="bg-purple-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <Key className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Generate API Key</h3>
                <p className="text-gray-600 text-sm">Create API keys for your applications</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {currentStep < steps.length - 1 && steps[currentStep].id !== 'welcome' && (
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Skip for now
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center group"
                style={{ backgroundColor: '#008748' }}
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}