const {validateUserName, validatePassword, hashPassword, matchPassword,
    authenticate 
} = require("./middleware");
const {createUser, getUser } = require("./UserController");


const userRoutes = (server) => {
    server.get("/", authenticate ,(req, res) => {
        res.send("Hellow Users");
    });
    server.post("/signup", 
        validateUserName,
        validatePassword,
        hashPassword,
        createUser,
        getUser
    );
    server.post("/signin", matchPassword, getUser);
};

module.exports = userRoutes;