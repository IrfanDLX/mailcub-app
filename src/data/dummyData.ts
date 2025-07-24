import { TeamMember, ApiKey, Domain, EmailAccount, EmailLog, SupportTicket } from '../types';

export const dashboardStats = {
  domains: { used: 3, allowed: 10 },
  emails: { used: 127, allowed: 500 },
  webmails: { used: 8, allowed: 25 },
  accountStatus: 'active',
  totalApiKeys: 5,
  totalStorage: { used: 2.3, limit: 10 }, // in GB
  emailStats: {
    totalSent: 15420,
    totalDelivered: 14890,
    totalBounced: 342,
    totalDeferred: 188,
    chartData: [
      { date: '2024-01-01', sent: 1200, delivered: 1150, bounced: 30, deferred: 20 },
      { date: '2024-01-02', sent: 1350, delivered: 1290, bounced: 35, deferred: 25 },
      { date: '2024-01-03', sent: 1180, delivered: 1120, bounced: 40, deferred: 20 },
      { date: '2024-01-04', sent: 1420, delivered: 1380, bounced: 25, deferred: 15 },
      { date: '2024-01-05', sent: 1600, delivered: 1550, bounced: 32, deferred: 18 },
      { date: '2024-01-06', sent: 1380, delivered: 1340, bounced: 28, deferred: 12 },
      { date: '2024-01-07', sent: 1550, delivered: 1500, bounced: 35, deferred: 15 },
    ]
  }
};

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'admin',
    permissions: ['dashboard', 'team', 'api-keys', 'domains', 'email-accounts', 'send-test', 'email-logs', 'support'],
    status: 'active',
    joinedDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@company.com',
    role: 'user',
    permissions: ['dashboard', 'email-accounts', 'send-test', 'email-logs'],
    status: 'active',
    joinedDate: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'viewer',
    permissions: ['dashboard', 'email-logs'],
    status: 'inactive',
    joinedDate: '2024-01-28'
  }
];

export const apiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'mc_live_abc123def456ghi789',
    permissions: ['send', 'read', 'logs'],
    status: 'active',
    createdDate: '2024-01-10',
    lastUsed: '2024-01-07T10:30:00Z',
    usageCount: 15420
  },
  {
    id: '2',
    name: 'Development API',
    key: 'mc_test_xyz789uvw456rst123',
    permissions: ['send', 'read'],
    status: 'active',
    createdDate: '2024-01-15',
    lastUsed: '2024-01-06T14:22:00Z',
    usageCount: 892
  },
  {
    id: '3',
    name: 'Legacy API',
    key: 'mc_live_old123old456old789',
    permissions: ['read'],
    status: 'revoked',
    createdDate: '2023-12-01',
    lastUsed: '2024-01-01T09:15:00Z',
    usageCount: 5420
  }
];

