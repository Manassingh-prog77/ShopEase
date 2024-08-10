const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "your_JWT_Secret";

//Route 1 -> Create new User to ShopEase Portal
router.post("/createUser",
    [
        body("name", "Enter a valid Name").isLength({ min: 3 }),
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password must be minimum 5 chracters").isLength({min: 5,}),
    ],
    async (req, res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });

            if(user){
                return res.status(400).json({ error: "Sorry a User with this Email already exists" , success});
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt); 

            //Create New User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true

            res.json({"authtoken": authtoken, success});

        } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured", success);
        }
    }
)

//Route 2 -> Logged In existing User

router.post("/login",
    [
      body("email", "Enter a valid Email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ], async (req, res) => {
      let success = false;
        //If there are errors,return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
        } 

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Please try to Login with correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error: "Please try to Login with correct credentials"});
            } 

            const data  = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            
            res.json({success, "authtoken": authtoken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error").json(success);
        }
})

router.post("/getuser", fetchuser, async (req, res) => {

    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
    })

    // Route to update user information
    router.post("/updateUser", 
      fetchuser,
      [
        body("name", "Enter a valid Name").isLength({ min: 3 }),
        body("email", "Enter a valid Email").isEmail(),
        body("phone", "Enter a valid Phone number").isLength({ min: 10, max: 15 }),
        body("address", "Address cannot be empty").notEmpty(),
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          let userId = req.user.id;
          const { name, email, phone, address } = req.body;
    
          // Find the user by ID and update their information
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, address },
            { new: true, runValidators: true }
          ).select("-password");
    
          if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
          }
    
          res.json(updatedUser);
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
    );
    

module.exports = router;