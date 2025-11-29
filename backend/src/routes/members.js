const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const memberController = require('../controllers/memberController');

// Get all members (all authenticated users can view)
router.get('/', authMiddleware, memberController.getAllMembers);

// Get member by ID (all authenticated users can view)
router.get('/:id', authMiddleware, memberController.getMemberById);

// Create new member (admin and manager only)
router.post('/', authMiddleware, authorize('admin', 'manager'), memberController.createMember);

// Update member (admin and manager only)
router.put('/:id', authMiddleware, authorize('admin', 'manager'), memberController.updateMember);

// Delete member (admin only)
router.delete('/:id', authMiddleware, authorize('admin'), memberController.deleteMember);

module.exports = router;
