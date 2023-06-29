const ProductDao = require('../daos/ProductDao');

class ProductController {
  static async getAllProducts() {
    const products = await ProductDao.getAll();
    return products.map(this.#adaptProduct);
  };

  static async getProductById(id) {
    const product = await ProductDao.getById(id);
    return this.#adaptProduct(product);
  };

  static async create(id, title) {
    return await ProductDao.create(id, title);
  };

  static async updateById(id, title) {
    return await ProductDao.updateById(id, title);
  };

  static async delete(id) {
    return await ProductDao.delete(id);
  };

  static #adaptProduct(product) {
    delete product.__v;

    return product;
  }
}

module.exports = ProductController;
