# 🚀 CRM Management System

## 📋 Mô tả
Hệ thống **CRM (Customer Relationship Management)** giúp quản lý khách hàng, loại khách hàng, thẻ (tags), với:
- **Backend**: Spring Boot REST API.
- **Frontend**: ReactJS, sử dụng Vite, Tailwind CSS/MUI, Axios.

---

## 📂 Cấu trúc dự án
```
crm-project/
├── backend/
│   ├── src/main/java/com/example/backend
│   │   ├── controller/
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   └── response/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── config/
│   │   └── common/
│   ├── resources/application.yaml
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── layout/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   ├── types/
    │   └── App.tsx, index.tsx
    ├── public/
    └── package.json
```

---

## ⚙️ Cấu hình Backend

- **Java**: 21
- **Spring Boot**: 3.4.5
- **Database**: MySQL (hoặc H2 dev)
- **Port chạy**: `8080/xuanbac`
- **application.yaml**:
```yaml
server:
  port: 8080
  servlet:
    context-path: /xuanbac

spring:
  datasource:
    url: ${DBMS_CONNECTION:jdbc:mysql://mysql:3306/crm_service}
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```
- **Chạy backend**:
```bash
cd backend
./mvnw spring-boot:run
```

---

## ⚙️ Cấu hình Frontend

- **NodeJS**: >=16
- **ReactJS**: 19.x
- **Vite** + **Tailwind/MUI**
- **package.json**:
```json
"dependencies": {
  "axios": "^1.9.0",
  "formik": "^2.4.6",
  "lucide-react": "^0.510.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.0",
  "react-scripts": "5.0.1",
  "typescript": "^4.9.5",
  "web-vitals": "^2.1.4",
  "yup": "^1.6.1"
}
```
- **Chạy frontend**:
```bash
cd frontend
npm install
npm run dev
```
- **Mặc định chạy trên**: `http://localhost:3000`

---

## 🌐 API Endpoints (Ví dụ)

| Method | Endpoint                      | Chức năng                  |
|--------|-------------------------------|----------------------------|
| GET    | `/api/customers`             | Lấy danh sách khách hàng   |
| POST   | `/api/customers`             | Thêm khách hàng mới        |
| PUT    | `/api/customers/{id}`        | Cập nhật khách hàng        |
| DELETE | `/api/customers/{id}`        | Xóa khách hàng             |
| GET    | `/api/customertypes`         | Danh sách loại khách hàng  |
| GET    | `/api/tags`                  | Danh sách tags             |

---

## 🏗️ Chức năng chính
✅ CRUD Khách hàng  
✅ Quản lý loại khách hàng  
✅ Quản lý tags  
✅ Tìm kiếm, phân loại, xem chi tiết  
✅ Giao diện UI đẹp (React + Tailwind/MUI)

---

## 🐳 Docker (Tuỳ chọn)
- Cấu hình MySQL container
- Cấu hình backend Spring Boot
- Kết nối frontend với backend thông qua `http://localhost:8080/xuanbac`

---

## 🧑‍💻 Đóng góp
1. Fork repo này
2. Tạo branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add new feature"`
4. Push: `git push origin feature/my-feature`
5. Tạo Pull Request

---

## 📜 Giấy phép
Dự án phát triển cho mục đích học tập và demo.
