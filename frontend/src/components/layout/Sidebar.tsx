import React from 'react';
import { LayoutDashboard, Users, Tags, ChevronLeft, Menu } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Trang chủ', path: '/' },
    { icon: Users, label: 'Khách hàng', path: '/customers' },
    { icon: Tags, label: 'Loại khách', path: '/customer-types' },
    { icon: Tags, label: 'Thẻ', path: '/tags' },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30 flex items-center px-4 lg:pl-[280px] transition-all duration-300">
        <button
          onClick={handleDrawerToggle}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          title="Toggle Menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center ml-4">
          <span className="text-xl font-semibold text-gray-800">Xuân Bắc CRM</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-[270px] bg-white border-r z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-40
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-semibold text-gray-800">Menu</span>
          <button
            onClick={handleDrawerToggle}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            title="Close Menu"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <item.icon className="h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
                <span className="ml-3 font-medium group-hover:text-indigo-600">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">XB</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Xuân Bắc</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};