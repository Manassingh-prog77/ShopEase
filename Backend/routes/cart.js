const express = require('express');
const { body, validationResult } = require('express-validator');
const Cart = require("../models/Cart");
const Buy = require("../models/Buy");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

router.post("/addtocart", fetchuser, [
    body("asin", "Select Valid Product").isLength({ min: 3 }),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("quantity", "Quantity should be greater than 1").isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { asin, name, quantity, price, image } = req.body;
        const userId = req.user.id;

        // Check if the product already exists in the cart
        let cartItem = await Cart.findOne({ asin, user: userId });

        if (cartItem) {
            // Update the quantity if the product exists
            cartItem.quantity += quantity;
            await cartItem.save();
            res.json("Product quantity updated in cart");
        } else {
            // Create a new cart item if the product does not exist
            cartItem = new Cart({
                name,
                asin,
                quantity,
                price,
                user: userId,
                image
            });
            await cartItem.save();
            res.json("Product added to cart");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

router.delete("/removefromcart", fetchuser, [
    body("asin", "Select Valid Product").isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { asin } = req.body;
        const userId = req.user.id;

        const cartItem = await Cart.findOneAndDelete({ asin, user: userId });
        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        res.json({ message: "Product removed from cart" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

router.post("/updateCart",fetchuser,
    [
        body("quantity", "Quantity should be greater than 1").isInt({ min: 1 })
    ],
    async (req,res) =>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { asin,quantity } = req.body;
        const userId = req.user.id;

        // Check if the product already exists in the cart
        let cartItem = await Cart.findOne({ asin, user: userId });
        if (cartItem) {
            // Update the quantity if the product exists
            cartItem.quantity = quantity;
            await cartItem.save();
            res.json("Product quantity updated in cart");
        } else {
            res.status(500).send("Error in updating Cart")
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
    }
)

router.delete("/clearcart", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Remove all cart items for the user
        const result = await Cart.deleteMany({ user: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No items found in cart" });
        }

        res.json({ message: "All items removed from cart" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

router.post('/transfercart', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all cart items for the user
        const cartItems = await Cart.find({ user: userId });
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No items in cart to transfer' });
        }

        // Process each cart item and create a new entry in the buy collection
        const buyItems = cartItems.map(item => ({
            user: userId,
            asin: item.asin,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            totalBill: item.quantity * item.price, // Calculate total bill
            image: item.image
        }));

        // Insert all buy items into the Buy collection
        await Buy.insertMany(buyItems);

        // Clear the cart for the user
        await Cart.deleteMany({ user: userId });

        res.json({ message: 'Cart items have been successfully transferred to the buy collection' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred');
    }
});



module.exports = router;
