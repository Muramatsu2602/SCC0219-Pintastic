const ProductDao = require("../daos/ProductDao");

class ProductController {
  static async getAllProducts() {
    const products = await ProductDao.getAll();
    return products.map(this.#removeSensitiveData);
  }

  static async getProductById(id) {
    const product = await ProductDao.getById(id);
    return this.#removeSensitiveData(product);
  }

  static async create(productData) {
    return await ProductDao.create(productData);
  }

  static async updateById(id, title) {
    return await ProductDao.updateById(id, title);
  }

  static async delete(id) {
    return await ProductDao.delete(id);
  }

  static #removeSensitiveData(product) {
    delete product.__v;

    return product;
  }
}

module.exports = ProductController;
