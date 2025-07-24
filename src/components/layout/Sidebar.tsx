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
  ChevronRight
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
];

export default function Sidebar({ activeSection, onSectionChange, isOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={() => {}}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-xl p-2">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">MailCub</h1>
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
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto text-blue-700" />}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-1">Need help?</h4>
            <p className="text-sm text-gray-600 mb-3">Contact our support team</p>
            <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}