
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import InsuranceDashboard from './pages/insurance/InsuranceDashboard';
import Clients from './pages/insurance/Clients';
import Onboarding from './pages/insurance/Onboarding';
import Automations from './pages/insurance/Automations';
import Reports from './pages/insurance/Reports';
import CompanyDashboard from './pages/company/CompanyDashboard';
import Campaigns from './pages/company/Campaigns';
import Employees from './pages/company/Employees';
import Training from './pages/company/Training';
import CompanyReports from './pages/company/Reports';
import Settings from './pages/company/Settings';
import OnboardingFlow from './pages/company/OnboardingFlow';
import CompanyInviteLanding from './pages/company/CompanyInviteLanding';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeOnboarding from './pages/employee/EmployeeOnboarding';
import SimulationResult from './pages/employee/SimulationResult';
import EmployeeTraining from './pages/employee/Training'; // Import the new component
import { Role } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Insurance Routes */}
        <Route 
          path="/insurance/*" 
          element={
            <Layout role={Role.INSURANCE_ADMIN}>
              <Routes>
                <Route path="/" element={<InsuranceDashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/automations" element={<Automations />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<div className="p-4">Settings Placeholder</div>} />
              </Routes>
            </Layout>
          } 
        />

        {/* Company Routes */}
        <Route 
          path="/company/*" 
          element={
            <Layout role={Role.COMPANY_ADMIN}>
              <Routes>
                <Route path="/" element={<CompanyDashboard />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/training" element={<Training />} />
                <Route path="/reports" element={<CompanyReports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          } 
        />

        {/* Company Invite & Onboarding (No Sidebar) */}
        <Route path="/company/invite/:token" element={<CompanyInviteLanding />} />
        <Route path="/company/setup" element={<OnboardingFlow />} />

        {/* Employee Routes */}
        <Route path="/employee/onboarding" element={<EmployeeOnboarding />} />
        {/* New Route for JIT Training */}
        <Route path="/employee/simulation-result/:id" element={<SimulationResult />} />
        
        <Route 
          path="/employee/*" 
          element={
            <Layout role={Role.EMPLOYEE}>
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                <Route path="/training" element={<EmployeeTraining />} /> {/* Use real component */}
              </Routes>
            </Layout>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
