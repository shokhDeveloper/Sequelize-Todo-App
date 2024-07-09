import express from "express";
import { AuthController } from "#controller/authController.js";
export const authRouter = express.Router();
const controller = new AuthController()
authRouter.route("/register").post(controller.REGISTER);
authRouter.route("/login").post(controller.LOGIN);