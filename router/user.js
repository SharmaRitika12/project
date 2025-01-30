const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController =require("../controller/user");


router.route("/signUp")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
 passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), userController.login);



router.get("/logout",userController.logout)

  
module.exports = router;
