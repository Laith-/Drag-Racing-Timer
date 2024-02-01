const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const GoogleUser = require("../models/userGoogleModel")
const {checkPasswordReq, emailIsValid} = require("../middleware/registerationMiddleware")

// desc: Register new user
// route: POST /api/users
// access: Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    // checking if password fits requirements
    if(!checkPasswordReq(password)) {
        res.status(400)
        throw new Error("Password must be at least 8 characters long and include one digit")

    }

    const lowercasedEmail = email.toLowerCase()

    // checking if email is valid
    if(!emailIsValid(lowercasedEmail)) {
        res.status(400)
        throw new Error("Invalid email")
    }

    // Checking if user exists
    const userExists = await User.findOne({email: lowercasedEmail})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creat User
    const user = await User.create({
        name,
        email: lowercasedEmail,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            // only need the token can get rid of rest of stuff
            message: "User succesfully registered!",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// desc: Register new user
// route: POST /api/users/login
// access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const lowercasedEmail = email.toLowerCase()

    // check user email
    const user = await User.findOne({email: lowercasedEmail})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            message: "Login User",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})

// desc: auth login with google
// route: POST /api/users/loginGoogle
// access: Public
const loginGoogle = asyncHandler(async (req, res) => { 
    const {token} = req.body
    const decoded = jwt.decode(token)
    
    const {given_name, family_name, email} = decoded

    // Checking if user exists
    const userExists = await GoogleUser.findOne({email})
    
    if(!userExists) {
        // Creat User
        const user = await GoogleUser.create({
            firstName: decoded.given_name,
            lastName: decoded.family_name ? decoded.family_name : null,
            email: decoded.email
        })
        res.status(201).json({
            // only need the token can get rid of rest of stuff
            message: "User succesfully registered!",
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })}
     else {
        const user = await GoogleUser.findOne({email})
        res.status(201).json({
            message: "Login User",
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })
    }
})

// desc: Get user data
// route: GET /api/users/me
// access: Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "99d" 
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    loginGoogle
}