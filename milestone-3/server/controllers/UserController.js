const jwt = require('jsonwebtoken');

const PintasticException = require('../models/exceptions/PintasticException');
const UserDao = require('../daos/UserDao');
const TransactionController = require('./TransactionController');

class UserController {
  static async getAllUsers() {
    const users = await UserDao.getAll();
    const adaptedUsers = users.map(this.#removeSensitiveData);

    for(const index in adaptedUsers) {
      const transactions = await TransactionController.getByCustomerId(adaptedUsers[index]._id);
      
      adaptedUsers[index].purchases = transactions.length;
    }

    return adaptedUsers;
  };

  static async getUserById(id) {
    const user = await UserDao.getById(id);
    const transactions = await TransactionController.getByCustomerId(id);

    return {
      ...this.#removeSensitiveData(user),
      'purchases': transactions.length
    };
  };

  static async login(email, password) {
    const user = await UserDao.getByEmail(email);

    if(user == null || user.password != password || user.active != true) {
      throw new PintasticException('Failed attempt to login as customer', 401, 'Incorrect user or password');
    }

    const accessToken = jwt.sign({ 
      clientType: 'Customer',
      clientId: user._id,
    }, process.env.ACCESS_TOKEN_SECRET);

    return {
      ...this.#removeSensitiveData(user),
      accessToken
    };
  }

  static async create(data) {
    return await UserDao.create(data);
  };

  static async updateById(id, data) {
    return await UserDao.updateById(id, data);
  };

  static async toggleActive(id) {
    const updatedUser = await UserDao.toggleActive(id);

    return this.#removeSensitiveData(updatedUser);
  }

  static async delete(id) {
    return await UserDao.delete(id);
  };

  static #removeSensitiveData(user) {
    const updatedUser = user.toObject();

    delete updatedUser.password;
    delete updatedUser.__v;

    return updatedUser;
  }
}

module.exports = UserController;
