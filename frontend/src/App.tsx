import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { WelcomePage } from './components/welcome/WelcomePage';
import { CustomerManagement } from './pages/CustomerManagement';
import { CustomerTypeList } from './components/customer-type/CustomerTypeList';
import { TagList } from './components/tag/TagList';

function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isWelcomePage = location.pathname === '/';

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ẩn sidebar ở trang Welcome */}
      {!isWelcomePage && (
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      )}

      <main
        className={`
          pt-16 transition-all
          ${!isWelcomePage && open ? 'pl-[270px]' : 'pl-0'}
          ${!isWelcomePage ? 'lg:pl-[270px]' : ''}
        `}
      >
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/customer-types" element={<CustomerTypeList />} />
          <Route path="/tags" element={<TagList />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
