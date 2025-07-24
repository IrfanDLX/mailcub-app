import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Users, Mail, Shield, UserCheck, UserX, Crown } from 'lucide-react';
import { TeamMember } from '../../types';
import { teamMembers as initialTeamMembers } from '../../data/dummyData';
import { useIntro } from '../../contexts/IntroContext';
import IntroScreen from '../intro/IntroScreen';

const TeamMemberModal = ({ 
  member, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  member?: TeamMember; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (member: Partial<TeamMember>) => void; 
}) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    role: member?.role || 'user',
    permissions: member?.permissions || ['dashboard']
  });

  const allPermissions = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'team', label: 'Team Management' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'domains', label: 'Domains' },
    { id: 'email-accounts', label: 'Email Accounts' },
    { id: 'send-test', label: 'Send Test Email' },
    { id: 'email-logs', label: 'Email Logs' },
    { id: 'support', label: 'Support Tickets' }
  ];

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

  const handleRoleChange = (role: string) => {
    let defaultPermissions: string[] = [];
    switch (role) {
      case 'admin':
        defaultPermissions = allPermissions.map(p => p.id);
        break;
      case 'user':
        defaultPermissions = ['dashboard', 'email-accounts', 'send-test', 'email-logs'];
        break;
      case 'viewer':
        defaultPermissions = ['dashboard', 'email-logs'];
        break;
    }
    setFormData({
      ...formData,
      role: role as 'admin' | 'user' | 'viewer',
      permissions: defaultPermissions
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {member ? 'Edit Team Member' : 'Invite Team Member'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="john@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="viewer">Viewer</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.role === 'admin' && 'Full access to all features'}
              {formData.role === 'user' && 'Access to core email features'}
              {formData.role === 'viewer' && 'Read-only access to dashboard and logs'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allPermissions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {permission.label}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {member ? 'Update' : 'Invite'} Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasSeenIntro, markIntroAsSeen } = useIntro();

  const handleStartUsingTeam = () => {
    markIntroAsSeen('team');
  };

  if (!hasSeenIntro('team')) {
    return (
      <IntroScreen
        title="Team Management"
        description="Invite team members and manage their access to your MailCub workspace"
        icon={<Users className="h-16 w-16 text-blue-600" />}
        features={[
          'Invite unlimited team members',
          'Set granular permissions for each member',
          'Manage roles: Admin, User, and Viewer',
          'Track team member activity and status'
        ]}
        onStart={handleStartUsingTeam}
        primaryColor="blue"
      />
    );
  }

  const handleInviteMember = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  const handleSaveMember = (memberData: Partial<TeamMember>) => {
    if (selectedMember) {
      // Update existing member
      setTeamMembers(teamMembers.map(member =>
        member.id === selectedMember.id ? { ...member, ...memberData } : member
      ));
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0],
        ...memberData as TeamMember
      };
      setTeamMembers([...teamMembers, newMember]);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'user': return <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'viewer': return <UserCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
      default: return <UserCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'user': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'viewer': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'inactive': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const activeMembers = teamMembers.filter(m => m.status === 'active').length;
  const adminMembers = teamMembers.filter(m => m.role === 'admin').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your team members and their permissions</p>
        </div>
        <button
          onClick={handleInviteMember}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{teamMembers.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{activeMembers}</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{adminMembers}</h3>
              <p className="text-gray-600 dark:text-gray-400">Administrators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
          <p className="text-gray-600 dark:text-gray-400">{teamMembers.length} members in your team</p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                      member.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {getRoleIcon(member.role)}
                        <span className="ml-1 capitalize">{member.role}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Joined {new Date(member.joinedDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {member.permissions.length} permissions
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleToggleStatus(member.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      member.status === 'active'
                        ? 'text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-green-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                    title={member.status === 'active' ? 'Deactivate member' : 'Activate member'}
                  >
                    {member.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {member.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {permission.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No team members yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Invite your first team member to start collaborating</p>
            <button
              onClick={handleInviteMember}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Invite Member
            </button>
          </div>
        )}
      </div>

      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMember}
      />
    </div>
  );
}