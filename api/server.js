const express = require('express');
const server = express();
const User = require('./users/model');

server.use(express.json());

server.post('/api/users', async (req, res) => {
  if (!req?.body?.name || !req?.body?.bio) {
    return res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  }

  const user = await User.insert(req.body);

  return res.status(201).json(user);
});

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

server.delete('/api/users/:id', async (req, res) => {
  const user = await User.findById(req?.params?.id);

  if (!user) {
    return res.status(404).json({
      message: 'The user with the specified ID does not exist',
    });
  }

  await User.remove(req?.params?.id);

  return res.status(200).json(user);
});

server.put('/api/users/:id', async (req, res) => {
  const user = await User.findById(req?.params?.id);

  if (!user) {
    return res.status(404).json({
      message: 'The user with the specified ID does not exist',
    });
  }

  if (!req?.body?.name || !req?.body?.bio) {
    return res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  }

  try {
    await User.update(req?.params?.id, req.body);

    return res.status(200).json({ ...user, ...req.body });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'The user information could not be modified' });
  }
});

module.exports = server;
