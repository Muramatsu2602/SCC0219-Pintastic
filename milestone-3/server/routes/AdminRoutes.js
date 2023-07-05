const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get('/', async function(request, response, next) {
  try {
    const admins = await AdminController.getAll();

    return response.status(200).json(admins);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async function(request, response, next) {
  try {
    const {email, password} = request.body;

    const admin = await AdminController.login(email, password);

    return response.status(200).json(admin);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(request, response, next) {
  try {
    const {name, email} = request.body;

    const createdAdmin = await AdminController.create(name, email);

    return response.status(200).json(createdAdmin);
  } catch (error) {
    next(error);
  }
});

router.put('/toggleActive/:id', async function(request, response, next) {
  try {
    const {id} = request.params;

    const updatedAdmin = await AdminController.toggleActive(id);

    return response.status(200).json(updatedAdmin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
