const Wishlist = require('../models/schemas/Wishlist');

// Get wishlist items by user ID
async function getWishlistByUserId(userId) {
  try {
    const wishlistItems = await Wishlist.find({ userId });
    return wishlistItems;
  } catch (error) {
    throw new Error('Failed to get wishlist items');
  }
}

// Add a product to the wishlist
async function addToWishlist(userId, productId) {
  try {
    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();
  } catch (error) {
    throw new Error('Failed to add product to wishlist in WishlistDao: ' + error);
  }
}

// Remove a product from the wishlist
async function removeFromWishlist(userId, productId) {
  try {
    await Wishlist.deleteOne({ userId, productId });
  } catch (error) {
    throw new Error('Failed to remove product from wishlist');
  }
}

module.exports = {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
};