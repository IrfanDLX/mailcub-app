import React, { useState } from 'react';
import { useEffect } from 'react';
import { Plus, Globe, CheckCircle, XCircle, Clock, Copy, RefreshCw, Trash2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Domain } from '../../types';
import { domains as initialDomains } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import ConfirmationModal from '../common/ConfirmationModal';
import LoadingSkeleton, { StatCardSkeleton } from '../common/LoadingSkeleton';

const DomainModal = ({ 
  domain, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  domain?: Domain; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (domain: string) => void; 
}) => {
  const [domainName, setDomainName] = useState(domain?.domain || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(domainName);
    setDomainName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Domain</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain Name
            </label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="example.com"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter your domain without www or https://
            </p>
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
              Add Domain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DNSRecordsModal = ({ 
  domain, 
  isOpen, 
  onClose 
}: { 
  domain: Domain | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  const toggleValueVisibility = (recordType: string) => {
    setShowValues(prev => ({ ...prev, [recordType]: !prev[recordType] }));
  };

  const copyToClipboard = async (text: string, recordType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRecord(recordType);
      setTimeout(() => setCopiedRecord(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  if (!isOpen || !domain) return null;

  const records = [
    { type: 'SPF', status: domain.dnsRecords.spf.status, value: domain.dnsRecords.spf.value },
    { type: 'DKIM', status: domain.dnsRecords.dkim.status, value: domain.dnsRecords.dkim.value },
    { type: 'MX', status: domain.dnsRecords.mx.status, value: domain.dnsRecords.mx.value }
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">DNS Records for {domain.domain}</h2>
            <p className="text-gray-600 dark:text-gray-400">Add these DNS records to your domain provider</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {records.map((record) => (
            <div key={record.type} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{record.type} Record</h3>
                  <div className="flex items-center">
                    {getStatusIcon(record.status)}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1 font-mono text-sm text-gray-900 dark:text-white break-all">
                    {showValues[record.type] ? record.value : '•'.repeat(50)}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleValueVisibility(record.type)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showValues[record.type] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(record.value, record.type)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {copiedRecord === record.type && (
                      <span className="text-green-600 dark:text-green-400 text-xs">Copied!</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Type:</strong> TXT</p>
                <p><strong>Name:</strong> {record.type === 'MX' ? '@' : record.type === 'DKIM' ? 'mailcub._domainkey' : '@'}</p>
                <p><strong>TTL:</strong> 3600</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>DNS changes can take up to 48 hours to propagate.</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#008748' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DomainManagement() {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDNSModalOpen, setIsDNSModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState<Domain | null>(null);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDomains(initialDomains);
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  const handleStartUsingDomains = () => {
    markIntroAsSeen('domains');
  };

  if (!hasSeenIntro('domains')) {
    return (
      <IntroScreen
        title="Domain Management"
        description="Add and verify your domains to start sending emails from your own addresses"
        icon={<Globe className="h-16 w-16 text-green-600" />}
        features={[
          'Add unlimited custom domains',
          'Automatic DNS record generation',
          'Real-time verification status',
          'SPF, DKIM, and MX record management'
        ]}
        onStart={handleStartUsingDomains}
        primaryColor="green"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <LoadingSkeleton variant="text" width={200} height={32} className="mb-2" />
            <LoadingSkeleton variant="text" width={250} />
          </div>
          <LoadingSkeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* Domains List Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <LoadingSkeleton variant="text" width={120} className="mb-2" />
            <LoadingSkeleton variant="text" width={180} />
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

                    <div className="flex items-center space-x-6 mb-3">
                      <LoadingSkeleton variant="text" width={120} />
                      <LoadingSkeleton variant="text" width={140} />
                    </div>

                    <div className="flex items-center space-x-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <LoadingSkeleton variant="text" width={30} />
                          <LoadingSkeleton variant="rectangular" width={16} height={16} className="rounded" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <LoadingSkeleton variant="rectangular" width={80} height={32} className="rounded-lg" />
                    <LoadingSkeleton variant="rectangular" width={32} height={32} className="rounded-lg" />
                    <LoadingSkeleton variant="rectangular" width={32} height={32} className="rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleAddDomain = (domainName: string) => {
    const newDomain: Domain = {
      id: Date.now().toString(),
      domain: domainName,
      status: 'pending',
      dnsRecords: {
        spf: { status: 'pending', value: 'v=spf1 include:mailcub.com ~all' },
        dkim: { status: 'pending', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...' },
        mx: { status: 'pending', value: '10 mx.mailcub.com' }
      },
      createdDate: new Date().toISOString().split('T')[0]
    };
    setDomains([...domains, newDomain]);
  };

  const handleDeleteDomain = (id: string) => {
    const domain = domains.find(d => d.id === id);
    if (domain) {
      setDomainToDelete(domain);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (domainToDelete) {
      setDomains(domains.filter(domain => domain.id !== domainToDelete.id));
      setDomainToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const handleVerifyDomain = (id: string) => {
    // Simulate verification
    setDomains(domains.map(domain =>
      domain.id === id 
        ? { 
            ...domain, 
            status: Math.random() > 0.5 ? 'verified' : 'failed',
            verifiedDate: domain.status === 'pending' ? new Date().toISOString().split('T')[0] : domain.verifiedDate
          }
        : domain
    ));
  };

  const handleViewDNS = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsDNSModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const statusCounts = domains.reduce((acc, domain) => {
    acc[domain.status] = (acc[domain.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Domain Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Add and verify domains to send emails</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#008748' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Domain
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{domains.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Domains</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{statusCounts.verified || 0}</h3>
              <p className="text-gray-600 dark:text-gray-400">Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{statusCounts.pending || 0}</h3>
              <p className="text-gray-600 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{statusCounts.failed || 0}</h3>
              <p className="text-gray-600 dark:text-gray-400">Failed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domains List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Domains</h2>
          <p className="text-gray-600 dark:text-gray-400">{domains.length} domains configured</p>
        </div>

        {domains.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No domains added yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first domain to start sending emails from your own address</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#008748' }}
            >
              Add Domain
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {domains.map((domain) => (
              <div key={domain.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{domain.domain}</h3>
                      <div className="flex items-center">
                        {getStatusIcon(domain.status)}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(domain.status)}`}>
                          {domain.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>Added: {new Date(domain.createdDate).toLocaleDateString()}</span>
                      {domain.verifiedDate && (
                        <span>Verified: {new Date(domain.verifiedDate).toLocaleDateString()}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">SPF:</span>
                        {getStatusIcon(domain.dnsRecords.spf.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">DKIM:</span>
                        {getStatusIcon(domain.dnsRecords.dkim.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">MX:</span>
                        {getStatusIcon(domain.dnsRecords.mx.status)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewDNS(domain)}
                      className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      View DNS
                    </button>
                    
                    {domain.status !== 'verified' && (
                      <button
                        onClick={() => handleVerifyDomain(domain.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Verify domain"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteDomain(domain.id)}
                      className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete domain"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DomainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDomain}
      />

      <DNSRecordsModal
        domain={selectedDomain}
        isOpen={isDNSModalOpen}
        onClose={() => setIsDNSModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDomainToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Domain"
        message={`Are you sure you want to delete the domain "${domainToDelete?.domain}"? This action cannot be undone and will affect any email accounts using this domain.`}
        confirmText="Delete Domain"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}