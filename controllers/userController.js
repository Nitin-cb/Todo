const Task=require('../models/userModel')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { use } = require('../routes/todoroutes')

//desc register user
//route post/users/register


const registerUser=async (req,res)=>{
    const {email,username,password}=req.body;
    if(!username||!email||!password){
        res.send(400)
        throw new Error("All fields are mandatory")
    }

    const userAvailable=await User.findOne({email})
    if(userAvailable){
        // res.send(400)
        res.status(400).json({message:"user already registerd"})
        throw new Error("user already registerd")
    }

    //Hash password
    const hashpassword=await bcrypt.hash(password,5);
    // console.log(hashpassword);
    const user=await User.create({
        username,
        email,
        password:hashpassword,
    })
    
    if(user){
        res.status(201).json({_id:user.id,username:user.username,email:user.email})
    }else{
        res.send(400)
        throw new Error("User data is not valid")
    }

    console.log(`User created ${user}`);

    res.json({message:"Register the user"})
}





//desc login user
//route post/users/login

const loginUser=async(req,res)=>{
    
    const {email,password}=req.body;
    
    if(!email||!password){
        res.status(400).json({message:"All fields are mandatory"})
        throw new Error("All fields are mandatory")
    }

    const user=await User.findOne({email})
    //compare password with hashed password
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN,
        {expiresIn:"20m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401).json({message:"User credantials not valid"})
        throw new Error("User credantials not valid")
    }
    // res.json({message:"logi  user"})
}






//desc current user
//route post/users/current
//private

const currentUser=async(req,res)=>{

    res.json(req.user)
}






module.exports={registerUser,loginUser,currentUser}
