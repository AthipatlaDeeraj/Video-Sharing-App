import express from "express";
import { verifiedToken } from "../verifyToken.js";
import { getcomment,addcomment,deleteComment } from "../controllers/comment.js";

const router=express.Router();
//now i can write any route here using along with the controller function
router.get("/:videoId",getcomment);
router.post("/",verifiedToken,addcomment);
router.delete("/:id",verifiedToken,deleteComment);


export default router;