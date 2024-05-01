import jwt from "jsonwebtoken";
import CreateError from "./error.js";

export const verifyToken = (req, res, next) => {
  try{
    const token = req.cookies.access_token;
    if (!token) {
      throw new CreateError(401, "you are not authorized");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
        console.log(err);
        throw new CreateError(403, "Invalid Token");
        }
        req.user = user;
        next();
    });
  }catch(err){
    next(err);
  }
};


