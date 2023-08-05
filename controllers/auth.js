const User = require("../models/user");

const bcrypt = require("bcrypt");

exports.signup = async(req , res , next) => {

    const email = req.body.email;
    const password = req.body.password;
    const confpass = req.body.cnfpass;
    if(password != confpass){
        console.log("password does not match");
    }
    else{
        try{
            hashedpass = await bcrypt.hash(password , 12);
            const user = new User({
                email : email,
                password : hashedpass
            })
            const result = await user.save();
            console.log("user created");
            res.status(201).json({
                message : "User created",
                userId : user._id
            });
        }
        catch (err){
            console.log(err);
        }
    }
}