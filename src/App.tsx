import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import OnboardingFlow from './components/onboarding/OnboardingFlow';

// Layout Components
import Layout from './components/layout/Layout';

// Dashboard Components
import Dashboard from './components/dashboard/Dashboard';
import TeamManagement from './components/team/TeamManagement';
import ApiKeyManagement from './components/api-keys/ApiKeyManagement';
import DomainManagement from './components/domains/DomainManagement';
import EmailAccountManagement from './components/email-accounts/EmailAccountManagement';
import SendTestEmail from './components/send-test-email/SendTestEmail';
import EmailLogs from './components/email-logs/EmailLogs';
import SupportTickets from './components/support-tickets/SupportTickets';

type AuthView = 'login' | 'signup' | 'forgot-password';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = () => {
    // Check if user is new (in real app, this would come from API)
    const isNewUser = localStorage.getItem('mailcub_onboarding_completed') !== 'true';
    
    if (isNewUser) {
      setShowOnboarding(true);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleSignup = () => {
    // New users always see onboarding
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('mailcub_onboarding_completed', 'true');
    setShowOnboarding(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection('dashboard');
  };

  const renderAuthView = () => {
    switch (authView) {
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView('signup')}
            onSwitchToForgotPassword={() => setAuthView('forgot-password')}
          />
        );
      case 'signup':
        return (
          <Signup
            onSwitchToLogin={() => setAuthView('login')}
            onSignup={handleSignup}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPassword
            onSwitchToLogin={() => setAuthView('login')}
          />
        );
      default:
        return null;
    }
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'team':
        return <TeamManagement />;
      case 'api-keys':
        return <ApiKeyManagement />;
      case 'domains':
        return <DomainManagement />;
      case 'email-accounts':
        return <EmailAccountManagement />;
      case 'send-test-email':
        return <SendTestEmail />;
      case 'email-logs':
        return <EmailLogs />;
      case 'support-tickets':
        return <SupportTickets />;
      default:
        return <Dashboard />;
    }
  };

  if (showOnboarding) {
    return (
      <Router>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </Router>
    );
  }

  if (!isAuthenticated) {
    return (
      <Router>
        {renderAuthView()}
      </Router>
    );
  }

  return (
    <Router>
      <Layout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        {renderDashboardContent()}
      </Layout>
    </Router>
  );
}

export default App;