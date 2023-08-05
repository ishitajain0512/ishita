const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

const {body} = require("express-validator");

router.put("/signup" ,
    [
        body("email").isEmail().withMessage("please enter a valid mail")
        .normalizeEmail(),
        body("password").trim().isLength({min : 5}).withMessage("please enter a password with atleast 5 characters"),
        body("cnfpass").trim().isLength({min : 5}).withMessage("please enter a password with atleast 5 characters")
    ],
    authController.signup
);


module.exports = router;