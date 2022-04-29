
// Location Model to work with
const User = require('../Models/User');

// functions for business logic and to talk to database

exports.addNewUser = (req, res) => {
    const reqBody = req.body;
    const {
        email,
        password,
        firstName,
        lastName
    } = reqBody;

    // prepare the data so that I can insert it in mongo DB
    const userObj = new User(
        {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
    );

    // insert the data in mongoDB
    userObj.save().then(response => {
        res.status(200).json({
            message: "User Registered Successfully !",
            user: response
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Inserting the data",
            error: error
        });
    });
}

exports.login = (req, res) => {
    const reqBody = req.body;
    const {
        email,
        password
    } = reqBody;

    User.find({
        email: email,
        password: password
    }).then(result => {
        res.status(200).json({
            message: "User logged in Successfully!",
            user: result,
            isLoggedIn: true
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error logging in",
            error: error
        });
    });
}