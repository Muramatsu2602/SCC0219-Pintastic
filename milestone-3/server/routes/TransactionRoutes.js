const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');
const TransactionController = require('../controllers/TransactionController');

router.get('/', 
  AuthMiddleware.isAdmin,
  async function(request, response, next) {
    try {
      const transactions = await TransactionController.getAll();

      return response.status(200).json(transactions);
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

      await TransactionController.delete(id);

      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
