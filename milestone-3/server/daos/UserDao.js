const User = require('../models/schemas/User');

class UserDao {
  static async getAll() {
    const users = await User.find();
    return users.map(user => user.toObject());
  }

  static async getById(id) {
    const user = await User.findOne({ _id: id });
    return user.toObject();
  }

  static async create(id, email) {
    const newUser = new User({
      id, 
      email
    });

    const user = await newUser.save();

    return user.toObject();
  }

  static async updateById(id, email) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        email
      },
      { new: true },
    );

    return updatedUser.toObject();
  }

  static async delete(id) {
    return await User.findOneAndDelete({ _id: id });
  }
}

module.exports = UserDao;
