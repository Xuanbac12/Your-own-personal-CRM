import React, { useState } from 'react';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { CustomerTags } from './CustomerTags';
import { Trash, Eye, Edit, MoreHorizontal } from 'lucide-react';
// NOTE: Không thay đổi logic, chỉ import đúng icon đang dùng

interface CustomerListProps {
  customers: any[]; // NOTE: Bạn có thể thay `any[]` bằng `Customer[]` để rõ ràng hơn
  onView: (id: string) => void;
  onEdit: (customer: any) => void;
  onDelete: (customer: any) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center mt-6">
        <p className="text-gray-500">
          Không tìm thấy khách hàng. Vui lòng thêm khách hàng mới hoặc điều chỉnh tìm kiếm.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Ảnh</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Họ tên</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">SĐT</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Nhãn</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Avatar */}
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                    {customer.avatarUrl ? (
                      <img 
                        src={customer.avatarUrl} 
                        alt={customer.fullName}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-indigo-500 font-medium">
                        {customer.fullName?.charAt(0).toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                </td>

                {/* Họ tên + Loại */}
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900">{customer.fullName}</div>
                  <CustomerStatusBadge
  label={customer.customerTypes?.[0]?.name}
  color={customer.customerTypes?.[0]?.color}
/>

                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-500">{customer.email}</td>

                {/* Số điện thoại */}
                <td className="px-4 py-3 text-gray-500">{customer.phone}</td>

                {/* Tags */}
                <td className="px-4 py-3">
                <CustomerTags tags={customer.tagNames || []} />

                </td>

                {/* Tác vụ */}
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleMenu(customer.id)}
                      className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label="Menu"
                    >
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                    
                    {menuOpen === customer.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <button
                          onClick={() => {
                            onView(customer.id);
                            toggleMenu(customer.id);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => {
                            onEdit(customer);
                            toggleMenu(customer.id);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={() => {
                            onDelete(customer);
                            toggleMenu(customer.id);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
