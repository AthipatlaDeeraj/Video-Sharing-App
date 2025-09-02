//for creating new user mongodb requred so any request to mongodb we use async fn
import mongoose from "mongoose"
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//cannot use pwd directly we should use decrypt bcrypt

 
export const signup=async (req,res,next)=>{
    try{
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        
        const newUser=new User({...req.body,password:hash});
        await newUser.save();
        res.status(200).send("user successfully signed in");
    }catch(err){
        //what if same usename then error to be shown so explicitly write that inside index.js
        next(err);
    }
}

export const signin=async (req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name});
        if (!user) return next({ status: 404, message: "User not found" });
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).send("Wrong password");
        
        const token=jwt.sign({id:user._id},process.env.JWT);

        const {password,...others}=user._doc;

        res.cookie("access_key",token,{
            httpOnly:true
        }).status(200).json(others);
    }catch(err){
        //what if same usename then error to be shown so explicitly write that inside index.js
        next(err);
    }
}

export const googleAuth=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            //assign this as a new user else also you need token so no need auth?
            const token=jwt.sign({id:user._id},process.env.JWT);
            const {...others}=user._doc;

            res.cookie("access_key",token,{
                httpOnly:true
            }).status(200).json(user._doc);
        }
        else{
            const newUser=new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser=newUser.save();
            const token=jwt.sign({id:savedUser._id},process.env.JWT);
            const {...others}=user._doc;

            res.cookie("access_key",token,{
                httpOnly:true
            }).status(200).json(savedUser._doc);
        }
    }catch(err){
        next(err);
    }
}