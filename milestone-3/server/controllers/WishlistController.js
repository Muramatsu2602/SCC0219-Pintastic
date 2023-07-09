const WishlistDao = require('../daos/wishlistDao');
const PintasticException = require('../models/exceptions/PintasticException');

class WishlistController {
  static async getWishlistByUserId(userId) {
    try {
      return await WishlistDao.getWishlistByUserId(userId);
    } catch (error) {
      throw new PintasticException('Failed to get wishlist items', 500, error.message);
    }
  }

  static async addToWishlist(userId, productId) {
    try {
      await WishlistDao.addToWishlist(userId, productId);
    } catch (error) {
      throw new PintasticException('Failed to add product to wishlist', 500, error.message);
    }
  }

  static async removeFromWishlist(userId, productId) {
    try {
      await WishlistDao.removeFromWishlist(userId, productId);
    } catch (error) {
      throw new PintasticException('Failed to remove product from wishlist', 500, error.message);
    }
  }
}

module.exports = WishlistController;
