const UserDao = require('../daos/UserDao');

class UserController {
  static async getAllUsers() {
    const users = await UserDao.getAll();
    return users.map(this.#adaptUser);
  };

  static async getUserById(id) {
    const user = await UserDao.getById(id);
    return this.#adaptUser(user);
  };

  static async create(id, email) {
    return await UserDao.create(id, email);
  };

  static async updateById(id, email) {
    return await UserDao.updateById(id, email);
  };

  static async delete(id) {
    return await UserDao.delete(id);
  };

  static #adaptUser(user) {
    delete user.__v;

    return user;
  }
}

module.exports = UserController;
