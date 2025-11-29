# Member Management System

A full-stack member management system built with Vite.js (React) frontend and Express.js backend. This application features a modern login system with JWT authentication and a comprehensive dashboard for managing forum members.

## 🚀 Features

- **Authentication System**: Secure login with JWT tokens
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Member Management**: View and manage forum members
- **Modern UI**: Clean, responsive design with professional color palette
- **Real-time Stats**: Dashboard displaying member statistics
- **Role-based System**: Support for Admin, Moderator, and Member roles

## 🛠️ Tech Stack

### Frontend
- **Vite.js** - Fast build tool and development server
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling with modern features

### Backend
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

The backend uses environment variables. A default `.env` file is included in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Important**: Change the `JWT_SECRET` in production!

## 🚀 Running the Application

### Start Backend Server

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

The system comes with pre-configured demo users:

**Admin Account:**
- Email: `admin@slstl.lk`
- Password: `admin123`

**Member Account:**
- Email: `member@slstl.lk`
- Password: `admin123`

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
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── members.js
│   │   └── server.js
│   ├── .env
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

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Member CRUD operations (Create, Update, Delete)
- [ ] Advanced search and filtering
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Activity logging
- [ ] Export members to CSV/Excel

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)

### Members
- `GET /api/members` - Get all members (protected)
- `GET /api/members/:id` - Get member by ID (protected)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support, please open an issue in the repository.