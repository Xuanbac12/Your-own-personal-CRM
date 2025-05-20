import React from 'react';
import { X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomerRequest, CustomerType, Tag } from '../../types/customer';

interface CustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CustomerRequest) => void;
  onReset: () => void;
  customerTypes: CustomerType[];
  availableTags: Tag[];
  isEditing: boolean;
  initialValues: CustomerRequest;
}

// Hàm này dùng để chuẩn hóa số điện thoại Việt Nam
// từ định dạng +84 hoặc 84 thành 0xxxxxxx
function normalizeVietnamPhone(value: string): string {
  if (value.startsWith('+84')) return '0' + value.slice(3);
  if (value.startsWith('84')) return '0' + value.slice(2);
  return value;
}


const validationSchema = Yup.object({
  fullName: Yup.string()
  .required('Họ tên là bắt buộc')
  .min(3, 'Họ tên phải từ 3 ký tự trở lên')
  .max(50, 'Họ tên không được quá 50 ký tự')
  .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Họ tên chỉ chứa chữ cái và khoảng trắng'),

  email: Yup.string()
   .email('Email không hợp lệ').required('Email là bắt buộc'),
  phone: Yup.string()
  .required('Số điện thoại là bắt buộc')
  .test(
    'normalize',
    'Số điện thoại không hợp lệ (định dạng +84 hoặc 0)',
    (value) => {
      if (!value) return false;
      const normalized = normalizeVietnamPhone(value);
      return /^\d{10}$/.test(normalized);
    }
  )
  .test(
    'no-repeating',
    'Số điện thoại không được là 10 số giống nhau',
    (value) => {
      const normalized = normalizeVietnamPhone(value || '');
      return !/^(\d)\1{9}$/.test(normalized);
    }
  )
  .test(
    'valid-prefix',
    'Số điện thoại không bắt đầu bằng đầu số hợp lệ tại Việt Nam',
    (value) => {
      const normalized = normalizeVietnamPhone(value || '');
      const prefix = normalized.substring(0, 3);
      const validPrefixes = [
        '032','033','034','035','036','037','038','039',
        '070','076','077','078','079',
        '081','082','083','084','085','086','088','089',
        '056','058','059'
      ];
      return validPrefixes.includes(prefix);
    }
  ),

  gender: Yup.string().required('Vui lòng chọn giới tính'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Ngày sinh không được trong tương lai')
    .nullable(),
  customerTypeIds: Yup.array().min(1, 'Vui lòng chọn loại khách hàng'),
  note: Yup.string().max(500, 'Ghi chú không được quá 500 ký tự'),
});

export const CustomerDialog: React.FC<CustomerDialogProps> = ({
  open,
  onClose,
  onSubmit,
  onReset,
  customerTypes,
  availableTags,
  isEditing,
  initialValues,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Cập nhật khách hàng' : 'Thêm khách hàng mới'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Đóng"
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange
          validateOnBlur
        >
          {({ values, handleChange, handleReset }) => (
            <Form className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cột trái */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName">Họ tên *</label>
                    <Field
                      name="fullName"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="email">Email *</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="phone">Số điện thoại *</label>
                    <Field
                      name="phone"
                      type="tel"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="gender">Giới tính *</label>
                    <Field
                      as="select"
                      name="gender"
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">-- Chọn giới tính --</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/* Cột phải */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="dateOfBirth">Ngày sinh</label>
                    <Field
                      name="dateOfBirth"
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="address">Địa chỉ</label>
                    <Field
                      name="address"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerTypeIds">Loại khách hàng *</label>
                    <Field
                      as="select"
                      name="customerTypeIds[0]"
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">-- Chọn loại khách hàng --</option>
                      {customerTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="customerTypeIds" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="tagIds">Nhãn</label>
                    <Field
                      as="select"
                      name="tagIds"
                      multiple
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      {availableTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </Field>
                    <p className="text-xs text-gray-500 mt-1">
                      Nhấn Ctrl (hoặc Command trên Mac) để chọn nhiều nhãn
                    </p>
                  </div>
                </div>
              </div>

              {/* Ghi chú */}
              <div className="mt-4">
                <label htmlFor="note">Ghi chú</label>
                <Field
                  as="textarea"
                  name="note"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Nút */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onReset();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Làm mới
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {isEditing ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
