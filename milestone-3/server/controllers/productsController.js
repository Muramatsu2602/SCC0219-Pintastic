const mongoose = require('mongoose');
const { productSchema } = require('../models/productModel');

const Product = mongoose.model("Product", productSchema);

module.exports.addProduct = (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save((err, response) => {
    if (err) {
      res.json({ message: "Error adding product" });
    }
    res.send(response);
  });
};

module.exports.getAllProducts = (res) => {
  Product.find({}, (err, response) => {
    if (err) {
      res.json({ message: "Error getting list of all products" });
    }
    res.send(response);
  });
};

module.exports.getProductById = (req, res) => {
  Product.find({ _id: req.params.productId }, (err, answer) => {
    if (err) {
      res.json({ message: "Error getting product by id" });
    } else {
      res.send(answer);
    }
  });
};

module.exports.updateProductById = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        res.json({ message: "Error updating product by id" });
      } else {
        res.send(contact);
      }
    }
  );
};

module.exports.deleteProductById = (req, res) => {
  Product.remove({ _id: req.params.productId }, (err, contact) => {
    if (err) {
      res.json({ message: "Error deleting product by id" });
    } else {
      res.send(contact);
      res.json({ message: "Successfully deleted product from records" });
    }
  });
};
