import jwt from "jsonwebtoken"
export const verifiedToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next({ status: 401, message: "you are not authenticated" });
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return  next({ status: 403, message: "token not valid" })
            
            //assigning this jwt obj to request and user 
            //so we can use this jwt token in any api request 
        req.user=user;
        next();
    });
}