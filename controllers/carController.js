const fs = require('fs');

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

const defaultRouter = (req, res, next) => {
    res.json({
        "message": "Ping successfully"
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

const addNewCar = (req, res) => {
    console.log(req.params);

    const newCar = req.body;
    let randomId = getRandomInt(1, 1000).toString();
    randomId += getRandomInt(1, 1000).toString();
    randomId += getRandomInt(1, 10000).toString();
    newCar.id = randomId;
    cars.push(newCar);
    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), (err) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ message: "Error writing file" }); // Send error response
        }
        res.status(201).json({
            "status": "OK",
            "data": {
                car: newCar
            }
        });
    });
}
const updateCar = (req, res) => {
    const id = req.params.id;

    const car = cars.find(car => car.id === id);
    const carIndex = cars.findIndex(car => car.id === id)
    if (carIndex === -1) {
        return res.status(404).json({ message: "Car not found" });
    }
    console.log("Cust index", carIndex)
    cars[carIndex] = { ...cars[carIndex], ...req.body }

    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), (err) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ message: "Error writing file" }); // Send error response
        }
        return res.status(200).json({
            "status": "success  ",
            "message": "data updated",
            "data": {
                car: cars[carIndex],
                car
            }
        });
    });
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = { defaultRouter, listCars, detailCars, addNewCar, updateCar }