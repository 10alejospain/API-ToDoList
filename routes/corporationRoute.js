const { Router } = require('express');
const corpController = require('../controllers/corpController');

const router = Router();

router.get('/:id', corpController.getCorp);

router.post('/create', corpController.createCorp);

module.exports = router;
