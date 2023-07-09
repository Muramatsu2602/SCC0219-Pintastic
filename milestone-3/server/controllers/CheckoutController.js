const PintasticException = require('../models/exceptions/PintasticException');
const ProductController = require('./ProductController');
const TransactionController = require('./TransactionController');

class CheckoutController {
  static async checkout(customerId, checkoutProducts) {
    const products = new Array();

    for(const checkoutProduct of checkoutProducts) {
      const storedProduct = await ProductController.getProductById(checkoutProduct.id);

      if(storedProduct.status != true) {
        throw new PintasticException('Inactive product', 400, 'Inactive product, try again later');
      }

      if(storedProduct.stock < checkoutProduct.amount) {
        throw new PintasticException('Insufficient stock on checkout', 400, 'Insufficient stock, try again later');
      }

      products.push({
        ...checkoutProduct,
        'price': (storedProduct.price - (storedProduct.price * storedProduct.discountPercentage / 100)).toFixed(2),
      });
    }

    for(const checkoutProduct of checkoutProducts) {
      await ProductController.addToStock(checkoutProduct.id, -checkoutProduct.amount);
    }

    return await TransactionController.create(customerId, products);
  }
}

module.exports = CheckoutController;
