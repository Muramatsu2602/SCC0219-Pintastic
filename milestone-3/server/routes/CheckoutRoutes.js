const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckoutController = require('../controllers/CheckoutController');

router.post('/', 
  AuthMiddleware.isCustomer,
  async function(request, response, next) {
    try {
      const { products } = request.body;

      await CheckoutController.checkout(products);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
