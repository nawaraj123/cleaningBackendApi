const User = require("../db/schema/User");

module.exports = async function(req,res,next){
    const userId = req.headers.user;
    const user = await User.findOne({shortid: userId});
    if(!user){
        return res.status(400).json({message:"No user found"});
    }
    if(!user.isSignedIn){
        return res.status(400).json({message:"Please signup/login first"})
    };
    next();
}