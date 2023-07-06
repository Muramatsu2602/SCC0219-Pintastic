const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const UserController = require('../controllers/UserController');

router.get('/', 
  AuthMiddleware.isAdmin,
  async function(request, response, next) {
    try {
      const users = await UserController.getAllUsers();

      return response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', 
  AuthMiddleware.isParamIdEqualToClientId,
  async function(request, response, next) {
    try {
      const { id } = request.params;

      const user = await UserController.getUserById(id);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login', 
  async function(request, response, next) {
    try {
      const {email, password} = request.body;

      const user = await UserController.login(email, password);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async function(request, response, next) {
  try {
    const { id, email, name } = request.body;

    const user = await UserController.create(id, email, name);

    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', 
  AuthMiddleware.isParamIdEqualToClientId,
  async function(request, response, next) {
    try {
      const { id } = request.params;
      const { email, name } = request.body;

      const user = await UserController.updateById(id, email, name);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  AuthMiddleware.isParamIdEqualToClientId,
  async function(request, response, next) {
    try {
      const { id } = request.params;

      await UserController.delete(id);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
