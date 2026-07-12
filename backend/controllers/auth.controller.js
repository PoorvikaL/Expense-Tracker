const User = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const registerUser=async (req,res)=> {
    try {
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email})
        if(userExists) {
            return res.status(400).json({
                message:"user already exists"
            })
        }
// the registered password is first hashed before storing
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });
//jwt.sign(payload, secretKey, options)
        const token=jwt.sign( {id:user._id},process.env.JWT_SECRET,{ expiresIn:"7d"})
// res.cookie(name, value, options) 
// name → Cookie name
// value → Data stored in the cookie
// options → Security and behavior settings    
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

        res.json({
            message:"registration succesful",
            user: {
        id: user._id,
        name: user.name,
        email: user.email
            }   
            
        })

    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}
// User
//    |
//    | Register
//    |
// Server
//    |
// Check email exists
//    |
// Hash password
//    |
// Store hashed password
//    |
// Create JWT
//    |
// Send JWT as Cookie
//    |
// Browser stores cookie
//    |
// Future Requests
//    |
// Browser automatically sends cookie
//    |
// Server verifies JWT
//    |
// Authenticated

//login user

const loginUser=async (req,res)=> {
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                message:"invalid credentials"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({
                message:"invalid credentials"
            })
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

            res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

                res.json({
                    message:"login succesfull",
                     user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
                })

    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}


//logout user
const logoutUser = (req, res) => {

   res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});

    res.json({
        message: "Logged Out",
    });

};


module.exports={registerUser,loginUser,logoutUser}