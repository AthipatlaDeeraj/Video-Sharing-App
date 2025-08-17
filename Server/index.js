import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";

import UserRoute from "./routes/users.js";
import CommentRoute from "./routes/comments.js";
import VideoRoute from "./routes/video.js";
import auth from "./routes/auth.js";

dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO)
    .then(() => console.log("Mongo connected"))
    .catch(err => { throw err });
};

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// app.use is used to register middleware in our app (MIDDLEWARE IS ANY FN THAT HAS ACCESS TO REQ,RES,NEXT)
//app.use(path,middleware); path:route prefix to apply middleware like /api
app.use(cookie());
//when you want to read req.boby from the json input from user / frontend
app.use(express.json());

//THEN: API routes this is to register a middleware and needed route prefix to apply 
app.use("/api/auth", auth);
app.use("/api/users", UserRoute);
app.use("/api/videos", VideoRoute);
app.use("/api/comments", CommentRoute);

//THEN: global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Server running on http://localhost:5000");
});