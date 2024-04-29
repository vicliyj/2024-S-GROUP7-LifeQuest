const express = require("express")
const User = require('../models/user');
var router = express.Router();
const bcrypt = require("bcryptjs");
const { createJWT } = require("../util/jwt.js");

//The 'login' function. This logs in a user
router.post('/submit', async (req, res, next) => {
    try {
        //Get the request values, the email and plaintext password
        const { email, password } = req.body;

        //TODO: Maybe implement a check to see if req is empty.

        //Find the user in the database
        const user = await User.findOne({ email });
        if(user == null){
            //Uh oh! No user found, throw an error 404
            return res.status(404).json({ message: 'User not found' }); 
        }
        //Okay we have the user, are the passwords the same?
        //Since our database only has encrypted passwords we need to use this function
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            //Uh oh! Passwords don't match, throw an error 404
            return res.status(404).json({ message: 'Password not found' });
        }

        //The user credentials are valid! Time to give them a JWS token.

        //Create the token.
        const token = createJWT(user._id);

        //Give the user a cookie with the token.
        res.cookie("login", token, {
            withCredentials: true, //Required for cookies.
            httpOnly: false,
        });

        //We signed in successfully!
        
        //Check if the quiz needs to be done
        if(!user.completedQuiz)
            return res.status(200).json({ message: "Signed in successfully", doQuiz: true });

        //Quiz is already complete, go to home page
        return res.status(200).json({ message: "Signed in successfully", doQuiz: false });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
