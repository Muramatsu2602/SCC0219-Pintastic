const PintasticException = require('../models/exceptions/PintasticException');
const ProductDao = require("../daos/ProductDao");

class ProductController {
  static async getAllProducts(limit) {
    const products = await ProductDao.getAll(limit);
    return products.map(this.#removeSensitiveData);
  }

  static async getProductById(id) {
    const product = await ProductDao.getById(id);

    if(product == null) {
      throw new PintasticException('Product not found', 400, 'Product not found');
    }

    return this.#removeSensitiveData(product);
  }

  static async create(productData) {
    return await ProductDao.create(productData);
  }

  static async updateById(id, title) {
    return await ProductDao.updateById(id, title);
  }

  static async addToStock(id, amount) {
    return await ProductDao.addToStock(id, amount);
  }

  static async delete(id) {
    return await ProductDao.delete(id);
  }

  static #removeSensitiveData(product) {
    const updatedProduct = product.toObject();

    delete updatedProduct.__v;

    return updatedProduct;
  }
}

module.exports = ProductController;
