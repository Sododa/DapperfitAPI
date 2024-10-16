import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isloggedin = (req, res, next) => {
    // getting token from header
    const token = getTokenFromHeader(req);
    // verify the token
    const decodedUser = verifyToken(token);
    // save the user into the request object
    // if token expired
    if(!decodedUser){
        throw new Error('Token expired! Please log in again')
    }else{
    // save the user into the request object
    }
    req.userAuthId = decodedUser?.id;
    next()
};