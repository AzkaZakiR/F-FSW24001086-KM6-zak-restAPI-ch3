const express = require("express");
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.defaultRouter);
// router.get('/cars', carController.listCars);
// router.post('/cars', carController.addNewCar);
router.route('/cars').get(carController.listCars).post(carController.addNewCar);
router.route('/cars/:id').get(carController.detailCars).patch(carController.updateCar).delete(carController.deleteCar);
// router.get('/cars/:id', carController.detailCars);
// router.patch('/cars/:id', carController.updateCar);
// router.delete('/cars/:id', carController.deleteCar);

module.exports = router;

