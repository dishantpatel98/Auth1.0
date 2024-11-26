const User = require("./Usermodel");
const jwt = require("jsonwebtoken");
const jwtSecret = "Sachin is God";

const createUser = async (req, res) => {
    const {userName, slackId} = req.body;
    const {hashedPassword} = req;
    try{
        const createdUser = await User.create({
            userName,
            slackId,
            password: hashedPassword,
        });
        res.status(200).json(createdUser);
    } 
    catch (error){
        console.log(error);
    }
};

const getUser = async(req, res) =>{
    const {userName, slackId} = req;
    try{
        const payload = {userName, slackId};
        const token = await jwt.sign(payload, jwtSecret);
        res.status(200).json({token}); 
    } catch(error){
        console.log(error);
    }
};

const authenticate = (req, res, next) => {
    const token = req.get("Authorization");
};

module.exports = {createUser, getUser};