import { UserModel } from "#model";
import { ClientError, globalError } from "#utils/error.js"
import { tokenConfiguration } from "#utils/jwt.js";

const { verifyToken } = tokenConfiguration ;

export const checkToken = async (req, res, next) => {
    try{
        const token = req.headers?.authorization;
        if(!token) throw new ClientError(401, "Unauthorized !")
        const parseToken = verifyToken(token);
        const user = await UserModel.findOne({where: {user_id: parseToken.user.user_id, username: parseToken.user.username}});
        const parse = req.parse(user);
        if(!(req.headers["user-agent"] == parseToken.userAgent)) throw new ClientError(401, "Unauthorized or token invalid !");
        req.user = parse ;
        return next();
    }catch(error){
        return globalError(res, error);
    }
}