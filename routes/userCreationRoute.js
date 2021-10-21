const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/:id', userController.getUserById);

router.post('/');

module.exports = router;
