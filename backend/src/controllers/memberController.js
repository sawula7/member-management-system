const Member = require('../models/Member');

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate('createdBy', 'username email')
      .populate('updatedBy', 'username email')
      .sort({ createdAt: -1 });

    res.json(members);
  } catch (error) {
    console.error('Get all members error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('updatedBy', 'username email');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Get member by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new member (admin and manager only)
const createMember = async (req, res) => {
  try {
    const { name, email, role, status, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if member already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'Member with this email already exists' });
    }

    const member = await Member.create({
      name,
      email,
      role,
      status,
      phone,
      address,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Member created successfully',
      member
    });
  } catch (error) {
    console.error('Create member error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update member (admin and manager only)
const updateMember = async (req, res) => {
  try {
    const { name, email, role, status, phone, address } = req.body;

    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== member.email) {
      const existingMember = await Member.findOne({ email });
      if (existingMember) {
        return res.status(400).json({ message: 'Member with this email already exists' });
      }
    }

    member.name = name || member.name;
    member.email = email || member.email;
    member.role = role || member.role;
    member.status = status || member.status;
    member.phone = phone !== undefined ? phone : member.phone;
    member.address = address !== undefined ? address : member.address;
    member.updatedBy = req.user.id;

    await member.save();

    res.json({
      message: 'Member updated successfully',
      member
    });
  } catch (error) {
    console.error('Update member error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete member (admin only)
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await member.deleteOne();

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
