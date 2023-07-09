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
    const {email, password, name, country, cep, state, address, complement} = request.body;

    const data = {
      email,
      password,
      name,
      country,
      cep,
      state,
      address,
      complement
    };

    const user = await UserController.create(data);

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
      const {email, password, name, country, cep, state, address, complement} = request.body;

      const data = {
        email,
        password,
        name,
        country,
        cep,
        state,
        address,
        complement
      };

      const user = await UserController.updateById(id, data);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/toggleActive/:id', 
  AuthMiddleware.isAdmin,
  async function(request, response, next) {
    try {
      const { id } = request.params;

      const user = await UserController.toggleActive(id);

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  AuthMiddleware.isAdmin,
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
