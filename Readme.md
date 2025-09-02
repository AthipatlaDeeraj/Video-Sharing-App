//now usually what ever you want to download through npm you keep it inside package.json then you use npm install so that all at once installs

-> now my website frontend is communicating with backend using http calls purely and using react 
BUT HOW ??

-> Also every time it is authorizing everytime you try to modify something like put/post/delete so using verifyToken.js it checks 
BUT HOW DOES IT STORE HOW IT COMMUNICATES OR GET ACCESSS EVERYTIME
->I think it is storing the uid,name Also 3 parameters it stores in order to check again and again not just using npm module is answer

***FOR GOOGLE AUTH***
-> Now in google auth google when authenticated is going to create cookies-tokens and gives it to backend 
(Google returns an ID token (JWT))
SO BACKEND SHOULD TAKE THAT INFO LIKE Verify token with Google’s public keys, Extract user info (name, email, picture).

Issue your own session token (JWT or cookie).

Send that token to frontend.

Save it in : HttpOnly cookie

***So using firebase i got all the user google data whatever is there see using console.log(result)***