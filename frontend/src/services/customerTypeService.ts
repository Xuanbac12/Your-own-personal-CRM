// src/services/customerTypeService.ts
import axios from 'axios';

// Đường dẫn base URL backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


// Request DTO
export interface CustomerTypeRequest {
  name: string;
  color: string;
  description: string;
}

// Response DTO
export interface CustomerTypeResponse {
  id: string;
  name: string;
  color: string;
  description: string;
}

// Lấy danh sách tất cả customer type
export const fetchCustomerTypes = async (): Promise<CustomerTypeResponse[]> => {
  const response = await axios.get(`${API_BASE_URL}/customerType`);
  return response.data;
};

// Lấy chi tiết 1 customer type theo ID
export const getCustomerTypeById = async (id: string): Promise<CustomerTypeResponse> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Tạo mới customer type
export const createCustomerType = async (data: CustomerTypeRequest): Promise<CustomerTypeResponse> => {
  const response = await axios.post(`${API_BASE_URL}/customerType`, data);
  return response.data;
};

// Cập nhật customer type
export const updateCustomerType = async (id: string, data: CustomerTypeRequest): Promise<CustomerTypeResponse> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data);
  return response.data;
};

// Xoá customer type
export const deleteCustomerType = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
