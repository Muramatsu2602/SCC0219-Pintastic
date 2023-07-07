const jwt = require('jsonwebtoken');

const PintasticException = require('../models/exceptions/PintasticException');
const UserDao = require('../daos/UserDao');

class UserController {
  static async getAllUsers() {
    const users = await UserDao.getAll();

    return users;
  };

  static async getUserById(id) {
    const user = await UserDao.getById(id);

    return this.#removeSensitiveData(user);
  };

  static async login(email, password) {
    const user = await UserDao.getByEmail(email);

    if(user == null || user.password != password) {
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

  static async create(id, email, name) {
    return await UserDao.create(id, email, name);
  };

  static async updateById(id, email, name) {
    return await UserDao.updateById(id, email, name);
  };

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
