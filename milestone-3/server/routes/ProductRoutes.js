const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const ProductController = require('../controllers/ProductController');

router.get('/', async function(request, response, next) {
  try {
    const products = await ProductController.getAllProducts();

    return response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(request, response, next) {
  try {
    const { id } = request.params;

    const product = await ProductController.getProductById(id);

    return response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  AuthMiddleware.isAdmin,
  async function(request, response, next) {
    try {
      const { id, title } = request.body;

      const product = await ProductController.create(id, title);

      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', 
  AuthMiddleware.isAdmin,  
  async function(request, response, next) {
    try {
      const { id } = request.params;
      const { title } = request.body;

      const product = await ProductController.updateById(id, title);

      return response.status(200).json(product);
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

      await ProductController.delete(id);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
}
);

module.exports = router;
