import React from 'react';
import { 
  Mail, 
  BarChart3, 
  Users, 
  Key, 
  Globe, 
  AtSign, 
  Send, 
  FileText, 
  HelpCircle,
  ChevronRight,
  User,
  CreditCard,
  Crown,
  Zap,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'team', label: 'Manage Team', icon: Users },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'email-accounts', label: 'Email Accounts', icon: AtSign },
  { id: 'send-test-email', label: 'Send Test Email', icon: Send },
  { id: 'email-logs', label: 'Email Logs', icon: FileText },
  { id: 'support-tickets', label: 'Support Tickets', icon: HelpCircle },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
];

// Mock trial data - in real app this would come from user context/API
const trialInfo = {
  isOnTrial: true,
  daysRemaining: 7,
  totalTrialDays: 14
};

export default function Sidebar({ activeSection, onSectionChange, isOpen }: SidebarProps) {
  const trialPercentage = trialInfo.isOnTrial 
    ? ((trialInfo.totalTrialDays - trialInfo.daysRemaining) / trialInfo.totalTrialDays) * 100 
    : 0;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-20 lg:hidden"
          onClick={() => {}}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transition-all duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 flex-shrink-0">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-2.5 shadow-lg">
              <Mail className="h-6 w-6 text-white drop-shadow-sm" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MailCub</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email Infrastructure</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 shadow-lg border border-green-200 dark:border-green-700' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-md'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-600 dark:bg-green-400 rounded-r-full"></div>
                )}
                <div className={`p-2 rounded-lg mr-3 transition-colors ${
                  isActive 
                    ? 'bg-green-100 dark:bg-green-800/50' 
                    : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    isActive 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`} />
                </div>
                <span className={`font-medium text-sm ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 ml-auto text-green-700 dark:text-green-400" />
                )}
              </button>
            );
          })}
          </div>
        </nav>

        {/* Trial Banner - Moved to bottom */}
        {trialInfo.isOnTrial && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-orange-900 dark:text-orange-200">Free Trial</span>
                </div>
                <span className="text-lg font-bold text-orange-900 dark:text-orange-200">
                  {trialInfo.daysRemaining}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs text-orange-700 dark:text-orange-300 mb-1">
                  <span>Days remaining</span>
                  <span>{trialInfo.daysRemaining} of {trialInfo.totalTrialDays}</span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                  <div 
                    className="bg-orange-500 dark:bg-orange-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trialPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={() => onSectionChange('subscription')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <Crown className="h-3 w-3" />
                <span>Upgrade</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}