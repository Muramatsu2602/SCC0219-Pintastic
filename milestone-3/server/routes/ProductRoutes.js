const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/product', async function(request, response, next) {
  try {
    const products = await ProductController.getAllProducts();

    return response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/product/:id', async function(request, response, next) {
  try {
    const { id } = request.params;

    const product = await ProductController.getProductById(id);

    return response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/product', async function(request, response, next) {
  try {
    const { id, title } = request.body;

    const product = await ProductController.create(id, title);

    return response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/product/:id', async function(request, response, next) {
  try {
    const { id } = request.params;
    const { title } = request.body;

    const product = await ProductController.updateById(id, title);

    return response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/product/:id', async function(request, response, next) {
  try {
    const { id } = request.params;

    await ProductController.delete(id);

    return response.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
