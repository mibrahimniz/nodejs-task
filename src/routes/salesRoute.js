const express = require('express');
const salesController = require('../controllers/sales-controller');

const router = express.Router();

router.post('/api/sale/create', salesController.addSales);
router.get('/api/sales/:filter', salesController.getSaleStats);

module.exports = router;