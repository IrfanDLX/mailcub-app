import React, { useState } from 'react';
import { CreditCard, Calendar, Users, Mail, Database, Zap, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    emails: number;
    domains: number;
    storage: number;
    teamMembers: number;
  };
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'month',
    features: [
      'Up to 10,000 emails/month',
      '3 custom domains',
      '5GB storage',
      '3 team members',
      'Basic analytics',
      'Email support'
    ],
    limits: {
      emails: 10000,
      domains: 3,
      storage: 5,
      teamMembers: 3
    }
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 79,
    interval: 'month',
    features: [
      'Up to 50,000 emails/month',
      '10 custom domains',
      '25GB storage',
      '10 team members',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom templates'
    ],
    limits: {
      emails: 50000,
      domains: 10,
      storage: 25,
      teamMembers: 10
    },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    interval: 'month',
    features: [
      'Unlimited emails',
      'Unlimited domains',
      '100GB storage',
      'Unlimited team members',
      'Custom analytics',
      '24/7 phone support',
      'Advanced API access',
      'Custom integrations',
      'Dedicated account manager'
    ],
    limits: {
      emails: -1, // unlimited
      domains: -1,
      storage: 100,
      teamMembers: -1
    }
  }
];

export default function Subscription() {
  const [currentPlan] = useState<Plan>(plans[0]); // Assuming user is on starter plan
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleUpgrade = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const canUpgrade = (plan: Plan) => {
    return plan.price > currentPlan.price;
  };

  const formatNumber = (num: number) => {
    if (num === -1) return 'Unlimited';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your subscription and billing</p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h2>
          <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            Active
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{currentPlan.name} Plan</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${currentPlan.price}/{currentPlan.interval}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Next billing date</span>
                <span className="font-medium text-gray-900 dark:text-white">February 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                <span className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Usage This Month</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Emails Sent</span>
                  <span className="text-gray-900 dark:text-white">7,420 / {formatNumber(currentPlan.limits.emails)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Domains</span>
                  <span className="text-gray-900 dark:text-white">2 / {formatNumber(currentPlan.limits.domains)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Storage</span>
                  <span className="text-gray-900 dark:text-white">2.3GB / {formatNumber(currentPlan.limits.storage)}GB</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border rounded-xl p-6 ${
                plan.popular
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              } ${
                plan.id === currentPlan.id
                  ? 'ring-2 ring-green-500'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/{plan.interval}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Emails/month</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatNumber(plan.limits.emails)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Domains</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatNumber(plan.limits.domains)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Storage</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatNumber(plan.limits.storage)}GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Team members</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatNumber(plan.limits.teamMembers)}</span>
                </div>
              </div>

              {plan.id === currentPlan.id ? (
                <button
                  disabled
                  className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : canUpgrade(plan) ? (
                <button
                  onClick={() => handleUpgrade(plan)}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  Upgrade to {plan.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed flex items-center justify-center"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Downgrade Not Available
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Billing History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-right py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 text-sm text-gray-900 dark:text-white">Jan 15, 2024</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">Starter Plan - Monthly</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">$29.00</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="text-green-600 dark:text-green-400 hover:text-green-500 text-sm">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900 dark:text-white">Dec 15, 2023</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">Starter Plan - Monthly</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">$29.00</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="text-green-600 dark:text-green-400 hover:text-green-500 text-sm">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upgrade to {selectedPlan.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You're about to upgrade from {currentPlan.name} to {selectedPlan.name}. 
              Your new plan will be active immediately.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">New monthly cost:</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${selectedPlan.price}/month
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600 dark:text-gray-400">Prorated amount today:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${Math.round((selectedPlan.price - currentPlan.price) * 0.7)}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle upgrade logic here
                  setShowUpgradeModal(false);
                }}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}