import { UserModel } from "#model";
import { ClientError, globalError, ServerError } from "#utils/error.js";
import { tokenConfiguration } from "#utils/jwt.js";
import { userValidator } from "#utils/validator.js"
import { Op, Sequelize } from "sequelize";

const { createToken } = tokenConfiguration

export class AuthController {
    constructor(){
        this.REGISTER = async function(req, res){
            try{
                const newUser = req.body;
                if(userValidator.validate(newUser).error instanceof Error) throw new ClientError(400, userValidator.validate(newUser).error.message);
                let user = await UserModel.findAll({where: {username: newUser.username}});
                const response = req.parse(user);
                if(response.length) throw new ClientError(400, "The user already exists");
                const insert = await UserModel.create({username: newUser.username, password: Sequelize.fn("crypt", newUser.password, Sequelize.fn('gen_salt', 'bf'))}, {returning: true});
                if(!insert.user_id) throw new ServerError("The new user could not be written to the database !");
                return res.status(201).json({message: "User successfully registred !", statusCode: 201, accessToken: createToken({user: insert, userAgent: req.headers["user-agent"]})});
            }catch(error){
                return globalError(res, error);
            }        
        },
        this.LOGIN = async function(req, res){
            try{
                const user = req.body;
                if(userValidator.validate(user).error instanceof Error) throw new ClientError(400, userValidator.validate(user).error.message);
                const check = await UserModel.findAll({where: {username: user.username,  [Op    .and]: Sequelize.literal(`password = crypt('${user.password}', password)`)}});
                if(!check.length) throw new ClientError(404, "User not found")
                return res.status(200).json({message: "User successfully logined", status: 200, accessToken: createToken({user: check[0], userAgent: req.headers["user-agent"]})})
            }catch(error){
                return globalError(res, error);
            };
        };
    };
};