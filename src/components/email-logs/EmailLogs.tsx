import React, { useState } from 'react';
import { Search, Filter, Eye, Download, RefreshCw, Calendar, FileText } from 'lucide-react';
import { EmailLog } from '../../types';
import { emailLogs as initialEmailLogs } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';

const EmailPreviewModal = ({ 
  email, 
  isOpen, 
  onClose 
}: { 
  email: EmailLog | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen || !email) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Preview</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Status</label>
              <p className={`mt-1 px-2 py-1 rounded-full text-xs font-medium inline-block ${
                email.status === 'delivered' ? 'bg-green-100 text-green-800' :
                email.status === 'bounced' ? 'bg-red-100 text-red-800' :
                email.status === 'deferred' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {email.status}
              </p>
            </div>
            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Date</label>
              <p className="text-gray-900 dark:text-white mt-1">{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">From</label>
            <p className="text-gray-900 dark:text-white mt-1">{email.fromEmail}</p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">To</label>
            <p className="text-gray-900 dark:text-white mt-1">{email.recipientEmail}</p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <p className="text-gray-900 dark:text-white mt-1">{email.subject}</p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">Content</label>
            <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{email.content || 'No content available'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EmailLogs() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(initialEmailLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingEmailLogs = () => {
    markIntroAsSeen('email-logs');
  };

  if (!hasSeenIntro('email-logs')) {
    return (
      <IntroScreen
        title="Email Logs"
        description="Track and monitor all your email activity with detailed logs and analytics"
        icon={<FileText className="h-16 w-16 text-teal-600" />}
        features={[
          'View detailed logs of all sent emails',
          'Filter by status, date, and recipients',
          'Monitor delivery rates and bounces',
          'Export logs for analysis'
        ]}
        onStart={handleStartUsingEmailLogs}
        primaryColor="teal"
      />
    );
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handlePreview = (email: EmailLog) => {
    setSelectedEmail(email);
    setIsPreviewOpen(true);
  };

  const filteredLogs = emailLogs.filter(log => {
    const matchesSearch = 
      log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.fromEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = new Date(log.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status: string) => {
    const baseClasses = "h-2 w-2 rounded-full";
    switch (status) {
      case 'delivered': return <div className={`${baseClasses} bg-green-500`} />;
      case 'bounced': return <div className={`${baseClasses} bg-red-500`} />;
      case 'deferred': return <div className={`${baseClasses} bg-yellow-500`} />;
      default: return <div className={`${baseClasses} bg-blue-500`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      case 'deferred': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Logs</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and monitor all your email activity</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: emailLogs.length, color: 'blue' },
          { label: 'Delivered', value: emailLogs.filter(l => l.status === 'delivered').length, color: 'green' },
          { label: 'Bounced', value: emailLogs.filter(l => l.status === 'bounced').length, color: 'red' },
          { label: 'Deferred', value: emailLogs.filter(l => l.status === 'deferred').length, color: 'yellow' },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
              <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                {getStatusIcon(stat.label.toLowerCase().replace(' ', ''))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="bounced">Bounced</option>
              <option value="deferred">Deferred</option>
              <option value="sent">Sent</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredLogs.length} of {emailLogs.length} emails
          </div>
        </div>
      </div>

      {/* Email Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(log.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {log.fromEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                      {log.recipientEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                      {log.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(log.date).toLocaleDateString()} {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handlePreview(log)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <Search className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No emails found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <EmailPreviewModal
        email={selectedEmail}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}