const express = require('express');
const router = express.Router();

const ProductRoutes = require('./ProductRoutes');
const AdminRoutes = require('./AdminRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/products', ProductRoutes);
router.use('/admins', AdminRoutes);
router.use('/users', UserRoutes);

module.exports = router;
