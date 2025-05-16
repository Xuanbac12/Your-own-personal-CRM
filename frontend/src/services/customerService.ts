import axios from 'axios';
import { CustomerRequest } from '../types/customer';

const API_BASE_URL = 'http://localhost:8080/xuanbac';

export const fetchCustomers = () =>
  axios.get(`${API_BASE_URL}/customer`);

export const getCustomerById = (id: string) =>
  axios.get(`${API_BASE_URL}/customer/${id}`);

export const createCustomer = (data: CustomerRequest) =>
  axios.post(`${API_BASE_URL}/customer`, data);

export const updateCustomer = (id: string, data: CustomerRequest) =>
  axios.put(`${API_BASE_URL}/customer/${id}`, data);

export const deleteCustomer = (id: string) =>
  axios.delete(`${API_BASE_URL}/customer/${id}`);

export const fetchCustomerTypes = () =>
  axios.get(`${API_BASE_URL}/customerType`);

export const fetchTags = () =>
  axios.get(`${API_BASE_URL}/tag`);
