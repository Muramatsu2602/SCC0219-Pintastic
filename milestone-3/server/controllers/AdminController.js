const AdminDao = require('../daos/AdminDao');
const PintasticException = require('../models/exceptions/PinstaticException');

class AdminController {
  static async getAll() {
    const admins = await AdminDao.getAll();

    const adaptedAdmins = admins.map(this.#removeSensitiveData);

    return adaptedAdmins;
  }

  static async login(email, password) {
    const admin = await AdminDao.getByEmail(email);

    if(admin == null || admin.password != password || admin.active != true) {
      throw new PintasticException('Failed attempt to login as admin', 401, 'Incorrect user or password');
    }

    return this.#removeSensitiveData(admin);
  }

  static async create(name, email) {
    return await AdminDao.create(name, email);
  }

  static async toggleActive(id) {
    const updatedAdmin = await AdminDao.toggleActive(id);

    return this.#removeSensitiveData(updatedAdmin);
  }

  static #removeSensitiveData(admin) {
    const updatedAdmin = admin.toObject();

    delete updatedAdmin.password;
    delete updatedAdmin.__v;

    return updatedAdmin;
  }
}

module.exports = AdminController;
