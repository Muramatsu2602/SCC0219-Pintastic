const ProductDao = require('../daos/ProductDao');
const PintasticException = require('../models/exceptions/PintasticException');

class AdminController {
  static async checkout(products) {
    for(const checkoutProduct of products) {
      const product = await ProductDao.getById(checkoutProduct.id);

      if(product.stock < checkoutProduct.amount) {
        throw new PintasticException('Insufficient stock on checkout', 400, 'Insufficient stock, try again later');
      }
    }

    for(const checkoutProduct of products) {
      await ProductDao.addToStock(checkoutProduct.id, -checkoutProduct.amount);
    }
  }
}

module.exports = AdminController;
