import React, { useEffect, useState } from 'react';
import { CustomerList } from '../components/customers/CustomerList';
import { CustomerToolbar } from '../components/customers/CustomerToolbar';
import { CustomerDialog } from '../components/customers/CustomerDialog';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { CustomerDetailView } from '../components/customers/CustomerDetailView';
import {
  fetchCustomers,
  fetchCustomerTypes,
  fetchTags,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} from '../services/customerService';
import { useToast } from '../hooks/useToast';
import { CustomerResponse, CustomerRequest, CustomerType, Tag } from '../types/customer';

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponse | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<CustomerRequest>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: 'Nam',
    dateOfBirth: '',
    customerTypeIds: [],
    tagIds: [],
    note: '',
    avatarUrl: '',
  });

  const loadCustomers = async () => {
    try {
      const res = await fetchCustomers();
      setCustomers(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách khách hàng:', error);
      showToast('Không thể tải danh sách khách hàng', 'error');
    }
  };

  const loadMetaData = async () => {
    try {
      const [typesRes, tagsRes] = await Promise.all([
        fetchCustomerTypes(),
        fetchTags(),
      ]);
      setCustomerTypes(typesRes.data);
      setAvailableTags(tagsRes.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu phụ:', error);
      showToast('Không thể tải dữ liệu danh mục', 'error');
    }
  };

  useEffect(() => {
    loadCustomers();
    loadMetaData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    resetForm();
    setEditingCustomerId(null);
    setDialogOpen(true);
  };

  const handleEditCustomer = (customer: CustomerResponse) => {
   const customerTypeId = customer.customerTypes?.[0]?.id;

    const tagIds = customer.tagNames?.map((tag) => tag.id) || [];

    setFormData({
      fullName: customer.fullName || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      gender: customer.gender as 'Nam' | 'Nữ' | 'Khác',
      dateOfBirth: formatDateForInput(customer.dateOfBirth),
      customerTypeIds: customerTypeId ? [customerTypeId] : [],
      tagIds: tagIds,

        note: customer.note || '',
      avatarUrl: customer.avatarUrl || '',
    });

    setEditingCustomerId(customer.id);
    setDialogOpen(true);
  };

  const handleViewCustomer = async (customerId: string) => {
    try {
      const res = await getCustomerById(customerId);
      setSelectedCustomer(res.data);
      setDetailOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chi tiết:', error);
      showToast('Không thể tải thông tin khách hàng', 'error');
    }
  };

  const handleDeleteCustomer = (customer: CustomerResponse) => {
    setSelectedCustomer(customer);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomer?.id) return;
    try {
      await deleteCustomer(selectedCustomer.id);
      await loadCustomers();
      setConfirmOpen(false);
      showToast('Đã xóa khách hàng thành công', 'success');
    } catch (error) {
      console.error('Lỗi khi xóa khách hàng:', error);
      showToast('Không thể xóa khách hàng', 'error');
    }
  };
const handleFormChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  const { name, value, multiple, selectedOptions } = e.target as HTMLSelectElement;

  // ✅ Nếu là chọn nhiều (tags)
  if (name === "tagIds" && multiple && selectedOptions) {
    const values = Array.from(selectedOptions).map((option) => Number(option.value));
    setFormData((prev) => ({
      ...prev,
      tagIds: values, // ✅ đảm bảo là number[]
    }));
    return;
  }

  // ✅ Nếu là chọn 1 loại khách hàng
  if (name === "customerTypeIds") {
    setFormData((prev) => ({
      ...prev,
      customerTypeIds: [Number(value)], // ✅ đảm bảo là number[]
    }));
    return;
  }

  // ✅ Còn lại giữ nguyên
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      gender: 'Nam',
      dateOfBirth: '',
      customerTypeIds: [],
      tagIds: [],
      note: '',
      avatarUrl: '',
    });
  };

  function formatDateForBackend(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  function formatDateForInput(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (values: CustomerRequest) => {
    console.log('🔥 formData tại thời điểm submit:', formData);
    const payload: CustomerRequest = {
      ...values,
      dateOfBirth: formatDateForBackend(values.dateOfBirth),
    };
      console.log('📦 Payload gửi lên:', payload);

    try {
      if (editingCustomerId) {
        await updateCustomer(editingCustomerId, payload);
        showToast('Đã cập nhật khách hàng thành công', 'success');
      } else {
        await createCustomer(payload);
        showToast('Đã thêm khách hàng thành công', 'success');
      }
      await loadCustomers();
      setDialogOpen(false);
      setEditingCustomerId(null);
    } catch (error) {
      console.error('Lỗi khi lưu khách hàng:', error);
      showToast('Không thể lưu thông tin khách hàng', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý khách hàng</h1>

      <CustomerToolbar
        onSearch={handleSearch}
        onAddCustomer={handleAddCustomer}
        searchTerm={searchTerm}
      />

      <CustomerList
        customers={filteredCustomers}
        onView={handleViewCustomer}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />

      <CustomerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialValues={formData}
       // onChange={handleFormChange}
        onSubmit={handleSubmit}
        onReset={resetForm}
        customerTypes={customerTypes}
        availableTags={availableTags}
        isEditing={!!editingCustomerId}
      />

      <CustomerDetailView
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        customer={selectedCustomer}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa khách hàng này không?"
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </div>
  );
};

