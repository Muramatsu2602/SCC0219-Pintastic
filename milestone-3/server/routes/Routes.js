const express = require('express');
const router = express.Router();

const ProductRoutes = require('./ProductRoutes');
const AdminRoutes = require('./AdminRoutes');
const UserRoutes = require('./UserRoutes');
const CheckoutRoutes = require('./CheckoutRoutes');

router.use('/products', ProductRoutes);
router.use('/admins', AdminRoutes);
router.use('/users', UserRoutes);
router.use('/checkout', CheckoutRoutes);

module.exports = router;
