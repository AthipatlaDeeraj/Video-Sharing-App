import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    
},{timestamps:true})
export default mongoose .model("Comment",CommentSchema);

//{ timestamps: true }
//This option automatically adds two fields: createdAt and updatedAt

/*The first parameter "Comment" is the name of the MongoDB collection (it will automatically be converted to "comments" in MongoDB).

You export the model so it can be used in your controllers or elsewhere in the app:

js
Copy
Edit
import Comment from './models/Comment.js';
*/


/*
💡 Where You'll Use This
In your API routes or controllers when:

Creating a comment

Fetching all comments for a video

Deleting a comment by userId

Example (controller logic):

js
Copy
Edit
const comments = await Comment.find({ videoId: req.params.id });
*/

