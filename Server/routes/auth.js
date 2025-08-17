import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";
const router=express.Router();
//now i can write any route here using along with the controller function


//CREATE AN ACCOUNT 
router.post("/signup",signup);

//SIGN IN
router.post("/signin",signin);

// //GOOGLE AUTH
router.post("/google",googleAuth);

export default router;