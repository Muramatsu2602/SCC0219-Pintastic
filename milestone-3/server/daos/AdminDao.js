const Admin = require('../models/schemas/Admin');
const PintasticException = require('../models/exceptions/PinstaticException');

class AdminDao {
  static async getAll() {
    return await Admin.find();
  }

  static async getByEmail(email) {
    return await Admin.findOne({ email });
  }

  static async create(name, email) {
    try {
      const newAdmin = new Admin({
        email,
        name,
      });

      const admin = await newAdmin.save();

      return admin;
    } catch (error) {
      if(error.name == 'MongoServerError' && error.code == '11000') {
        throw new PintasticException('User create failed due to duplicated email', 409, 'This email is already in use');
      }

      throw error;
    }
  }

  static async toggleActive(id) {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: id }, 
      [
        { $set: { active: { $not: "$active" } } }
      ],
      { new: true }
    );

    return updatedAdmin;
  }
}

module.exports = AdminDao;
