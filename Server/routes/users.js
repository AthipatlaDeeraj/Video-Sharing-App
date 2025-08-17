import express from "express";
import {update,deleteUser,get,subscibe,unsubscribe,like,dislike} from "../controllers/user.js";
import { verifiedToken } from "../verifyToken.js";
const router=express.Router();
//now i can write any route here using along with the controller function


//update user
//every time when this is called it call the verifiedToken and check token then update fn called if correct then next() fn called;
router.put("/:id",verifiedToken,update);

//delete user
router.delete("/:id",verifiedToken,deleteUser);
//get a user
router.get("/find/:id",get);

//subscibe a user
router.post("/sub/:id",verifiedToken,subscibe);

//unsubscribe a user
router.post("/unsub/:id",verifiedToken,unsubscribe);
//like a video
router.put("/like/:videoId",verifiedToken,like);
//dislike a video
router.put("/dislike/:videoId",verifiedToken,dislike);

export default router;