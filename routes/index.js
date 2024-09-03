const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Message } = require('../models');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ firstName, lastName, username, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.render('signup', { error: 'Error creating account' });
  }
});

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Create message route (only for members)
router.post('/message', async (req, res) => {
  if (!req.user || !req.user.isMember) return res.redirect('/');

  const { title, text } = req.body;
  await Message.create({ title, text, userId: req.user.id });
  res.redirect('/');
});

// Home route
router.get('/', async (req, res) => {
  const messages = await Message.findAll({ include: User });
  res.render('index', { messages, user: req.user });
});

module.exports = router;
