const express = require("express");
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.defaultRouter);
router.get('/cars', carController.listCars);
router.post('/cars', carController.addNewCar);
router.get('/cars/:id', carController.detailCars);
router.patch('/cars/:id', carController.updateCar);
// router.get('/cars/test', carController.detailCars);

module.exports = router;

