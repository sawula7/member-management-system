# Member Management System

A full-stack member management system built with Vite.js (React) frontend and Express.js backend. This application features a modern login system with JWT authentication and a comprehensive dashboard for managing forum members.

## 🚀 Features

- **Authentication System**: Secure login with JWT tokens
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Member Management**: View and manage forum members
- **Modern UI**: Clean, responsive design with professional color palette
- **Real-time Stats**: Dashboard displaying member statistics
- **Role-based System**: Three user roles with different permissions (admin, manager, user)
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Database Seeding**: Quick setup with sample data

## 🛠️ Tech Stack

### Frontend
- **Vite.js** - Fast build tool and development server
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling with modern features

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd member-management-system
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

The backend uses environment variables. Create a `.env` file in the `backend` directory (or use the provided one):

```env
PORT=5000
JWT_SECRET=your-secret-key-here-change-in-production
MONGODB_URI=mongodb://localhost:27017/member-management
```

**Important**:
- Change the `JWT_SECRET` in production!
- Update `MONGODB_URI` to match your MongoDB connection string
- For cloud MongoDB (MongoDB Atlas), use: `mongodb+srv://<username>:<password>@cluster.mongodb.net/member-management`

## 🚀 Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For Linux/macOS
sudo systemctl start mongod
# or
mongod

# For Windows
net start MongoDB
```

### 2. Seed the Database (First Time Only)

```bash
cd backend
npm run seed
```

This will create:
- 3 demo users (admin, manager, user)
- 5 sample members

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔐 Demo Credentials

After running the seed script, the following test accounts are available:

**Admin Account (Full Access):**
- Email: `admin@slstl.lk`
- Password: `admin123`
- Permissions: Can view, create, update, and delete members

**Manager Account (Moderate Access):**
- Email: `manager@slstl.lk`
- Password: `manager123`
- Permissions: Can view, create, and update members

**User Account (View Only):**
- Email: `user@slstl.lk`
- Password: `user123`
- Permissions: Can only view members

## 📱 Application Flow

1. **Login Page** (`/login`)
   - User enters email and password
   - System validates credentials
   - JWT token generated and stored
   - Redirects to dashboard on success

2. **Dashboard** (`/dashboard`)
   - Protected route (requires authentication)
   - Displays member statistics
   - Shows member list with details
   - Provides logout functionality

## 🎨 Color Palette

The application uses a professional color scheme inspired by modern forums:

- Primary: Blue gradient (`#667eea` to `#764ba2`)
- Secondary: Green (`#059669`)
- Accent: Amber (`#f59e0b`)
- Danger: Red (`#dc2626`)

## 📁 Project Structure

```
member-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── memberController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── authorize.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Member.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── members.js
│   │   ├── seeders/
│   │   │   └── seedDatabase.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend and backend route protection
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Email and password validation

## 🚧 Future Enhancements

- [x] Database integration (MongoDB)
- [x] Member CRUD operations (Create, Update, Delete)
- [x] Role-based access control
- [ ] Advanced search and filtering
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Activity logging
- [ ] Export members to CSV/Excel
- [ ] Pagination for large datasets
- [ ] File upload for member photos

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (creates user with 'user' role by default)
- `GET /api/auth/profile` - Get user profile (protected)

### Members
- `GET /api/members` - Get all members (requires authentication)
- `GET /api/members/:id` - Get member by ID (requires authentication)
- `POST /api/members` - Create new member (requires admin or manager role)
- `PUT /api/members/:id` - Update member (requires admin or manager role)
- `DELETE /api/members/:id` - Delete member (requires admin role only)

## 👤 User Roles & Permissions

### Admin
- Full access to all features
- Can create, read, update, and delete members
- Can manage all users

### Manager
- Can view all members
- Can create new members
- Can update existing members
- Cannot delete members

### User
- Can only view members
- Cannot create, update, or delete members
- Read-only access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support, please open an issue in the repository.