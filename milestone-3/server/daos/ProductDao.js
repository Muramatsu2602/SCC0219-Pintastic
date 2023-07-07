const Product = require('../models/schemas/Product');

class ProductDao {
  static async getAll() {
    const products = await Product.find();
    return products.map(product => product.toObject());
  }

  static async getById(id) {
    const product = await Product.findOne({ _id: id });
    return product.toObject();
  }

  static async create(productsData) {
    const newProduct = new Product(productsData);
    const product = await newProduct.save();  
    return product;
  }
  

  static async updateById(id, title) {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        title
      },
      { new: true },
    );

    return updatedProduct.toObject();
  }

  static async addToStock(id, amount) {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { stock: amount } },
    );

    return updatedProduct.toObject();
  }

  static async delete(id) {
    return await Product.findOneAndDelete({ _id: id });
  }
}

module.exports = ProductDao;
