const User = require("../models/user");

const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

const mail = require("../utils/email");


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    const confpass = req.body.cnfpass;
    if (password != confpass) {
        const err = new Error("please enter same password in both fields");
        err.statusCode = 422;
        return next(err);
    }
    try {
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const err = new Error("wrong data entered");
            err.statusCode = 422;
            err.data = errors.array();
            throw err;
        }
        const alreadyExist = await User.findOne({ email: email });
        if (alreadyExist) {
            const err = new Error("User already exists");
            err.statusCode = 409;
            throw err;
        }
        hashedpass = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedpass
        })
        const result = await user.save();
        const mailOptions = {
            from: 'ms772254@gmail.com',
            to: email,
            subject: 'Welcome user',
            text: 'welcome to grofers!!!!!!'
        };
        mail.mail(mailOptions);
        console.log("user created");
        res.status(201).json({
            message: "User created",
            userId: user._id
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}