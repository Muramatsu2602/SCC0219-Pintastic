const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckoutController = require('../controllers/CheckoutController');

router.post('/', 
  AuthMiddleware.isCustomer,
  async function(request, response, next) {
    try {
      const { clientId } = request.headers;
      const { products } = request.body;

      const transaction = await CheckoutController.checkout(clientId, products);

      return response.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
