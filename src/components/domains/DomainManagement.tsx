import React, { useState } from 'react';
import { Plus, CheckCircle, AlertCircle, XCircle, RefreshCw, X, Copy, Globe } from 'lucide-react';
import { Domain } from '../../types';
import { domains as initialDomains } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import EmptyState from '../common/EmptyState';

const DomainModal = ({ 
  domain, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  domain?: Domain; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (domain: Partial<Domain>) => void; 
}) => {
  const [domainName, setDomainName] = useState(domain?.domain || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ domain: domainName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {domain ? 'Edit Domain' : 'Add Domain'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain Name</label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="example.com"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter your domain name without www or https://
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
              {domain ? 'Update' : 'Add'} Domain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DNSVerificationModal = ({ 
  domain, 
  isOpen, 
  onClose 
}: { 
  domain: Domain | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  const copyToClipboard = async (text: string, record: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRecord(record);
      setTimeout(() => setCopiedRecord(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen || !domain) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            DNS Verification for {domain.domain}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2">DNS Setup Instructions</h3>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              Add the following DNS records to your domain to enable email sending through MailCub.
              Changes may take up to 48 hours to propagate.
            </p>
          </div>

          {/* SPF Record */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h4 className="font-medium text-gray-900 dark:text-white">SPF Record</h4>
                {getStatusIcon(domain.dnsRecords.spf.status)}
                <span className={`ml-2 text-sm font-medium ${getStatusColor(domain.dnsRecords.spf.status)}`}>
                  {domain.dnsRecords.spf.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Type</label>
                <p className="text-gray-900 dark:text-white">TXT</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-gray-900 dark:text-white">@</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Value</label>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded flex-1 text-gray-900 dark:text-gray-100">
                    {domain.dnsRecords.spf.value}
                  </code>
                  <button
                    onClick={() => copyToClipboard(domain.dnsRecords.spf.value, 'spf')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copiedRecord === 'spf' && (
                    <span className="text-green-600 dark:text-green-400 text-xs">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DKIM Record */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h4 className="font-medium text-gray-900 dark:text-white">DKIM Record</h4>
                {getStatusIcon(domain.dnsRecords.dkim.status)}
                <span className={`ml-2 text-sm font-medium ${getStatusColor(domain.dnsRecords.dkim.status)}`}>
                  {domain.dnsRecords.dkim.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Type</label>
                <p className="text-gray-900 dark:text-white">TXT</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-gray-900 dark:text-white">mailcub._domainkey</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Value</label>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded flex-1 break-all text-gray-900 dark:text-gray-100">
                    {domain.dnsRecords.dkim.value}
                  </code>
                  <button
                    onClick={() => copyToClipboard(domain.dnsRecords.dkim.value, 'dkim')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copiedRecord === 'dkim' && (
                    <span className="text-green-600 dark:text-green-400 text-xs">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MX Record */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h4 className="font-medium text-gray-900 dark:text-white">MX Record</h4>
                {getStatusIcon(domain.dnsRecords.mx.status)}
                <span className={`ml-2 text-sm font-medium ${getStatusColor(domain.dnsRecords.mx.status)}`}>
                  {domain.dnsRecords.mx.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Type</label>
                <p className="text-gray-900 dark:text-white">MX</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-gray-900 dark:text-white">@</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Value</label>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded flex-1 text-gray-900 dark:text-gray-100">
                    {domain.dnsRecords.mx.value}
                  </code>
                  <button
                    onClick={() => copyToClipboard(domain.dnsRecords.mx.value, 'mx')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copiedRecord === 'mx' && (
                    <span className="text-green-600 dark:text-green-400 text-xs">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Close
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <button 
              className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#008748' }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Verify DNS Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DomainManagement() {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDNSModalOpen, setIsDNSModalOpen] = useState(false);
  const [dnsModalDomain, setDNSModalDomain] = useState<Domain | null>(null);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingDomains = () => {
    markIntroAsSeen('domains');
  };

  if (!hasSeenIntro('domains')) {
    return (
      <IntroScreen
        title="Domain Management"
        description="Connect and verify your domains to start sending emails with your brand"
        icon={<Globe className="h-16 w-16 text-green-600" />}
        features={[
          'Add multiple domains to your account',
          'Verify domain ownership with DNS records',
          'Monitor domain verification status',
          'Manage SPF, DKIM, and MX records'
        ]}
        onStart={handleStartUsingDomains}
        primaryColor="green"
      />
    );
  }

  const handleAddDomain = () => {
    setSelectedDomain(null);
    setIsModalOpen(true);
  };

  const handleEditDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsModalOpen(true);
  };

  const handleDeleteDomain = (id: string) => {
    if (confirm('Are you sure you want to delete this domain?')) {
      setDomains(domains.filter(domain => domain.id !== id));
    }
  };

  const handleSaveDomain = (domainData: Partial<Domain>) => {
    if (selectedDomain) {
      // Update existing domain
      setDomains(domains.map(domain =>
        domain.id === selectedDomain.id ? { ...domain, ...domainData } : domain
      ));
    } else {
      // Add new domain
      const newDomain: Domain = {
        id: Date.now().toString(),
        status: 'pending',
        dnsRecords: {
          spf: { status: 'pending', value: 'v=spf1 include:mailcub.com ~all' },
          dkim: { status: 'pending', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...' },
          mx: { status: 'pending', value: '10 mx.mailcub.com' }
        },
        createdDate: new Date().toISOString().split('T')[0],
        ...domainData as Domain
      };
      setDomains([...domains, newDomain]);
    }
  };

  const handleVerifyDNS = (domain: Domain) => {
    setDNSModalDomain(domain);
    setIsDNSModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Domain Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and verify your domains for email sending</p>
        </div>
        <button
          onClick={handleAddDomain}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#008748' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Domain
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{domain.domain}</h3>
              <div className="flex items-center">
                {getStatusIcon(domain.status)}
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(domain.status)}`}>
                  {domain.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">SPF</span>
                <div className="flex items-center">
                  {getStatusIcon(domain.dnsRecords.spf.status)}
                  <span className={`ml-1 text-xs ${domain.dnsRecords.spf.status === 'verified' ? 'text-green-600' : domain.dnsRecords.spf.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {domain.dnsRecords.spf.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">DKIM</span>
                <div className="flex items-center">
                  {getStatusIcon(domain.dnsRecords.dkim.status)}
                  <span className={`ml-1 text-xs ${domain.dnsRecords.dkim.status === 'verified' ? 'text-green-600' : domain.dnsRecords.dkim.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {domain.dnsRecords.dkim.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">MX</span>
                <div className="flex items-center">
                  {getStatusIcon(domain.dnsRecords.mx.status)}
                  <span className={`ml-1 text-xs ${domain.dnsRecords.mx.status === 'verified' ? 'text-green-600' : domain.dnsRecords.mx.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {domain.dnsRecords.mx.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <p>Added: {new Date(domain.createdDate).toLocaleDateString()}</p>
              {domain.verifiedDate && (
                <p>Verified: {new Date(domain.verifiedDate).toLocaleDateString()}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVerifyDNS(domain)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Verify DNS
              </button>
              <button
                onClick={() => handleDeleteDomain(domain.id)}
                className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {domains.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
              <Plus className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No domains yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first domain to start sending emails through MailCub</p>
          <button
            onClick={handleAddDomain}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#008748' }}
          >
            Add Domain
          </button>
        </div>
      )}

      <DomainModal
        domain={selectedDomain}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDomain}
      />

      <DNSVerificationModal
        domain={dnsModalDomain}
        isOpen={isDNSModalOpen}
        onClose={() => setIsDNSModalOpen(false)}
      />
    </div>
  );
}