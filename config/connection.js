const mongoose = require("mongoose")
const mongodb = (req,res) =>{mongoose.connect(
    "mongodb://localhost:27017/Ecommerce",
    {
        useNewurlParser : true  
    }

)
.then(()=>console.log("Mongodb is connected"))
.catch((err)=> console.log(err))
}
module.exports ={mongodb}
