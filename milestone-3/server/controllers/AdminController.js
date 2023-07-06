const jwt = require('jsonwebtoken');

const AdminDao = require('../daos/AdminDao');
const PintasticException = require('../models/exceptions/PintasticException');

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

    const accessToken = jwt.sign({ 
      clientType: 'Admin',
      clientId: admin._id,
    }, process.env.ACCESS_TOKEN_SECRET);

    return {
      ...this.#removeSensitiveData(admin),
      accessToken
    };
  }

  static async create(name, email) {
    return await AdminDao.create(name, email);
  }

  static async toggleActive(adminId) {
    const updatedAdmin = await AdminDao.toggleActive(adminId);

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
