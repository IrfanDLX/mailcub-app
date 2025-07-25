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
  CreditCard
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

export default function Sidebar({ activeSection, onSectionChange, isOpen }: SidebarProps) {
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
        fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-xl p-2">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">MailCub</h1>
          </div>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center px-3 py-3 text-left rounded-lg mb-1 transition-colors
                  ${isActive 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-r-2 border-green-700 dark:border-green-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto text-green-700 dark:text-green-400" />}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Need help?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Contact our support team</p>
            <button 
              className="w-full text-white text-sm py-2 rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#008748' }}
            >
              Get Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}