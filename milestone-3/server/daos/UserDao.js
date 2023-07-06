const User = require('../models/schemas/User');

class UserDao {
  static async getAll() {
    return await User.find();
  }

  static async getById(id) {
    return await User.findOne({ _id: id });
  }

  static async getByEmail(email) {
    return await User.findOne({ email });
  }

  static async create(id, email, name) {
    const newUser = new User({
      id, 
      email,
      name
    });

    return await newUser.save();
  }

  static async updateById(id, email, name) {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        email,
        name
      },
      { new: true },
    );
  }

  static async delete(id) {
    return await User.findOneAndDelete({ _id: id });
  }
}

module.exports = UserDao;
