import Comment from "../models/Comment.js";

export const getcomment=async (req,res,next)=>{
    const comments=await Comment.find({ videoId: req.params.videoId });
    try{
        if(!comments) return res.json({status:(404),message:"no comments found"});
        res.status(200).json(comments);
    }catch(err){next(err);}
};

export const addcomment=async (req,res,next)=>{
    //i got video id as input
    try{
        const newcomment=new Comment({...req.body,userId:req.user.id});
        const savecomment=await newcomment.save();
        res.status(200).json(savecomment);
    }catch(err){next(err)};
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).send("Comment deleted");
    } else {
      return res.status(403).json({ message: "You are not allowed to delete this comment" });
    }
  } catch (err) {
    next(err);
  }
};
