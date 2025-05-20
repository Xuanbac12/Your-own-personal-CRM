// 📥 Dữ liệu từ backend trả về
export interface CustomerResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string;
  note: string;
  gender: 'Nam' | 'Nữ' | 'Khác'; // ✅ hiển thị tiếng Việt
  dateOfBirth: string; // ✅ dạng dd-MM-yyyy
  customerTypes: {
  id: number;
  name: string;
  color: string;
}[];
 // ví dụ: ['VIP', 'Thường xuyên']
  tagNames: {
    id : number;
    name: string;
    color: string;
  }[]; // ví dụ: ['Bạn bè', 'Thân thiết']
            // ví dụ: ['Bạn bè', 'Thân thiết']
}

// 📤 Dữ liệu gửi lên backend (POST / PUT)
export interface CustomerRequest {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string;
  note: string;
  gender: 'Nam' | 'Nữ' | 'Khác'; // ✅ gửi text tiếng Việt khớp enum Gender
  dateOfBirth: string;          // ✅ format dd-MM-yyyy
  customerTypeIds: number[];    // ID của các loại
  tagIds: number[];             // ID của các tag
}

// 📋 Dữ liệu dropdown loại khách hàng
export interface CustomerType {
  id: string;
  name: string;
}

// 🏷️ Dữ liệu dropdown nhãn
export interface Tag {
  id: string;
  name: string;
}
