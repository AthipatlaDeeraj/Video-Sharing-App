import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";
const router=express.Router();
//now i can write any route here using along with the controller function


//CREATE AN ACCOUNT 
router.post("/signup",signup);

//so basically this receives the data from frontend using axios which is used to send or recieve data(in JSON format) using http calls
//the thing is url must be matched so that data can be received here easily

//syntax for axios is axios.post("url",{data});

//SIGN IN
router.post("/signin",signin);

// //GOOGLE AUTH
router.post("/google",googleAuth);

export default router;