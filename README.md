# Member Management System

A comprehensive Next.js-based member management system with role-based authentication, event registration, and integrated PayHere payment gateway.

## Features

- **Authentication & Authorization**
  - Secure user authentication with NextAuth.js
  - Role-based access control (Admin, Manager, User)
  - Protected routes with middleware
  - Session management

- **User Management**
  - User registration and login
  - Profile management
  - Password hashing with bcrypt

- **Event Management**
  - Browse upcoming events
  - Event details and capacity tracking
  - Registration management
  - Event-specific pages

- **Payment Integration**
  - PayHere payment gateway integration
  - Secure payment processing
  - Payment status tracking
  - Success and failure handling

- **Security Features**
  - HTTPS headers (HSTS, X-Frame-Options, CSP)
  - Input validation with Zod
  - CSRF protection via NextAuth
  - SQL injection prevention via Prisma ORM
  - Password hashing
  - Environment variable protection

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payment**: PayHere Payment Gateway
- **Validation**: Zod
- **Styling**: Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MySQL database server
- PayHere merchant account (for payment processing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd member-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure the following:

```env
# Database Configuration
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth Configuration
AUTH_SECRET="your-super-secret-key"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# PayHere Configuration
PAYHERE_MERCHANT_ID="your_merchant_id"
PAYHERE_MERCHANT_SECRET="your_merchant_secret"
NEXT_PUBLIC_PAYHERE_MERCHANT_ID="your_merchant_id"
```

4. Set up the database:

Create a MySQL database:
```sql
CREATE DATABASE member_management;
```

5. Run Prisma migrations:
```bash
npx prisma generate
npx prisma db push
```

6. (Optional) Seed the database with sample data:

Create a seed script or manually add test data through the application.

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Database Schema

The application uses the following main models:

- **User**: Stores user information with roles (ADMIN, MANAGER, USER)
- **Event**: Manages events with details like title, date, location, price
- **Registration**: Links users to events they've registered for
- **Payment**: Tracks payment information and status

## User Roles

1. **USER** (Default)
   - Register for events
   - View profile
   - Make payments
   - View dashboard

2. **MANAGER**
   - All USER permissions
   - Access to admin panel
   - Manage events

3. **ADMIN**
   - All MANAGER permissions
   - Full system access
   - User management

## PayHere Integration

### Setup

1. Create a PayHere account at:
   - Sandbox: https://sandbox.payhere.lk
   - Production: https://www.payhere.lk

2. Get your Merchant ID and Merchant Secret

3. Configure webhook URL in PayHere dashboard:
   ```
   https://your-domain.com/api/payment/notify
   ```

### Testing Payments

For testing in sandbox mode, use PayHere's test cards:
- Test Visa: 4916217501611292
- CVV: Any 3 digits
- Expiry: Any future date

## API Routes

- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - Authentication endpoints
- `POST /api/events/register` - Event registration
- `POST /api/payment/notify` - PayHere payment notification webhook

## Security Considerations

1. **Environment Variables**: Never commit `.env` file to version control
2. **HTTPS**: Always use HTTPS in production
3. **Database**: Use strong passwords and limit access
4. **PayHere**: Verify payment hashes on the server side
5. **Authentication**: Keep AUTH_SECRET secure and random
6. **Updates**: Regularly update dependencies for security patches

## Project Structure

```
member-management-system/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── events/           # Events pages
│   ├── login/            # Login page
│   ├── profile/          # Profile page
│   ├── register/         # Registration page
│   └── payment/          # Payment success/cancel pages
├── components/           # Reusable React components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # NextAuth configuration
│   └── prisma.ts        # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Development Workflow

1. Create a feature branch
2. Make your changes
3. Test thoroughly (authentication, payments, database)
4. Run type checking: `npm run type-check`
5. Commit and push changes
6. Create a pull request

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Run migrations
npx prisma migrate dev
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists
- Check user permissions

### Authentication Issues
- Verify AUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Payment Issues
- Verify PayHere credentials
- Check webhook URL is accessible
- Enable sandbox mode for testing
- Verify hash generation matches PayHere requirements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review PayHere documentation for payment-related issues

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Ensure the following:
- Node.js 18+ runtime
- MySQL database accessible
- All environment variables configured
- NEXTAUTH_URL set to production domain

## Credits

Built with:
- Next.js
- Prisma
- NextAuth.js
- PayHere
- Tailwind CSS
