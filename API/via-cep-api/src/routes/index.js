const express = require('express');
const viaCepController = require('../controllers/viaCepController');

const router = express.Router();

router.get('/cep/:cep', viaCepController.getAddressByCep.bind(viaCepController));

module.exports = router;