const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const auth = require('../middleware/auth')
const bcrypt = require("bcrypt");

const User = require('../Models/Users');
const OAuthAccount  = require('../Models/oAuth')

const client = new OAuth2Client(process.env.Google_Client_Id);

Router.get("/google/callback" , async(req , res)=>{
    console.log('hit ')
    try {
        const {credential , role} = req.query;
        if(!credential){
            return res.status(400).json({error:"missing credential"})
        }
        
        
        const ticket  = await client.verifyIdToken({
          idToken :   credential ,
          audience : process.env.Google_Client_Id
        });

        const payload = ticket.getPayload();
        const googleSub = payload.sub;
        const email = payload.email;
        const name = payload.name;


        let account  = await OAuthAccount.findOne({
            provider : "google" ,
            providerUserId : googleSub
        });

        let user;
        if(account){
            user = await User.findById(account.userId);
            if(!user) throw new Error('user Missing');
        }else{
            if(!role){
                return res.status(400).json({
                    error : "role is missing"
                })
            }

             user = await User.create({
                name , email , role
             });
             
             await OAuthAccount.create({
                userId : user._id,
                provider : "google",
                providerUserId : googleSub

             })}

             let token = jwt.sign({
                userId : user._id , role: user.role
             }, process.env.Secret,{
                expiresIn : '7d'
             });

             res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                        });
             console.log('res send');
             
             res.status(200).json({               
                status : "sucess"
             }) 
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Authentication failed" });
    }
})

Router.post('/logout',auth , (req,res)=>{
    console.log("logout  route hit")
    res.clearCookie("token", {
            httpOnly: true,
             secure: true,
            sameSite: "none",
            path: "/"
})

    res.status(200).json({sucess : "sucess"})
})



Router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.Secret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});


Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
     
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.Secret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});



module.exports = Router;