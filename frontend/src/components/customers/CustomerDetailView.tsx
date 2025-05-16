import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, User } from 'lucide-react';
import { CustomerStatusBadge } from './CustomerStatusBadge';

interface CustomerDetailViewProps {
  open: boolean;
  onClose: () => void;
  customer: any; // NOTE: có thể thay bằng CustomerResponse để an toàn hơn
}

export const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({
  open,
  onClose,
  customer,
}) => {
  if (!open || !customer) return null;

  function normalizeGender(gender: string = ''): string {
  const g = gender
    .normalize('NFD') // tách các ký tự dấu
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .toLowerCase(); // chuyển về thường

  if (['female', 'nu'].includes(g)) return 'Nữ';
  if (['male', 'nam'].includes(g)) return 'Nam';
  return 'Khác';
}
function formatDateToView(dateString: string): string {
  // ví dụ: "06-04-2003" => "06-04-2003"
  const [day, month, year] = dateString.split('-');
  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}



  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Thông tin khách hàng</h2>
          <button
          type ="button"
            onClick={onClose}
            title='Đóng'
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nội dung */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row">
            {/* Avatar */}
            <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mx-auto sm:mx-0 mb-4 sm:mb-0">
              {customer.avatarUrl ? (
                <img 
                  src={customer.avatarUrl} 
                  alt={customer.fullName}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-4xl text-indigo-500 font-medium">
                  {customer.fullName?.charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>
            
            {/* Thông tin */}
            <div className="sm:ml-6 flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{customer.fullName}</h3>

              {/* Loại khách hàng */}
              <div className="mt-2">
                {customer.customerTypes?.map((type: { name: string; color: string }, index: number) => (
  <CustomerStatusBadge
    key={index}
    label={type.name}
    color={type.color}
  />
))}

              </div>

              {/* Thông tin liên hệ */}
              <div className="mt-4 space-y-2 text-gray-600">
                {customer.email && (
                  <div className="flex items-center justify-center sm:justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{customer.email}</span>
                  </div>
                )}

                {customer.phone && (
                  <div className="flex items-center justify-center sm:justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{customer.phone}</span>
                  </div>
                )}

                {customer.address && (
                  <div className="flex items-center justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{customer.address}</span>
                  </div>
                )}

                {customer.gender && (
                  <div className="flex items-center justify-center sm:justify-start">
                    <User className="h-4 w-4 mr-2" />
                   <span>{normalizeGender(customer.gender)}</span>

                  </div>
                )}

                {customer.dateOfBirth && (
                  <div className="flex items-center justify-center sm:justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDateToView(customer.dateOfBirth)}</span>


                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Nhãn */}
          <div className="mt-8 border-t pt-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Nhãn</h4>
              <div className="mt-2">
                {customer.tagNames?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {customer.tagNames.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Không có nhãn</p>
                )}
              </div>
            </div>

            {/* Ghi chú */}
            {customer.note && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Ghi chú</h4>
                <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                  {customer.note}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