export const domains: Domain[] = [
  {
    id: '1',
    domain: 'company.com',
    status: 'verified',
    dnsRecords: {
      spf: { status: 'verified', value: 'v=spf1 include:mailcub.com ~all' },
      dkim: { status: 'verified', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...' },
      mx: { status: 'verified', value: '10 mx.mailcub.com' }
    },
    createdDate: '2024-01-10',
    verifiedDate: '2024-01-12'
  },
  {
    id: '2',
    domain: 'newdomain.com',
    status: 'pending',
    dnsRecords: {
      spf: { status: 'verified', value: 'v=spf1 include:mailcub.com ~all' },
      dkim: { status: 'pending', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...' },
      mx: { status: 'failed', value: '10 mx.mailcub.com' }
    },
    createdDate: '2024-01-05'
  },
  {
    id: '3',
    domain: 'testdomain.org',
    status: 'failed',
    dnsRecords: {
      spf: { status: 'failed', value: 'v=spf1 include:mailcub.com ~all' },
      dkim: { status: 'failed', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...' },
      mx: { status: 'failed', value: '10 mx.mailcub.com' }
    },
    createdDate: '2024-01-02'
  }
];

export const emailAccounts: EmailAccount[] = [
  {
    id: '1',
    username: 'info',
    domain: 'company.com',
    fullEmail: 'info@company.com',
    status: 'active',
    createdDate: '2024-01-10',
    storageUsed: 150,
    storageLimit: 1000
  },
  {
    id: '2',
    username: 'support',
    domain: 'company.com',
    fullEmail: 'support@company.com',
    status: 'active',
    createdDate: '2024-01-12',
    storageUsed: 320,
    storageLimit: 1000
  },
  {
    id: '3',
    username: 'sales',
    domain: 'company.com',
    fullEmail: 'sales@company.com',
    status: 'inactive',
    createdDate: '2024-01-15',
    storageUsed: 80,
    storageLimit: 500
  }
];

export const emailLogs: EmailLog[] = [
  {
    id: '1',
    status: 'delivered',
    fromEmail: 'info@company.com',
    recipientEmail: 'customer@example.com',
    subject: 'Welcome to our service',
    date: '2024-01-07T10:30:00Z',
    content: 'Thank you for joining our service. We are excited to have you on board!'
  },
  {
    id: '2',
    status: 'bounced',
    fromEmail: 'support@company.com',
    recipientEmail: 'invalid@nonexistent.com',
    subject: 'Your support ticket update',
    date: '2024-01-07T09:15:00Z',
    content: 'Your support ticket #12345 has been updated with new information.'
  },
  {
    id: '3',
    status: 'delivered',
    fromEmail: 'sales@company.com',
    recipientEmail: 'prospect@business.com',
    subject: 'Special offer for your business',
    date: '2024-01-07T08:45:00Z',
    content: 'We have a special offer that might interest your business needs.'
  },
  {
    id: '4',
    status: 'deferred',
    fromEmail: 'info@company.com',
    recipientEmail: 'busy@server.com',
    subject: 'Monthly newsletter',
    date: '2024-01-06T16:20:00Z',
    content: 'Here is your monthly newsletter with the latest updates and news.'
  }
];

export const supportTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'API rate limiting issues',
    status: 'open',
    priority: 'high',
    createdDate: '2024-01-06T14:30:00Z',
    updatedDate: '2024-01-07T09:15:00Z',
    assignedTo: 'Support Team',
    messages: [
      {
        id: '1',
        content: 'I am experiencing rate limiting issues with the API. Getting 429 errors frequently.',
        sender: 'user',
        senderName: 'John Doe',
        timestamp: '2024-01-06T14:30:00Z'
      },
      {
        id: '2',
        content: 'Thank you for reaching out. Can you please provide more details about your API usage patterns?',
        sender: 'support',
        senderName: 'Sarah Support',
        timestamp: '2024-01-06T15:45:00Z'
      },
      {
        id: '3',
        content: 'We are sending approximately 1000 emails per hour during peak times.',
        sender: 'user',
        senderName: 'John Doe',
        timestamp: '2024-01-07T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Domain verification not working',
    status: 'pending',
    priority: 'medium',
    createdDate: '2024-01-05T11:20:00Z',
    updatedDate: '2024-01-06T16:30:00Z',
    assignedTo: 'Technical Team',
    messages: [
      {
        id: '1',
        content: 'I have added all the DNS records but the domain verification is still failing.',
        sender: 'user',
        senderName: 'John Doe',
        timestamp: '2024-01-05T11:20:00Z'
      },
      {
        id: '2',
        content: 'We are investigating this issue. DNS propagation can take up to 48 hours.',
        sender: 'support',
        senderName: 'Mike Technical',
        timestamp: '2024-01-06T16:30:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Email delivery delays',
    status: 'closed',
    priority: 'low',
    createdDate: '2024-01-03T09:10:00Z',
    updatedDate: '2024-01-04T14:20:00Z',
    assignedTo: 'Support Team',
    messages: [
      {
        id: '1',
        content: 'Some emails are taking longer than usual to be delivered.',
        sender: 'user',
        senderName: 'John Doe',
        timestamp: '2024-01-03T09:10:00Z'
      },
      {
        id: '2',
        content: 'This was due to a temporary issue with one of our mail servers. It has been resolved.',
        sender: 'support',
        senderName: 'Sarah Support',
        timestamp: '2024-01-04T14:20:00Z'
      }
    ]
  }
];