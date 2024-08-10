const express = require('express');
const { body, validationResult } = require('express-validator');
const Delivery = require('../models/Delivery'); // Use the correct model name
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

// Add Delivery Details
router.post("/addDetails", fetchuser, [
    body("name", "Name should be at least 3 characters long").isLength({ min: 3 }),
    body("email", "Email should be valid").isEmail().normalizeEmail(),
    body("phone", "Phone should be at least 3 characters long").isLength({ min: 3 }),
    body("address", "Address should be at least 3 characters long").isLength({ min: 3 }),
    body("city", "City should be at least 3 characters long").isLength({ min: 3 }),
    body("state", "State should be at least 3 characters long").isLength({ min: 3 }),
    body("zip", "Zip should be at least 3 characters long").isLength({ min: 3 }),
    body("paymentMethod", "Payment method is required").notEmpty().isIn(['Card', 'NetBanking', 'Cash On Delivery'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, phone, address, city, state, zip, paymentMethod } = req.body;
        const userId = req.user.id;

        const deliveryItem = new Delivery({
            user: userId,
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            paymentMethod
        });

        await deliveryItem.save();
        res.status(201).json({ message: "Order placed successfully", deliveryItem });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "An error occurred while placing the order" });
    }
});

// Get Delivery Details
router.post("/deliveryDetails", fetchuser, async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        const order = await Delivery.findOne({ user: req.user.id, orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching delivery details:", error.message);
        res.status(500).json({ message: "An error occurred while fetching delivery details" });
    }
});

module.exports = router;
