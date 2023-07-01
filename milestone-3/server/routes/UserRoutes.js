const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', async function(request, response, next) {
  try {
    const users = await UserController.getAllUsers();

    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(request, response, next) {
  try {
    const { id } = request.params;

    const user = await UserController.getUserById(id);

    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(request, response, next) {
  try {
    const { id, email } = request.body;

    const user = await UserController.create(id, email);

    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function(request, response, next) {
  try {
    const { id } = request.params;
    const { email } = request.body;

    const user = await UserController.updateById(id, email);

    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/user/:id', async function(request, response, next) {
  try {
    const { id } = request.params;

    await UserController.delete(id);

    return response.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
