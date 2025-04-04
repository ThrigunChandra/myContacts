const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
 

// *************************************************************************
// @desc Register a user
// @route POST /api/users/register
const userRegister = asyncHandler( async (req, res)=>{
    const {username, email, password} = req.body
    // All fields are mandatory
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory !");
    }
    // Checking if the details already exists in the DB or Not
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exists")
    }

    // Hashing Password \and creating new user i.e., Updating in the "users" database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User is created successfully: ${user}`)
    
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("Request was not valid");
    }
    res.json({message:"Register the user"})
})

// *****************************************************************************

const userLogin = asyncHandler(async(req, res)=>{
    // Getting the data from user
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }

    // Checking if the user already exists
    const user = await User.findOne({email});

    // compare pass with hash pass
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"},
        );
        res.status(200).json({accessToken})
    }
    else {
        res.status(401)
        throw new Error("Email or password is not valid");
    }
})


// @access Private
const currentUser = asyncHandler(async(req, res)=>{
    console.log("A request to show current user..")
    res.status(200).json(req.user);
})

module.exports = {userRegister, userLogin, currentUser};