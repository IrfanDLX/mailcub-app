import React, { useState } from 'react';
import { useEffect } from 'react';
import { Send, Mail, User, FileText, Paperclip, CheckCircle, TestTube } from 'lucide-react';
import { emailAccounts } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import LoadingSkeleton from '../common/LoadingSkeleton';

export default function SendTestEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    from: emailAccounts.length > 0 ? emailAccounts[0].fullEmail : '',
    to: '',
    subject: '',
    message: '',
    isHtml: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStartUsingSendTestEmail = () => {
    markIntroAsSeen('send-test-email');
  };

  if (!hasSeenIntro('send-test-email')) {
    return (
      <IntroScreen
        title="Send Test Email"
        description="Test your email setup by sending test emails to verify deliverability"
        icon={<Send className="h-16 w-16 text-orange-600" />}
        features={[
          'Send test emails to verify your setup',
          'Use pre-built email templates',
          'Monitor delivery status in real-time',
          'Test different sender accounts'
        ]}
        onStart={handleStartUsingSendTestEmail}
        primaryColor="orange"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <LoadingSkeleton variant="text" width={180} height={32} className="mb-2" />
          <LoadingSkeleton variant="text" width={300} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Composer Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <LoadingSkeleton variant="text" width={120} />
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <LoadingSkeleton variant="text" width={40} className="mb-2" />
                    <LoadingSkeleton variant="rectangular" height={40} className="rounded-lg" />
                  </div>
                  <div>
                    <LoadingSkeleton variant="text" width={30} className="mb-2" />
                    <LoadingSkeleton variant="rectangular" height={40} className="rounded-lg" />
                  </div>
                </div>

                <div>
                  <LoadingSkeleton variant="text" width={60} className="mb-2" />
                  <LoadingSkeleton variant="rectangular" height={40} className="rounded-lg" />
                </div>

                <div>
                  <LoadingSkeleton variant="text" width={60} className="mb-2" />
                  <LoadingSkeleton variant="rectangular" height={200} className="rounded-lg" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <LoadingSkeleton variant="rectangular" width={100} height={20} className="rounded" />
                    <LoadingSkeleton variant="rectangular" width={80} height={20} className="rounded" />
                  </div>
                  <LoadingSkeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Quick Stats Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <LoadingSkeleton variant="text" width={100} className="mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LoadingSkeleton variant="rectangular" width={16} height={16} className="rounded mr-2" />
                      <LoadingSkeleton variant="text" width={100} />
                    </div>
                    <LoadingSkeleton variant="text" width={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Email Templates Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <LoadingSkeleton variant="text" width={120} className="mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <LoadingSkeleton variant="text" width="80%" className="mb-1" />
                    <LoadingSkeleton variant="text" width="60%" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Skeleton */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
              <LoadingSkeleton variant="text" width={100} className="mb-3" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start">
                    <LoadingSkeleton variant="rectangular" width={6} height={6} className="rounded-full mt-2 mr-2" />
                    <LoadingSkeleton variant="text" width="90%" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const templateSuggestions = [
    {
      subject: 'Welcome to our service!',
      message: 'Thank you for joining us. We\'re excited to have you on board!'
    },
    {
      subject: 'Password Reset Request',
      message: 'You have requested to reset your password. Click the link below to proceed.'
    },
    {
      subject: 'Monthly Newsletter',
      message: 'Here are the latest updates and news from our team.'
    }
  ];

  const applyTemplate = (template: { subject: string; message: string }) => {
    setFormData({
      ...formData,
      subject: template.subject,
      message: template.message
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Send Test Email</h1>
        <p className="text-gray-600 dark:text-gray-400">Compose and send test emails to verify your setup</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Compose Email</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                  <select
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select sender</option>
                    {emailAccounts.filter(account => account.status === 'active').map((account) => (
                      <option key={account.id} value={account.fullEmail}>
                        {account.fullEmail}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <input
                    type="email"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="recipient@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Email subject"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your message here..."
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isHtml"
                      checked={formData.isHtml}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">HTML Format</span>
                  </label>
                  
                  <button
                    type="button"
                    className="flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    <span className="text-sm">Attach File</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-6 py-2 text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#008748' }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Success Message */}
          {isSent && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <p className="text-green-800 dark:text-green-300 font-medium">Email sent successfully!</p>
              </div>
              <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                Your test email has been queued for delivery to {formData.to}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Accounts</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {emailAccounts.filter(a => a.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available Senders</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {emailAccounts.filter(a => a.status === 'active').length}
                </span>
              </div>
            </div>
          </div>

          {/* Email Templates */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Templates</h3>
            <div className="space-y-3">
              {templateSuggestions.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {template.subject}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {template.message}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-3">Sending Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Test with your own email first
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Check spam folders if not received
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Verify domain DNS records are set up
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Use meaningful subject lines
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}