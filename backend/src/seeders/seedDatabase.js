const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Member = require('../models/Member');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Member.deleteMany({});

    console.log('Existing data cleared');

    // Create users with different roles
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@slstl.lk',
        password: 'admin123',
        role: 'admin'
      },
      {
        username: 'manager',
        email: 'manager@slstl.lk',
        password: 'manager123',
        role: 'manager'
      },
      {
        username: 'user',
        email: 'user@slstl.lk',
        password: 'user123',
        role: 'user'
      }
    ]);

    console.log('Users created successfully');

    // Create sample members
    await Member.create([
      {
        name: 'John Doe',
        email: 'john@slstl.lk',
        role: 'Admin',
        status: 'Active',
        phone: '+94 77 123 4567',
        address: 'Colombo, Sri Lanka',
        createdBy: users[0]._id
      },
      {
        name: 'Jane Smith',
        email: 'jane@slstl.lk',
        role: 'Member',
        status: 'Active',
        phone: '+94 77 234 5678',
        address: 'Kandy, Sri Lanka',
        createdBy: users[0]._id
      },
      {
        name: 'Bob Johnson',
        email: 'bob@slstl.lk',
        role: 'Member',
        status: 'Active',
        phone: '+94 77 345 6789',
        address: 'Galle, Sri Lanka',
        createdBy: users[1]._id
      },
      {
        name: 'Alice Williams',
        email: 'alice@slstl.lk',
        role: 'Moderator',
        status: 'Active',
        phone: '+94 77 456 7890',
        address: 'Negombo, Sri Lanka',
        createdBy: users[1]._id
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@slstl.lk',
        role: 'Member',
        status: 'Inactive',
        phone: '+94 77 567 8901',
        address: 'Matara, Sri Lanka',
        createdBy: users[0]._id
      }
    ]);

    console.log('Members created successfully');
    console.log('\nSeed data created successfully!');
    console.log('\nTest accounts:');
    console.log('Admin - Email: admin@slstl.lk, Password: admin123');
    console.log('Manager - Email: manager@slstl.lk, Password: manager123');
    console.log('User - Email: user@slstl.lk, Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
