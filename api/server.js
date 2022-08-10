const express = require('express');
const server = express();
const User = require('./users/model');

server.use(express.json());

server.get('/api/users', async (_, res) => {
  const users = await User.find();

  return res.status(200).json(users);
});

server.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req?.params?.id);

  if (!user) {
    return res.status(404).json({
      message: 'The user with the specified ID does not exist',
    });
  }

  return res.status(200).json(user);
});

module.exports = server;
