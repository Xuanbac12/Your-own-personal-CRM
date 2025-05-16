import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

interface CustomerToolbarProps {
  onSearch: (value: string) => void;
  onAddCustomer: () => void;
  searchTerm: string;
}

export const CustomerToolbar: React.FC<CustomerToolbarProps> = ({
  onSearch,
  onAddCustomer,
  searchTerm,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      {/* Ô tìm kiếm */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Nút Lọc + Thêm */}
      <div className="flex gap-2 w-full md:w-auto">
        <button
          className="inline-flex items-center px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          type="button"
        >
          <Filter className="h-4 w-4 mr-2" />
          Lọc
        </button>

        <button
          className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          type="button"
          onClick={onAddCustomer}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm khách hàng
        </button>
      </div>
    </div>
  );
};
