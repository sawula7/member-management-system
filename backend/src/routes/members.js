const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Mock members data
const members = [
  { id: 1, name: 'John Doe', email: 'john@slstl.lk', role: 'Admin', status: 'Active', joinedDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@slstl.lk', role: 'Member', status: 'Active', joinedDate: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@slstl.lk', role: 'Member', status: 'Active', joinedDate: '2024-03-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@slstl.lk', role: 'Moderator', status: 'Active', joinedDate: '2024-01-25' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@slstl.lk', role: 'Member', status: 'Inactive', joinedDate: '2024-04-05' }
];

// Get all members (protected route)
router.get('/', authMiddleware, (req, res) => {
  res.json(members);
});

// Get member by ID (protected route)
router.get('/:id', authMiddleware, (req, res) => {
  const member = members.find(m => m.id === parseInt(req.params.id));

  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  res.json(member);
});

module.exports = router;
