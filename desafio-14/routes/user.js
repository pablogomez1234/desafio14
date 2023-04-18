const { Router } = require('express');
const { addUser, getUsers, getUser } = require('../controllers/user');

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const user = await addUser(req.body);
  res.json(user);
});

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
  
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
