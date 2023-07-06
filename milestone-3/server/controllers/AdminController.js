const jwt = require('jsonwebtoken');

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

  static async toggleActive(clientId, adminId) {
    if(clientId == adminId) {
      throw new PintasticException('An admin tried to toggle its own status', 401, 'You cannot toggle your own status');
    }

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
