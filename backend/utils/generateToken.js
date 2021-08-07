import jwt from "jsonwebtoken";

// takes user id because that is what we want to add in the web token

const generateToken = (id) => {
    // id: id, the second argument is the secret, third argument of options
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default generateToken;
