const AdminDao = require('../daos/AdminDao');

class AdminController {
  static async getAll() {
    const admins = await AdminDao.getAll();

    const adaptedAdmins = admins.map(this.#adaptAdmin);

    return adaptedAdmins;
  }

  static async create(name, email) {
    return await AdminDao.create(name, email);
  }

  static async toggleActive(id) {
    const updatedAdmin = await AdminDao.toggleActive(id);

    return this.#adaptAdmin(updatedAdmin);
  }

  static #adaptAdmin(admin) {
    delete admin.password;
    delete admin.__v;

    return admin;
  }
}

module.exports = AdminController;
