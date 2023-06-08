const AsyncHandler = require("express-async-handler");
const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const { Token } = require("../config/jwt");
const { ObjectId } = require("mongoose").Types;

const createUser =async (req, res)=>{
    try{
        const{email, firstname, lastname,mobile,password} = req.body;

        const finduser = await usermodel.findOne({email:email});
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        if(!finduser){
            //create new user
            const newuser = await usermodel.create({firstname,lastname, mobile, email, password:hashPassword})
            const {password:omit, ...responseData} = newuser._doc;
            res.status(201).send({data:responseData})
        
        }else{
            throw new Error( "User already exits.")

        }
    }catch(err){
        console.log(err)
    }
} 

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }
    const checkemail = await usermodel.findOne({email:email})
    // if(!checkemail){
    //     res.status(404).json({message: "email and password is not correct!"})
    // }
    const findUser = (checkemail && await bcrypt.compare(password, checkemail.password))
    if(!findUser){
        res.status(404).json({message: "email and password is not correct!"})
    }else{
        res.status(200).json({_id: checkemail?._id,
                            firstname: checkemail?.firstname,
                            lastname: checkemail?.lastname,
                            mobile: checkemail?.mobile,
                            email: checkemail?.email,
                            token: Token(checkemail?._id)})
    }
    }catch(err){
        console.log(err)
    }
};

const getalluser = async (req, res) =>{
    try{
        const getusers = await usermodel.find(req.body).select("-password");
        res.status(200).json({message:"all users fetch successfully", data: getusers})
    }catch(err){
    throw new Error(err)
    } 
}

//get single user

const getuser = async (req, res) =>{
    
    try{
        const {id} = req.params
        const user = await usermodel.findById({_id: new ObjectId(id)}).select('-password')
        res.status(200).json({message:"User data fetched successfully", data:user})

    }catch(err){
        throw new Error(err)
    }
}

const deleteuser = async (req, res) =>{
    
    try{
        const {id} = req.params
        const deleteuser = await usermodel.findByIdAndDelete({_id: new ObjectId(id)}).select('-password')
        if(!deleteuser){
            res.status(404).json({message:"user id not exist!"})
        }else{
        res.status(200).json({message:"User data deleted successfully", data:deleteuser})
        }

    }catch(err){
        throw new Error(err)
    }
}

const updateuser = async (req, res) => {
    try{
        const {id} = req.params;
        const {firstname, lastname, email, mobile}=req.body;
        const update = await usermodel.findByIdAndUpdate({_id: new ObjectId(id)}, req.body, {new:true}).select('-password')
        res.status(200).json({message:"User update successsfully", data:update})

    }catch(err){
        throw new Error(err)
    }
}
module.exports = {createUser, login, getalluser,getuser, deleteuser, updateuser}