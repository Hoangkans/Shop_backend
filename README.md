# Shop Backend API

Ứng dụng backend cho hệ thống cửa hàng trực tuyến được xây dựng bằng NestJS, MongoDB và JWT authentication.

## 🚀 Tính năng

- **Xác thực người dùng**: Đăng ký, đăng nhập với JWT
- **Quản lý người dùng**: CRUD operations, phân quyền
- **Quản lý sản phẩm**: Thêm, sửa, xóa sản phẩm
- **Quản lý danh mục**: Phân loại sản phẩm
- **Giỏ hàng**: Thêm, sửa, xóa sản phẩm trong giỏ
- **Đơn hàng**: Tạo và quản lý đơn hàng
- **Validation**: Kiểm tra dữ liệu đầu vào
- **CORS**: Hỗ trợ cross-origin requests

## 🛠️ Công nghệ sử dụng

- **Framework**: NestJS
- **Database**: MongoDB với Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **Password Hashing**: bcrypt
- **Language**: TypeScript

## 📋 Yêu cầu hệ thống

- Node.js >= 16.x
- npm >= 8.x
- MongoDB >= 4.x

## ⚡ Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd shop_backend
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục gốc:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shop_backend
JWT_SECRET=your-secret-key-here
PORT=3000
```

### 4. Chạy ứng dụng

#### Development mode

```bash
npm run start:dev
```

#### Production mode

```bash
npm run build
npm run start:prod
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📚 API Documentation

### Authentication

#### Đăng ký

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Đăng nhập

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

### Users

#### Lấy danh sách người dùng

```http
GET /users
```

#### Tạo người dùng mới

```http
POST /users
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "Password123",
  "phone": "0123456789",
  "status": "active"
}
```

#### Cập nhật trạng thái người dùng

```http
PUT /users/:id/status
Content-Type: application/json

{
  "status": "inactive"
}
```

### Categories

#### Lấy danh sách danh mục

```http
GET /categories
```

#### Tạo danh mục mới

```http
POST /categories
Content-Type: application/json

{
  "name": "Điện thoại",
  "status": "active"
}
```

#### Cập nhật danh mục

```http
PUT /categories/:id
Content-Type: application/json

{
  "name": "Laptop",
  "status": "active"
}
```

### Products

#### Lấy danh sách sản phẩm

```http
GET /products
```

#### Tạo sản phẩm mới

```http
POST /products
Content-Type: application/json

{
  "name": "iPhone 15",
  "price": 25000000,
  "stock": 100,
  "categoryId": "category_id_here",
  "status": "active"
}
```

#### Cập nhật sản phẩm

```http
PUT /products/:id
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 30000000,
  "stock": 50
}
```

### Shopping Cart

#### Lấy giỏ hàng của người dùng

```http
GET /shopping-cart/:userId
```

#### Thêm sản phẩm vào giỏ

```http
POST /shopping-cart
Content-Type: application/json

{
  "userId": "user_id_here",
  "productId": "product_id_here",
  "quantity": 2
}
```

#### Cập nhật số lượng

```http
PUT /shopping-cart/:id/quantity
Content-Type: application/json

{
  "quantity": 3
}
```

#### Xóa sản phẩm khỏi giỏ

```http
DELETE /shopping-cart/:id
```

#### Xóa toàn bộ giỏ hàng

```http
DELETE /shopping-cart/:userId/clear
```

### Orders

#### Lấy danh sách đơn hàng

```http
GET /orders
```

#### Lấy đơn hàng theo người dùng

```http
GET /orders/user/:userId
```

#### Tạo đơn hàng mới

```http
POST /orders
Content-Type: application/json

{
  "orderDate": "2024-01-01T00:00:00.000Z",
  "userId": "user_id_here",
  "status": "pending"
}
```

#### Cập nhật trạng thái đơn hàng

```http
PUT /orders/:id/status
Content-Type: application/json

{
  "status": "completed"
}
```

## 🗂️ Cấu trúc thư mục

```
src/
├── auth/                 # Module xác thực
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts
├── user/                 # Module người dùng
├── product/              # Module sản phẩm
├── category/             # Module danh mục
├── orders/               # Module đơn hàng
├── order_detail/         # Module chi tiết đơn hàng
├── shopping_cart/        # Module giỏ hàng
├── shared/               # Shared resources
│   └── database/
│       └── mongo/
│           ├── schemas/  # MongoDB schemas
│           └── dto/      # Data Transfer Objects
├── app.module.ts         # Root module
└── main.ts              # Entry point
```

## 🔒 Validation Rules

### User Registration

- Email: Phải là email hợp lệ, tối đa 100 ký tự
- Password: 6-32 ký tự, có ít nhất 1 chữ thường, 1 chữ hoa, 1 số
- Phone: Định dạng số điện thoại Việt Nam
- Status: Chỉ được là 'active' hoặc 'inactive'

### Product

- Name: Bắt buộc, là chuỗi
- Price: Số >= 0
- Stock: Số nguyên >= 0
- CategoryId: MongoDB ObjectId hợp lệ

## 🚦 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (Email already exists)
- `500` - Internal Server Error

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Scripts

```bash
npm run build          # Build production
npm run start          # Start production
npm run start:dev      # Start development
npm run start:debug    # Start debug mode
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 👥 Authors

- Your Name - Initial work

## 🐛 Known Issues

- Cần thêm middleware để log requests
- Cần implement refresh token
- Cần thêm rate limiting
- Cần thêm file upload cho hình ảnh sản phẩm

## 🔮 Future Enhancements

- [ ] Thêm tính năng tìm kiếm sản phẩm
- [ ] Implement caching với Redis
- [ ] Thêm notification system
- [ ] Thêm payment integration
- [ ] Thêm email service
- [ ] API documentation với Swagger
- [ ] Docker containerization
- [ ] Unit tests coverage
