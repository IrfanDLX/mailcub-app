import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, LogOut, Settings, Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onLogout?: () => void;
  currentSection: string;
}

const sectionTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  team: 'Team Management',
  'api-keys': 'API Keys',
  domains: 'Domain Management',
  'email-accounts': 'Email Accounts',
  'send-test-email': 'Send Test Email',
  'email-logs': 'Email Logs',
  'support-tickets': 'Support Tickets',
  profile: 'Profile',
  subscription: 'Subscription',
  'payment-plans': 'Payment Plans'
};

const breadcrumbPaths: Record<string, string[]> = {
  dashboard: ['Dashboard'],
  team: ['Dashboard', 'Team Management'],
  'api-keys': ['Dashboard', 'API Keys'],
  domains: ['Dashboard', 'Domain Management'],
  'email-accounts': ['Dashboard', 'Email Accounts'],
  'send-test-email': ['Dashboard', 'Send Test Email'],
  'email-logs': ['Dashboard', 'Email Logs'],
  'support-tickets': ['Dashboard', 'Support Tickets'],
  profile: ['Dashboard', 'Profile'],
  subscription: ['Dashboard', 'Subscription'],
  'payment-plans': ['Dashboard', 'Subscription', 'Payment Plans']
};

export default function Header({ onToggleSidebar, isSidebarOpen, onLogout, currentSection }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, message: 'Domain verification completed for company.com', time: '2 minutes ago', unread: true },
    { id: 2, message: 'API usage limit reached 80%', time: '1 hour ago', unread: true },
    { id: 3, message: 'New support ticket #123 created', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  const currentTitle = sectionTitles[currentSection] || 'Dashboard';
  const breadcrumbs = breadcrumbPaths[currentSection] || ['Dashboard'];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
          </button>
          <div className="ml-2 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{currentTitle}</h1>
            <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="h-3 w-3" />}
                  <span className={index === breadcrumbs.length - 1 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        notification.unread ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-2">
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <User className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}