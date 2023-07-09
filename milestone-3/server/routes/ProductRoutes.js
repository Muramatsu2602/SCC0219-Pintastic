const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const ProductController = require('../controllers/ProductController');

router.get('/', async function(request, response, next) {
  try {
    const limit = parseInt(request.query.limit); // Parse the limit from the query string
    const products = await ProductController.getAllProducts(limit);

    return response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/active', async function(request, response, next) {
  try {
    const limit = parseInt(request.query.limit); // Parse the limit from the query string
    const products = await ProductController.getActiveProducts(limit);

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

router.post('/', AuthMiddleware.isAdmin, async function(request, response, next) {
  try {
    const productsData = request.body; // Array de objetos contendo os dados dos produtos
    const products = await Promise.all(productsData.map(async (productData) => {
      const product = await ProductController.create(productData);
      return product;
    }));

    return response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});


router.put('/:id',
  AuthMiddleware.isAdmin,
  async function(request, response, next) {
    try {
      const { id } = request.params;
      const { title, description, price, discountPercentage, image, category, stock } = request.body;

      const data = {
        title,
        description,
        price,
        discountPercentage,
        image,
        category,
        stock
      };

      const product = await ProductController.updateById(id, data);

      return response.status(200).json(product);
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

      const product = await ProductController.toggleActive(id);

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
