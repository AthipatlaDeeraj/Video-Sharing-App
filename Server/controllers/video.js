import Video from "../models/Video.js"
import User from "../models/User.js";


//req.user.id you will get from that verfication token generated
//req.param.id is from the user entered url id of video/user anything

//ASYNC AWAIT AND TRY-CATCH IS COMMON IN ALL

export const addVideo=async (req,res,next)=>{
    const newVideo=new Video({userId:req.user.id,...req.body});
    try{
        const savedVideo=await newVideo.save();
        res.status(200).json(savedVideo);
    }catch(err){next(err);}
}


export const updateVideo=async (req,res,next)=>{
    try{
        const vid=await Video.findById(req.params.id);
        if(!vid) return next({status:404,message:"video not found"});
        if(vid.userId===req.user.id){
            const updatedVid=await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
        }else{return next({status:403,message:"you can update only your video"});}
        res.status(200).json(updatedVid);
    }catch(err){next(err);}
}



export const deleteVideo=async (req,res,next)=>{
    try{
        const vid=await Video.findById(req.params.id);
        if(!vid) return next({status:404,message:"video not found"});
        if(vid.userId===req.user.id){
            await Video.findByIdAndDelete(req.params.id);
        }else{return next({status:403,message:"you can delete only your video"});}
        res.status(200).json("deleted");
    }catch(err){next(err);}
}

export const getVideo=async (req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        res.status(200).json(video);
    }catch(err){next(err);}
}

export const addviews=async (req,res,next)=>{
    try{
        const video=await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("views increased");
    }catch(err){next(err);}
}

export const trendVideos=async (req,res,next)=>{
    try{
        const videos=await Video.find().sort({views:-1});
        res.status(200).json(videos);
    }catch(err){next(err);}
}

export const randomVideos=async (req,res,next)=>{
    try{
        const video = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(video);
    }catch(err){next(err);}
}

//get all the ids of subscribedVideos then use them to randomly show from them 
export const subscribedVideos=async (req,res,next)=>{
    try{
        //to user req.user.id we need to pass that verifyToken to get that user name else not 
        console.log(req.user);
        const user=await User.findById(req.user.id);
        const subscribedChannels=user.subscribedUsers;
        
        const list=await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId:channelId});
            })
        )
        res.status(200).json(list.flat());
    }catch(err){next(err);}
}

export const getByTag=async (req,res,next)=>{
    const query=req.query.tags.split(",");
    try{
        const videos = await Video.find({ tags: { $in: query } }).limit(20);
        res.status(200).json(videos);
    }catch(err){next(err);}
}

export const search=async (req,res,next)=>{
    const query=req.query.q;
    try{
        const videos=await Video.find({title:{$regex:query,$options:"i"}}).limit(40);
        res.status(200).json(videos);
    }catch(err){next(err);}
}

