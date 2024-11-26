const bcrypt = require("bcryptjs");
const BCRYPT_COST = 11;
const STATUS_USER_ERROR = 422;
const User = require("./Usermodel");
const jwt = require("jsonwebtoken");
const jwtSecret = "Sachin is God";

const sendUserError = (err, res) => {
    res.status(STATUS_USER_ERROR);
    if(err && err.message){
        res.json({message: err.message});
    }
    else {
        res.json({error: err});
    }
};

const validateUserName =  (req, res, next) => {
    const { userName } = req.body;

    if(!userName){
        return sendUserError(new Error("Username not present"), res);
    }

    if(userName.length < 5){
        return sendUserError(new Error("Username must contain more than 5 chars"), res);
    }
    next();
};

const validatePassword =  (req, res, next) => {
    const {password, confirmPassword} = req.body;

    if(!password || !confirmPassword){
        return sendUserError(new Error("Password and confirmpassword required"), res);
    }

    if(password.length < 5){
        return sendUserError(new Error("Username must contain more than 5 chars"), res);
    }
    if(password != confirmPassword){
        return sendUserError(new Error("passwd and confirmpasswd need to be same"), res);
    }
    next();
};

const hashPassword =  (req, res, next) => {
    const {password} = req.body;
    bcrypt.hash(password, BCRYPT_COST, (err, hash)=>{
        req.hashedPassword = hash;
        next();
    });
};

const matchPassword = async (req, res, next) => {
    const {userName, password} = req.body;
    try{
        const user = await User.findOne({userName});
        console.log(user);
        if(user == null){
            return sendUserError(Error("No user with current username"), res);
        }

        //match password
        bcrypt.compare(password, user.password, (error, response) =>{
            if(error || !response){
                return sendUserError(new Error("Incorrect Password"), res);
            }
        });
        req.slackId = user.slackId;
        req.userName = user.userName;
        next();
    } catch(error){
        console.log(error);
    }
};

const authenticate =  (req, res, next) => {
    const token = req.get("Authorization");
    if(token){
        //verify the token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            console.log(decoded);
            next();
        });
    }
    else{
        return sendUserError(new Error("No token provided for auth"), res);
    }
};

module.exports = {validateUserName, 
    validatePassword, 
    hashPassword,
    sendUserError,
    matchPassword,
    authenticate};
    