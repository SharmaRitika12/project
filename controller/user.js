const User = require("../Models/user");


module.exports.renderSignUpForm =(req, res) => {
    res.render('users/signup');
}

module.exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
       
       if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
     } ) 
    
    } catch (e) {
        req.flash("error", e.message);
        res.render('users/signup');
    }
}

module.exports.renderLoginForm = (req,res)=>
{
    res.render('users/login');
}

module.exports.login =(req, res) => {
    console.log("Authentication successful:", req.user);
    req.flash("success", "Welcome back to Wanderlust! You are logged in.");
    let redirectUrl = res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl);
}

module.exports.logout =(req,res,next)=>
{
    req.logOut((err)=>
    {
        if(err)
        {
           return next(err);
        }
        req.flash("success","You Are Successfully Logged Out!")
        res.redirect("/listings");
    })
}