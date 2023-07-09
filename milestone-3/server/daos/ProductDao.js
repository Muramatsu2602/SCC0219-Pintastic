const Product = require('../models/schemas/Product');

class ProductDao {
  
  static async getAll(limit = null) {
    let query = Product.find();
  
    if (limit) {
      query = query.limit(limit);
    }
  
    return await query.exec();
  }
  
  static async getById(id) {
    return await Product.findById(id);
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
