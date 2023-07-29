const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc - register a user
//@route - POST - api/users/register
//@access public
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username){
        res.status(400);
        throw new Error("Username is a mandatory.");
    }
    if(!email){
        res.status(400);
        throw new Error("Email is a mandatory.");
    }
    if(!password){
        res.status(400);
        throw new Error("Password is a mandatory.");
    }
    const availableUser = await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(newUser){
        res.status(201).json({_id:newUser.id, email:newUser.email})
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc - login a user
//@route - POST - api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        )
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
    res.json({message:'User loggedin'});
});

//@desc - get current user info
//@route - GET - api/users/current
//@access private
const currentUser = asyncHandler(async (req, res)=>{
    res.status(200).json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}