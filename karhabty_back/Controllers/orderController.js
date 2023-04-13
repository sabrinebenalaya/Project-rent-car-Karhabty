const Order = require("../Models/order");
const Payement = require("../Models/payment");
const Announcement = require("../Models/announcement");
const orderController = {};

// Create a new payement Methode
orderController.createPayement = async (req, res) => {
  try {
    const payement = new Payement(req.body);
    await payement.save();
    res.status(201).json(payement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
orderController.createOrder = async (req, res) => {
  
  try {
    
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all orders
orderController.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    orders.length===0
      ? res.status(404).json({ message: "Orders not found" })
      : res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single order by ID
orderController.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    !order
      ? res.status(404).json({ message: "Order not found" })
      : res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing order
orderController.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    !order
      ? res.status(404).json({ message: "Order not found" })
      : res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing Order
orderController.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    !order
      ? res.status(404).json({ message: "Order not found" })
      : res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all the active order
orderController.getAllActiveOrde = async (req, res) => {
  try {
    const orders = await Order.find({ status: req.params.status });
    orders.length===0
      ? res.status(404).json({ message: "Orders not found" })
      : res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all the orders by User
orderController.getOrderByUser = async (req, res) => {

  try {
    const orders = await Order.find({user:req.params.id})
   
    orders.length===0
      ? res.status(404).json({ message: "No Orders found, for you" })
      : res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = orderController;
