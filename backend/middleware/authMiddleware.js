import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if (
        // we already set the authorization value in headers tab 
        // postman you understand
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) 
    {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log(decoded) 
            //i.e do not return the password
            req.user = await User.findById(decoded.id).select('-password')
            // we have access to the request.user in all of our protected routes

            next()
        }
        catch(error) {

            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')

        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

});

const admin = (req, res , next) => {

    if(req.user && req.user.isAdmin) {

        next();

    }
    else {

        // not authorized
        res.status(401);
        throw new Error('Not authorized as an admin');
    }

}
export { protect, admin };
