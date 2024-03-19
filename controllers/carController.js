const fs = require('fs');

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

const defaultRouter = (req, res, next) => {
    res.json({
        "message": "Ping successfully"
    })
}
const coba = (req, res, next) => {
    const { id } = req.params;
    console.log(`Car ID`, id)
    res.json({
        "message": `the id ${id}`
    })
}
const listCars = (req, res, next) => {
    res.status(200).json({
        "status": "okay",
        "totalData": cars.length,
        "data": {
            cars
        }
    })
}

const detailCars = (req, res) => {
    const { id } = req.params;
    const car = cars.find((car) => car.id === id);

    if (!car) {
        res.status(404).json({
            "status": "failed",
            "message": `Data With this ${id} Not found`
        })
    }

    res.status(200).json({
        "status": "okay",
        "data": {
            car
        }
    });
}

module.exports = { defaultRouter, listCars, detailCars, coba }