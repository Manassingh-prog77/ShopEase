const express = require('express');
const { body, validationResult } = require('express-validator');
const Buy = require("../models/Buy");
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.post ("/buynow",fetchuser,
    [
        body("asin", "Select Valid Product").isLength({ min: 3 }),
        body("name", "Enter a valid Name").isLength({ min: 3 }),
        body("quantity", "Quantity should be greater than 1").isInt({ min: 1 })
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            order = await Buy.create({
                asin: req.body.asin,
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                totalBill: (req.body.quantity)*(req.body.price),
                user: req.user.id,
                image: req.body.image
            });

            res.json("Order Placed Successfully");
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occurred");
        }
    }
)


module.exports = router;
