import React, { useState } from 'react';
import { useEffect } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, Edit, X, Key, Calendar, Activity } from 'lucide-react';
import { ApiKey } from '../../types';
import { apiKeys as initialApiKeys } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import ConfirmationModal from '../common/ConfirmationModal';
import LoadingSkeleton, { StatCardSkeleton } from '../common/LoadingSkeleton';

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
    permissions: apiKey?.permissions || ['send']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const togglePermission = (permission: string) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.includes(permission)
        ? formData.permissions.filter(p => p !== permission)
        : [...formData.permissions, permission]
    });
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Production API"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions
            </label>
            <div className="space-y-2">
              {['send', 'read', 'logs', 'domains'].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {permission}
                  </span>
                </label>
              ))}
            </div>
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setApiKeys(initialApiKeys);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartUsingApiKeys = () => {
    markIntroAsSeen('api-keys');
  };

  if (!hasSeenIntro('api-keys')) {
    return (
      <IntroScreen
        title="API Key Management"
        description="Create and manage secure API keys to integrate MailCub with your applications"
        icon={<Key className="h-16 w-16 text-purple-600" />}
        features={[
          'Generate secure API keys with custom permissions',
          'Monitor API usage and track performance',
          'Revoke or regenerate keys instantly',
          'Set granular permissions for different use cases'
        ]}
        onStart={handleStartUsingApiKeys}
        primaryColor="purple"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <LoadingSkeleton variant="text" width={200} height={32} className="mb-2" />
            <LoadingSkeleton variant="text" width={300} />
          </div>
          <LoadingSkeleton variant="rectangular" width={140} height={40} className="rounded-lg" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* API Keys List Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <LoadingSkeleton variant="text" width={100} className="mb-2" />
            <LoadingSkeleton variant="text" width={150} />
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <LoadingSkeleton variant="text" width={150} />
                      <LoadingSkeleton variant="rectangular" width={60} height={24} className="rounded-full" />
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <LoadingSkeleton variant="rectangular" width={300} height={36} className="rounded-lg" />
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <LoadingSkeleton variant="text" width={120} />
                      <LoadingSkeleton variant="text" width={100} />
                      <LoadingSkeleton variant="text" width={140} />
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <LoadingSkeleton variant="text" width={80} />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <LoadingSkeleton key={i} variant="rectangular" width={50} height={20} className="rounded" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <LoadingSkeleton variant="rectangular" width={32} height={32} className="rounded" />
                    <LoadingSkeleton variant="rectangular" width={32} height={32} className="rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    const apiKey = apiKeys.find(k => k.id === id);
    if (apiKey) {
      setKeyToDelete(apiKey);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete.id));
      setKeyToDelete(null);
    }
    setShowDeleteModal(false);
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
        key: `mc_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        usageCount: 0,
        ...apiKeyData as ApiKey
      };
      setApiKeys([...apiKeys, newApiKey]);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 8) + '•'.repeat(20) + key.substring(key.length - 4);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'revoked': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Key Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage API keys for your applications</p>
        </div>
        <button
          onClick={handleAddApiKey}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#008748' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {apiKeys.filter(k => k.status === 'active').length}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Active Keys</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {apiKeys.reduce((sum, key) => sum + key.usageCount, 0).toLocaleString()}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Total Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {apiKeys.filter(k => k.lastUsed && new Date(k.lastUsed) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Used This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h2>
          <p className="text-gray-600 dark:text-gray-400">{apiKeys.length} keys total</p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{apiKey.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                      {apiKey.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 font-mono text-sm">
                      <span className="text-gray-900 dark:text-white">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                      </span>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      {copiedKey === apiKey.id && (
                        <span className="ml-2 text-green-600 dark:text-green-400 text-xs">Copied!</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>Created: {new Date(apiKey.createdDate).toLocaleDateString()}</span>
                    {apiKey.lastUsed && (
                      <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                    )}
                    <span>Usage: {apiKey.usageCount.toLocaleString()} requests</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Permissions:</span>
                    {apiKey.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded text-xs font-medium"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditApiKey(apiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Edit className="h-4 w-4" />
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
                <Key className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No API keys yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first API key to start integrating with MailCub</p>
            <button
              onClick={handleAddApiKey}
             className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
             style={{ backgroundColor: '#008748' }}
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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setKeyToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete API Key"
        message={`Are you sure you want to delete the API key "${keyToDelete?.name}"? This action cannot be undone and any applications using this key will stop working immediately.`}
        confirmText="Delete API Key"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}