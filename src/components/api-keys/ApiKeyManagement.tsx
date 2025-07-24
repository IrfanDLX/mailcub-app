import React, { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, MoreVertical, X, Key } from 'lucide-react';
import { ApiKey } from '../../types';
import { apiKeys as initialApiKeys } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';

const permissions = [
  { id: 'send', label: 'Send Emails' },
  { id: 'read', label: 'Read Data' },
  { id: 'logs', label: 'Access Logs' },
  { id: 'domains', label: 'Manage Domains' },
  { id: 'accounts', label: 'Manage Accounts' },
];

const ApiKeyModal = ({ 
  apiKey, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  apiKey?: ApiKey; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (apiKey: Partial<ApiKey>) => void; 
}) => {
  const [formData, setFormData] = useState({
    name: apiKey?.name || '',
    permissions: apiKey?.permissions || ['send'],
    status: apiKey?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {apiKey ? 'Edit API Key' : 'Create API Key'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Production API, Development API"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</label>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, permission.id]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter(p => p !== permission.id)
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          {apiKey && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          )}

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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {apiKey ? 'Update' : 'Create'} API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingApiKeys = () => {
    markIntroAsSeen('api-keys');
  };

  if (!hasSeenIntro('api-keys')) {
    return (
      <IntroScreen
        title="API Keys"
        description="Secure your applications with API keys and manage access permissions"
        icon={<Key className="h-16 w-16 text-purple-600" />}
        features={[
          'Generate secure API keys for your applications',
          'Set granular permissions for each key',
          'Monitor API usage and activity',
          'Revoke keys instantly when needed'
        ]}
        onStart={handleStartUsingApiKeys}
        primaryColor="purple"
      />
    );
  }

  const handleAddApiKey = () => {
    setSelectedApiKey(null);
    setIsModalOpen(true);
  };

  const handleEditApiKey = (apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setIsModalOpen(true);
  };

  const handleDeleteApiKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const handleSaveApiKey = (apiKeyData: Partial<ApiKey>) => {
    if (selectedApiKey) {
      // Update existing API key
      setApiKeys(apiKeys.map(key =>
        key.id === selectedApiKey.id ? { ...key, ...apiKeyData } : key
      ));
    } else {
      // Add new API key
      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        key: `mc_${apiKeyData.status === 'active' ? 'live' : 'test'}_${Math.random().toString(36).substr(2, 21)}`,
        createdDate: new Date().toISOString().split('T')[0],
        usageCount: 0,
        ...apiKeyData as ApiKey
      };
      setApiKeys([...apiKeys, newApiKey]);
    }
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(id)) {
      newVisibleKeys.delete(id);
    } else {
      newVisibleKeys.add(id);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  const maskKey = (key: string) => {
    return key.slice(0, 12) + '••••••••••••••••••';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Keys</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your API keys for accessing MailCub services</p>
        </div>
        <button
          onClick={handleAddApiKey}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your API Keys</h2>
          <p className="text-gray-600 dark:text-gray-400">Keep your API keys secure and never share them publicly</p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{apiKey.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      apiKey.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {apiKey.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-900 dark:text-gray-100">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      {copiedKey === apiKey.id && (
                        <span className="text-green-600 dark:text-green-400 text-sm">Copied!</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded"
                      >
                        {permissions.find(p => p.id === permission)?.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>Created: {new Date(apiKey.createdDate).toLocaleDateString()}</span>
                    {apiKey.lastUsed && (
                      <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                    )}
                    <span>Usage: {apiKey.usageCount.toLocaleString()} requests</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditApiKey(apiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteApiKey(apiKey.id)}
                    className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {apiKeys.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <Plus className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No API keys yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first API key to start using MailCub services</p>
            <button
              onClick={handleAddApiKey}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create API Key
            </button>
          </div>
        )}
      </div>

      <ApiKeyModal
        apiKey={selectedApiKey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}