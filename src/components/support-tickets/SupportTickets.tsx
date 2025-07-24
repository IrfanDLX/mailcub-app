import React, { useState } from 'react';
import { Plus, Search, MessageCircle, Paperclip, Send, X, User, Clock, AlertCircle, Image, Download, HelpCircle } from 'lucide-react';
import { SupportTicket, TicketMessage } from '../../types';
import { supportTickets as initialSupportTickets } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';

const TicketDetailModal = ({ 
  ticket, 
  isOpen, 
  onClose, 
  onUpdateTicket 
}: { 
  ticket: SupportTicket | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onUpdateTicket: (ticketId: string, updates: Partial<SupportTicket>) => void; 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setSelectedImages(prev => [...prev, ...imageFiles]);
      
      // Create preview URLs
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ticket) return;

    setIsLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      const message: TicketMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'user',
        senderName: 'John Doe',
        timestamp: new Date().toISOString(),
        attachments: selectedImages.length > 0 ? selectedImages.map(file => file.name) : undefined
      };

      onUpdateTicket(ticket.id, {
        messages: [...ticket.messages, message],
        updatedDate: new Date().toISOString()
      });

      setNewMessage('');
      setSelectedImages([]);
      setImagePreview([]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen || !ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{ticket.title}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} priority
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Ticket #{ticket.id}</span>
              <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
              <span>Updated: {new Date(ticket.updatedDate).toLocaleDateString()}</span>
              {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{message.senderName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white ml-10' 
                    : 'bg-gray-100 text-gray-900 mr-10'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index}>
                          {attachment.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <div className="relative group">
                              <img
                                src={`https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`}
                                alt={attachment}
                                className="max-w-xs rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => window.open(`https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`, '_blank')}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className={`p-2 rounded-full ${
                                    message.sender === 'user' ? 'bg-white bg-opacity-20' : 'bg-black bg-opacity-20'
                                  }`}>
                                    <Image className="h-4 w-4 text-white" />
                                  </button>
                                </div>
                              </div>
                              <div className={`mt-1 text-xs ${
                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-600'
                              }`}>
                                {attachment}
                              </div>
                            </div>
                          ) : (
                            <div className={`flex items-center text-sm p-2 rounded border ${
                              message.sender === 'user' 
                                ? 'border-blue-400 bg-blue-500' 
                                : 'border-gray-300 bg-white'
                            }`}>
                              <Paperclip className="h-3 w-3 mr-2" />
                              <span className="flex-1">{attachment}</span>
                              <button className={`ml-2 p-1 rounded hover:bg-opacity-20 ${
                                message.sender === 'user' ? 'hover:bg-white' : 'hover:bg-gray-200'
                              }`}>
                                <Download className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200">
          {/* Image Preview */}
          {imagePreview.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {imagePreview.length} image{imagePreview.length > 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => {
                    setSelectedImages([]);
                    setImagePreview([]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg"
              >
                <Image className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={isLoading || (!newMessage.trim() && selectedImages.length === 0)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CreateTicketModal = ({ 
  isOpen, 
  onClose, 
  onCreateTicket 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onCreateTicket: (ticket: Partial<SupportTicket>) => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTicket({
      title: formData.title,
      priority: formData.priority as any,
      messages: [{
        id: '1',
        content: formData.message,
        sender: 'user',
        senderName: 'John Doe',
        timestamp: new Date().toISOString()
      }]
    });
    setFormData({ title: '', priority: 'medium', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Support Ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Describe your issue in detail..."
              required
            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingSupportTickets = () => {
    markIntroAsSeen('support-tickets');
  };

  if (!hasSeenIntro('support-tickets')) {
    return (
      <IntroScreen
        title="Support Tickets"
        description="Get help from our support team and track your requests efficiently"
        icon={<HelpCircle className="h-16 w-16 text-pink-600" />}
        features={[
          'Create support tickets for any issues',
          'Track ticket status and responses',
          'Attach files and images to tickets',
          'Communicate directly with support team'
        ]}
        onStart={handleStartUsingSupportTickets}
        primaryColor="pink"
      />
    );
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.includes(searchTerm);
    
    const matchesTab = activeTab === 'all' || ticket.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailOpen(true);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<SupportTicket>) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, ...updates });
    }
  };

  const handleCreateTicket = (ticketData: Partial<SupportTicket>) => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      status: 'open',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      messages: [],
      ...ticketData as SupportTicket
    };
    setTickets([newTicket, ...tickets]);
  };

  const tabs = [
    { id: 'all', label: 'All Tickets', count: tickets.length },
    { id: 'open', label: 'Open', count: tickets.filter(t => t.status === 'open').length },
    { id: 'pending', label: 'Pending', count: tickets.filter(t => t.status === 'pending').length },
    { id: 'closed', label: 'Closed', count: tickets.filter(t => t.status === 'closed').length },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'low': return <Clock className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your support requests</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
              onClick={() => handleViewTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getPriorityIcon(ticket.priority)}
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{ticket.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>#{ticket.id}</span>
                    <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                    <span>Updated: {new Date(ticket.updatedDate).toLocaleDateString()}</span>
                    {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
                  </div>
                  {ticket.messages.length > 0 && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {ticket.messages[ticket.messages.length - 1].content}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
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
                <MessageCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No tickets found' : 'No support tickets yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first support ticket to get help from our team'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Ticket
              </button>
            )}
          </div>
        )}
      </div>

      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateTicket={handleUpdateTicket}
      />

      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateTicket={handleCreateTicket}
      />
    </div>
  );
}