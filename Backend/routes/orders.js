const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/Cart");
const Buy = require("../models/Buy");

//Route 1: Orders in Cart
router.get("/cartData", fetchuser, async (req, res) => {
  try {
    const data = await Cart.find({ user: req.user.id });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2: All orders
router.get("/allorders", fetchuser, async (req, res)=>{
    try {
        const data = await Buy.find({ user: req.user.id });
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Current Orders
router.get("/currentOrders", fetchuser, async (req,res)=>{
    try {
        const data = await Buy.find({ user: req.user.id, OrderStatus: "To be delivered"});
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4: Cancel Orders
router.get("/cancelOrders", fetchuser, async (req,res)=>{
    try {
        const data = await Buy.find({ user: req.user.id, OrderStatus: "Cancelled"});
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/orderDetails", fetchuser, async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        const order = await Buy.findOne({ user: req.user.id, orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

