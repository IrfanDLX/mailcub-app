export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  lastLogin?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  status: 'active' | 'revoked';
  createdDate: string;
  lastUsed?: string;
  usageCount: number;
}

export interface Domain {
  id: string;
  domain: string;
  status: 'verified' | 'pending' | 'failed';
  dnsRecords: {
    spf: { status: 'verified' | 'pending' | 'failed'; value: string };
    dkim: { status: 'verified' | 'pending' | 'failed'; value: string };
    mx: { status: 'verified' | 'pending' | 'failed'; value: string };
  };
  createdDate: string;
  verifiedDate?: string;
}

export interface EmailAccount {
  id: string;
  username: string;
  domain: string;
  fullEmail: string;
  status: 'active' | 'inactive';
  createdDate: string;
  storageUsed: number;
  storageLimit: number;
}

export interface EmailLog {
  id: string;
  status: 'delivered' | 'bounced' | 'deferred' | 'sent';
  fromEmail: string;
  recipientEmail: string;
  subject: string;
  date: string;
  content?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
  updatedDate: string;
  messages: TicketMessage[];
  assignedTo?: string;
}

export interface TicketMessage {
  id: string;
  content: string;
  sender: 'user' | 'support';
  senderName: string;
  timestamp: string;
  attachments?: string[];
}