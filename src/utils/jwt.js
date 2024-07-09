import jwt from "jsonwebtoken";
const {sign, verify} = jwt
export const tokenConfiguration = {
    createToken: function(val){
        if(!val) throw new Error("Create token ERROR !"); 
        return sign(val, process.env.SECRET_KEY, {expiresIn: "20d"});
    },
    verifyToken: function(token){
        if(!token) throw new Error("Verify token ERROR !");
        return verify(token, process.env.SECRET_KEY)
    }   
}