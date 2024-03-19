const express = require("express");
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.defaultRouter);
router.get('/cars', carController.listCars);
router.get('/cars/:id', carController.detailCars);
// router.get('/cars/test', carController.detailCars);

module.exports = router;

