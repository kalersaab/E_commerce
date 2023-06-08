const jwt = require("jsonwebtoken");
require("dotenv").config(); //load .env variables

const Token = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRETE, {expiresIn:"3d"})
}

module.exports = {Token}