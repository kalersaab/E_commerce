const express = require("express");
const app = express();
const bodyParser = require ("body-parser")
require('dotenv').config(); // Load variables from .env file
const PORT = process.env.PORT || 5000;
const connection = require("./config/connection");
const route = require("./routes/authroutes");
const { notfound, errorhandle } = require("./middlewares/errorhandler");
connection.mongodb();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/api/user", route);
app.use(notfound)
app.use(errorhandle)
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT} `, )
})