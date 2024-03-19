const express = require('express');
const fs = require('fs');

const carController = require('./controllers/carController')
const carRoutes = require('./routes/carRoutes');
const app = express();
app.use(express.json());

const PORT = 3000;
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

// app.get('/', carController.defaultRouter);
// app.get('/cars', carController.listCars);
app.use(carRoutes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}); 