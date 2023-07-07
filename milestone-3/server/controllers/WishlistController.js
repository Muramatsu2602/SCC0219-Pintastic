const WishlistModel = require('../models/wishlist.model');

class WishlistController {
  static async getWishlistByUserId(userId) {
    return await WishlistModel.find({ userId }).lean();
  }

  static async addToWishlist(userId, productId) {
    const wishlistItem = new WishlistModel({ userId, productId });
    await wishlistItem.save();
  }

  static async removeFromWishlist(userId, productId) {
    await WishlistModel.deleteOne({ userId, productId });
  }
}

module.exports = WishlistController;
