const Transaction = require('../models/schemas/Transaction');

class TransactionDao {
  static async getAll() {
    return await Transaction.find();
  }

  static async create(customerId, products, totalPrice, amountOfProducts) {
    const newTransaction = new Transaction({
      customerId,
      products,
      totalPrice,
      amountOfProducts,
    });

    return await newTransaction.save();
  }

  static async delete(id) {
    return await Transaction.findByIdAndDelete(id);
  }
}

module.exports = TransactionDao;
