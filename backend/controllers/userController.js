import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";


// @desc        Auth the user & get token
// @routes      POST /api/users/login
// @access      Public

export const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    // const user = await User.findOne({ email : email })
    // meaning find email that meatches the destructured email
    const user = await User.findOne({ email })

    // if user exists and the passwords match
    // it will try to match the plain text with the encrypted password
    // using bcrypt inside our usermodel
    // that way we don't have to bring bcrypt
    if(user && (await user.matchPassword(password)) ) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    }
    else {
        // 401 means unauthorized
        res.status(401)
        throw new Error("invalid email or ppassword")
    }

})



// @desc        Register a new user
// @routes      POST /api/users
// @access      Public

export const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;

    // const user = await User.findOne({ email : email })
    // meaning find email that meatches the destructured email
    const userExists = await User.findOne({ email })

    if(userExists) {

        // 400 means bad request
        res.status(400)
        throw new Error("User already exists")
        
    }

    // creating the user now
    const user = await User.create({
        name,
        email,
        password
    })
    
    if(user) {
        
        // if user is created
        // status 201 means something was created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})






// @desc        GET USER PROFILE
// @routes      POST /api/users/profile
// @access      Private

export const getUserProfile = asyncHandler(async (req, res) => {

    // that is the id of the current user
    const user = await User.findById(req.user._id);
    // req.user is accessible now because of the auth middleware

    // once user is found return all the details about the userr
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }

})




// @desc        UPDATE USER PROFILE
// @routes      PUT /api/users/profile
// @access      Private

export const updateUserProfile = asyncHandler(async (req, res) => {

    // that is the id of the current user
    const user = await User.findById(req.user._id);
    // req.user is accessible now because of the auth middleware

    // once user is found return all the details about the userr
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if( req.body.password ) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })

    }else {
        res.status(404)
        throw new Error('User not found')
    }

})


// @desc        GET ALL   USERS
// @routes      GET /api/users/profile
// @access      Private/Admin you also have to be an admin to log in

export const getUsers = asyncHandler(async (req, res) => {

    // empty object for all users
    const users = await User.find({});

    res.json(users);

})


// @desc        Delete user
// @routes      DELETE /api/users/:id
// @access      Private/Admin 

export const deleteUser = asyncHandler(async (req, res) => {

    // req.params.id is the id in the url
    const user = await User.findById(req.params.id)

    if(user ) {
        await user.remove()
        res.json({ message: "user removed successfully!"})
    }
    else {
        res.status(404)
        throw new Error("user doesn't exist")
    }

    res.json(users);

})


// @desc        GET USER BY ID
// @routes      POST /api/users/:id
// @access      Private/Admin 

export const getUserById = asyncHandler(async (req, res) => {

    // req.params.id is the id in the url
    // .select -password means you want all the information of user that was found by the id excluding only the password
    const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error("user doesn't exist")
    }

})



// @desc        UPDATE USER
// @routes      PUT /api/users/:id
// @access      Private/Admin

export const updateUser = asyncHandler(async (req, res) => {

    // the id is gotten from the browser
    const user = await User.findById(req.params.id);
    // req.user is accessible now because of the auth middleware

    // once user is found return all the details about the userr
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        // user.isAdmin = req.body.isAdmin traversy code my code below
        user.isAdmin = req.body.isAdmin || user.isAdmin 

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    }else {
        res.status(404)
        throw new Error('User not found')
    }

})

