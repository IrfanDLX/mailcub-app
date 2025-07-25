import React, { useState } from 'react';
import { Plus, Edit, Trash2, Mail, User, X, Eye, EyeOff, AtSign } from 'lucide-react';
import { EmailAccount } from '../../types';
import { emailAccounts as initialEmailAccounts, domains } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import EmptyState from '../common/EmptyState';

const EmailAccountModal = ({ 
  account, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  account?: EmailAccount; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (account: Partial<EmailAccount>) => void; 
}) => {
  const [formData, setFormData] = useState({
    username: account?.username || '',
    domain: account?.domain || (domains.length > 0 ? domains[0].domain : ''),
    password: '',
    confirmPassword: '',
    status: account?.status || 'active'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const accountData = {
      ...formData,
      fullEmail: `${formData.username}@${formData.domain}`
    };
    delete accountData.confirmPassword;
    
    onSave(accountData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {account ? 'Edit Email Account' : 'Create Email Account'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="info"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                {domains.filter(d => d.status === 'verified').map((domain) => (
                  <option key={domain.id} value={domain.domain}>
                    {domain.domain}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Full email: <strong>{formData.username}@{formData.domain}</strong>
            </p>
          </div>

          {!account && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#008748' }}
            >
              {account ? 'Update' : 'Create'} Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function EmailAccountManagement() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>(initialEmailAccounts);
  const [selectedAccount, setSelectedAccount] = useState<EmailAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingEmailAccounts = () => {
    markIntroAsSeen('email-accounts');
  };

  if (!hasSeenIntro('email-accounts')) {
    return (
      <IntroScreen
        title="Email Accounts"
        description="Create and manage email accounts for your verified domains"
        icon={<Mail className="h-16 w-16 text-indigo-600" />}
        features={[
          'Create email accounts for verified domains',
          'Monitor storage usage and limits',
          'Manage account status and permissions',
          'Track account creation and activity'
        ]}
        onStart={handleStartUsingEmailAccounts}
        primaryColor="indigo"
      />
    );
  }

  const filteredAccounts = emailAccounts.filter(account =>
    account.fullEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account: EmailAccount) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm('Are you sure you want to delete this email account?')) {
      setEmailAccounts(emailAccounts.filter(account => account.id !== id));
    }
  };

  const handleSaveAccount = (accountData: Partial<EmailAccount>) => {
    if (selectedAccount) {
      // Update existing account
      setEmailAccounts(emailAccounts.map(account =>
        account.id === selectedAccount.id ? { ...account, ...accountData } : account
      ));
    } else {
      // Add new account
      const newAccount: EmailAccount = {
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
        storageUsed: 0,
        storageLimit: 1000, // Default 1GB
        ...accountData as EmailAccount
      };
      setEmailAccounts([...emailAccounts, newAccount]);
    }
  };

  const getStoragePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const getStorageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Accounts</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage email accounts for your verified domains</p>
        </div>
        <button
          onClick={handleAddAccount}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#008748' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Account
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Accounts</h2>
              <p className="text-gray-600 dark:text-gray-400">{emailAccounts.length} accounts total</p>
            </div>
            <div className="sm:w-64">
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAccounts.map((account) => {
            const storagePercentage = getStoragePercentage(account.storageUsed, account.storageLimit);
            
            return (
              <div key={account.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      account.status === 'active' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Mail className={`h-5 w-5 ${
                        account.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{account.fullEmail}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Created: {new Date(account.createdDate).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.storageUsed} MB / {account.storageLimit} MB
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{storagePercentage}% used</div>
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${getStorageColor(storagePercentage)}`}
                          style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAccounts.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No accounts found' : 'No email accounts yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first email account to start sending emails'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddAccount}
               className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
               style={{ backgroundColor: '#008748' }}
              >
                Create Account
              </button>
            )}
          </div>
        )}
      </div>

      <EmailAccountModal
        account={selectedAccount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
      />
    </div>
  );
}