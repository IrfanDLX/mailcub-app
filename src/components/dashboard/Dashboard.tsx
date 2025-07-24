import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Mail, Globe, Users, Key, Database, CheckCircle } from 'lucide-react';
import { dashboardStats } from '../../data/dummyData';

const StatCard = ({ title, value, total, icon: Icon, trend, color = 'blue' }: any) => {
  const percentage = total ? Math.round((value / total) * 100) : 0;
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-end space-x-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {total && <span className="text-gray-500 text-sm mb-1">/ {total}</span>}
      </div>
      {total && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Usage</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-${color}-500`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { domains, emails, webmails, accountStatus, totalApiKeys, totalStorage, emailStats } = dashboardStats;

  const pieData = [
    { name: 'Delivered', value: emailStats.totalDelivered, color: '#10B981' },
    { name: 'Bounced', value: emailStats.totalBounced, color: '#EF4444' },
    { name: 'Deferred', value: emailStats.totalDeferred, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          accountStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <CheckCircle className="h-4 w-4 mr-1" />
          Account {accountStatus}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Domains"
          value={domains.used}
          total={domains.allowed}
          icon={Globe}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Email Accounts"
          value={emails.used}
          total={emails.allowed}
          icon={Mail}
          trend={8}
          color="green"
        />
        <StatCard
          title="Webmail Accounts"
          value={webmails.used}
          total={webmails.allowed}
          icon={Users}
          trend={-3}
          color="orange"
        />
        <StatCard
          title="API Keys"
          value={totalApiKeys}
          icon={Key}
          trend={5}
          color="purple"
        />
      </div>

      {/* Storage Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg border bg-indigo-50 text-indigo-600 border-indigo-200">
              <Database className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
              <p className="text-gray-600">{totalStorage.used} GB / {totalStorage.limit} GB</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((totalStorage.used / totalStorage.limit) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Used</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-indigo-500"
            style={{ width: `${(totalStorage.used / totalStorage.limit) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Sent</span>
              <span className="font-semibold text-gray-900">{emailStats.totalSent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivered</span>
              <span className="font-semibold text-green-600">{emailStats.totalDelivered.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bounced</span>
              <span className="font-semibold text-red-600">{emailStats.totalBounced.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Deferred</span>
              <span className="font-semibold text-yellow-600">{emailStats.totalDeferred.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Rate Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Rate</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Success Rate */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {Math.round((emailStats.totalDelivered / emailStats.totalSent) * 100)}%
            </div>
            <p className="text-gray-600 mb-4">Delivery Success Rate</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full bg-green-500"
                style={{ width: `${(emailStats.totalDelivered / emailStats.totalSent) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Trends Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Trends (Last 7 Days)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={emailStats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Line type="monotone" dataKey="sent" stroke="#3B82F6" strokeWidth={2} name="sent" />
              <Line type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} name="delivered" />
              <Line type="monotone" dataKey="bounced" stroke="#EF4444" strokeWidth={2} name="bounced" />
              <Line type="monotone" dataKey="deferred" stroke="#F59E0B" strokeWidth={2} name="deferred" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}