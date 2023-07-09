const TransactionDao = require('../daos/TransactionDao');

class TransactionController {
  static async getAll() {
    const transactions = await TransactionDao.getAll();

    const adaptedTransactions = transactions.map(this.#removeSensitiveData);

    return adaptedTransactions;
  }

  static async create(customerId, products) {
    const totalPrice = products.reduce((total, currentProduct) => total + (currentProduct.price * currentProduct.amount), 0);
    const amountOfProducts = products.reduce((total, currentProduct) => total + currentProduct.amount, 0);
    
    const transaction = await TransactionDao.create(customerId, products, totalPrice, amountOfProducts);

    return this.#removeSensitiveData(transaction);
  }

  static async delete(id) {
    return await TransactionDao.delete(id);
  }

  static #removeSensitiveData(transaction) {
    const updatedTransaction = transaction.toObject();

    delete updatedTransaction.__v;

    return updatedTransaction;
  }
}

module.exports = TransactionController;
