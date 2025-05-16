import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


// Request DTO
export interface TagRequest {
  name: string;
  color: string;
}

// Response DTO
export interface TagResponse {
  id: number;
  name: string;
  color: string;
}

// Lấy danh sách tất cả tags
export const fetchTags = async (): Promise<TagResponse[]> => {
  const response = await axios.get(`${API_BASE_URL}/tag`);
  return response.data;
};

// Tạo tag mới
export const createTag = async (data: TagRequest): Promise<TagResponse> => {
  const response = await axios.post(`${API_BASE_URL}/tag`, data);
  return response.data;
};

// Sửa tag
export const updateTag = async (id: number, data: TagRequest): Promise<TagResponse> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data);
  return response.data;
};

// Xoá tag
export const deleteTag = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

// Lấy chi tiết 1 customer type theo ID
export const getTagById = async (id: number): Promise<TagResponse> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

