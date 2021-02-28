const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Real Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'User 1',
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'User 2',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
