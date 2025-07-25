import React, { useState } from 'react';
import { useEffect } from 'react';
import { Plus, MessageCircle, Clock, CheckCircle, AlertCircle, Send, X, Paperclip, User, HelpCircle } from 'lucide-react';
import { SupportTicket, TicketMessage } from '../../types';
import { supportTickets as initialSupportTickets } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';
import EmptyState from '../common/EmptyState';
import LoadingSkeleton, { StatCardSkeleton } from '../common/LoadingSkeleton';

const TicketModal = ({ 
  ticket, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  ticket?: SupportTicket; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (ticket: Partial<SupportTicket>) => void; 
}) => {
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    priority: ticket?.priority || 'medium',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticket) {
      // Add new message to existing ticket
      const newMessage: TicketMessage = {
        id: Date.now().toString(),
        content: formData.message,
        sender: 'user',
        senderName: 'John Doe',
        timestamp: new Date().toISOString()
      };
      onSave({
        messages: [...ticket.messages, newMessage],
        updatedDate: new Date().toISOString()
      });
    } else {
      // Create new ticket
      const newMessage: TicketMessage = {
        id: '1',
        content: formData.message,
        sender: 'user',
        senderName: 'John Doe',
        timestamp: new Date().toISOString()
      };
      onSave({
        title: formData.title,
        priority: formData.priority as 'low' | 'medium' | 'high',
        messages: [newMessage]
      });
    }
    setFormData({ title: '', priority: 'medium', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {ticket ? 'Reply to Ticket' : 'Create Support Ticket'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!ticket && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe your issue briefly"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ticket ? 'Your Reply' : 'Message'}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={ticket ? "Type your reply..." : "Describe your issue in detail..."}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Paperclip className="h-4 w-4 mr-1" />
              <span className="text-sm">Attach File</span>
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                {ticket ? 'Send Reply' : 'Create Ticket'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const TicketDetailModal = ({ 
  ticket, 
  isOpen, 
  onClose,
  onReply
}: { 
  ticket: SupportTicket | null; 
  isOpen: boolean; 
  onClose: () => void;
  onReply: (ticket: SupportTicket) => void;
}) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{ticket.title}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} priority
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                #{ticket.id}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              } rounded-lg p-4`}>
                <div className="flex items-center mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <HelpCircle className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <span className="font-medium text-sm">{message.senderName}</span>
                  <span className={`ml-2 text-xs ${
                    message.sender === 'user' 
                      ? 'text-blue-200' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
          {ticket.status !== 'closed' && (
            <button
              onClick={() => onReply(ticket)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    case 'pending': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
    case 'closed': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
    default: return <MessageCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
    case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
    case 'closed': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
    case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
    case 'low': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }
};

export default function SupportTickets() {
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setSupportTickets(initialSupportTickets);
      setIsLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const handleStartUsingSupportTickets = () => {
    markIntroAsSeen('support-tickets');
  };

  if (!hasSeenIntro('support-tickets')) {
    return (
      <IntroScreen
        title="Support Tickets"
        description="Get help from our support team and track your support requests"
        icon={<HelpCircle className="h-16 w-16 text-pink-600" />}
        features={[
          'Create support tickets for technical issues',
          'Track ticket status and responses',
          'Communicate directly with support team',
          'Access knowledge base and documentation'
        ]}
        onStart={handleStartUsingSupportTickets}
        primaryColor="pink"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <LoadingSkeleton variant="text" width={150} height={32} className="mb-2" />
            <LoadingSkeleton variant="text" width={300} />
          </div>
          <LoadingSkeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* Filter Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-4">
            <LoadingSkeleton variant="text" width={120} />
            <LoadingSkeleton variant="rectangular" width={150} height={40} className="rounded-lg" />
          </div>
        </div>

        {/* Support Tickets List Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <LoadingSkeleton variant="text" width={150} className="mb-2" />
            <LoadingSkeleton variant="text" width={120} />
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <LoadingSkeleton variant="text" width={200} />
                      <LoadingSkeleton variant="rectangular" width={50} height={20} className="rounded-full" />
                      <LoadingSkeleton variant="rectangular" width={60} height={20} className="rounded-full" />
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <LoadingSkeleton variant="text" width={80} />
                      <LoadingSkeleton variant="text" width={120} />
                      <LoadingSkeleton variant="text" width={140} />
                      <LoadingSkeleton variant="text" width={100} />
                    </div>

                    <LoadingSkeleton variant="text" lines={2} />
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <LoadingSkeleton variant="rectangular" width={16} height={16} className="rounded" />
                    <div className="flex items-center">
                      <LoadingSkeleton variant="rectangular" width={16} height={16} className="rounded mr-1" />
                      <LoadingSkeleton variant="text" width={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredTickets = supportTickets.filter(ticket => 
    statusFilter === 'all' || ticket.status === statusFilter
  );

  const handleCreateTicket = () => {
    setSelectedTicket(null);
    setIsModalOpen(true);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
  };

  const handleReplyToTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  };

  const handleSaveTicket = (ticketData: Partial<SupportTicket>) => {
    if (selectedTicket) {
      // Update existing ticket
      setSupportTickets(supportTickets.map(ticket =>
        ticket.id === selectedTicket.id ? { ...ticket, ...ticketData } : ticket
      ));
    } else {
      // Create new ticket
      const newTicket: SupportTicket = {
        id: Date.now().toString(),
        status: 'open',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        assignedTo: 'Support Team',
        ...ticketData as SupportTicket
      };
      setSupportTickets([newTicket, ...supportTickets]);
    }
  };

  const statusCounts = supportTickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
          <p className="text-gray-600 dark:text-gray-400">Get help and track your support requests</p>
        </div>
        <button
          onClick={handleCreateTicket}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{supportTickets.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Tickets</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{statusCounts.open || 0}</h3>
              <p className="text-gray-600 dark:text-gray-400">Open</p>
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
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{statusCounts.closed || 0}</h3>
              <p className="text-gray-600 dark:text-gray-400">Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Support Tickets</h2>
          <p className="text-gray-600 dark:text-gray-400">{filteredTickets.length} tickets found</p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              onClick={() => handleViewTicket(ticket)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{ticket.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>#{ticket.id}</span>
                    <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                    <span>Updated: {new Date(ticket.updatedDate).toLocaleDateString()}</span>
                    {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {ticket.messages[0]?.content}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {getStatusIcon(ticket.status)}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {ticket.messages.length}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <HelpCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {statusFilter !== 'all' ? 'No tickets found' : 'No support tickets yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {statusFilter !== 'all' 
                ? 'Try adjusting your filter criteria'
                : 'Create your first support ticket to get help from our team'
              }
            </p>
            {statusFilter === 'all' && (
              <button
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Ticket
              </button>
            )}
          </div>
        )}
      </div>

      <TicketModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicket}
      />

      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onReply={handleReplyToTicket}
      />
    </div>
  );
}