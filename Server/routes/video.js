import express from "express";
import { verifiedToken } from "../verifyToken.js";
import { addVideo,updateVideo,deleteVideo,getVideo,addviews,trendVideos,randomVideos,subscribedVideos,getByTag,search } from "../controllers/video.js";

const router=express.Router();
//now i can write any route here using along with the controller function

//create a video
router.post("/",verifiedToken,addVideo);
router.delete("/:id",verifiedToken,deleteVideo);
router.put("/:id",verifiedToken,updateVideo);
router.get("/find/:id",getVideo); 
router.put("/view/:id",addviews);
router.get("/trend",trendVideos);
router.get("/random",randomVideos);
router.get("/sub",verifiedToken,subscribedVideos);
router.get("/tags",getByTag);
router.get("/search",search);

export default router;