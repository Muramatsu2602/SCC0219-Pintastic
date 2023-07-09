const User = require('../models/schemas/User');
const PintasticException = require('../models/exceptions/PintasticException');

class UserDao {
  static async getAll() {
    return await User.find().sort({ updatedAt: -1 });
  }

  static async getById(id) {
    return await User.findOne({ _id: id });
  }

  static async getByEmail(email) {
    return await User.findOne({ email });
  }

  static async create(data) {
    try {
      const newUser = new User(data);

      return await newUser.save();
    } catch (error) {
      if(error.name == 'MongoServerError' && error.code == '11000') {
        throw new PintasticException('User create failed due to duplicated email', 409, 'This email is already in use');
      }

      throw error;
    }
  }

  static async updateById(id, data) {
    return await User.findOneAndUpdate(
      { _id: id },
      data,
      { new: true },
    );
  }

  static async toggleActive(id) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, 
      [
        { $set: { active: { $not: "$active" } } }
      ],
      { new: true }
    );

    return updatedUser;
  }

  static async delete(id) {
    return await User.findOneAndDelete({ _id: id });
  }
}

module.exports = UserDao;
