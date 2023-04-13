const Car = require("../Models/car");

const carController = {};

// CREATE

carController.createCar = async (req, res) => {
  try {
    const newcar = req.body;
    const car = new Car(newcar);
    await car.save();

    res.status(201).json({ message: "Car created successfully", car });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ
carController.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all the cars
carController.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    cars
      ? res.status(200).json(cars)
      : res.status(404).json({ message: "Cars not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
carController.updateCar = async (req, res) => {
  try {
    const { brand, model, anne, color, typeFuel, photo, price, adress } =
      req.body;
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.anne = anne || car.anne;
    car.color = color || car.color;
    car.typeFuel = typeFuel || car.typeFuel;
    car.photo = photo || car.photo;
    car.price = price || car.price;
    car.adress = adress || car.adress;
    await car.save();
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
carController.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    !car
      ? res.status(404).json({ message: "Car not found" })
      : res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//SEARCH
carController.search = async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, city, governorate } = req.query;
    const query = {};
    if (brand) {
      query.brand = brand;
    }
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    if (governorate) {
      query["address.governorate"] = { $regex: governorate, $options: "i" };
    }
    const cars = await Car.find(query);
    res.status(201).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = carController;
