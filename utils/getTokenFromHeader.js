export const getTokenFromHeader = (req) => {
     // get token from the header
     const token = req?.headers?.authorization.split(" ")[1];
     // check if there is no token or there is
     if(token === undefined){
        return "No token found in the header"
     }else{
        return token;
     };
}