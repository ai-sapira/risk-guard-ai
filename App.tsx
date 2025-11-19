
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import InsuranceDashboard from './pages/insurance/InsuranceDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import Campaigns from './pages/company/Campaigns';
import Employees from './pages/company/Employees';
import Training from './pages/company/Training';
import Reports from './pages/company/Reports';
import Settings from './pages/company/Settings';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
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
                <Route path="/clients" element={<div className="p-4">Client Management Placeholder</div>} />
                <Route path="/reports" element={<div className="p-4">Reports Placeholder</div>} />
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
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          } 
        />

        {/* Employee Routes */}
        <Route 
          path="/employee/*" 
          element={
            <Layout role={Role.EMPLOYEE}>
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                <Route path="/training" element={<div className="p-4">My Training Placeholder</div>} />
              </Routes>
            </Layout>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;