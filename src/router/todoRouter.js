import { TodoController } from "#controller/todoController.js";
import express from "express";

export const todoRouter = express.Router();
const controller = new TodoController();

todoRouter.route("/").get(controller.GET);
todoRouter.route("/").put(controller.PUT);
todoRouter.route("/").post(controller.POST);
todoRouter.route("/").delete(controller.DELETE);
todoRouter.route("/:todoId").put(controller.PUT);
todoRouter.route("/:todoId").delete(controller.DELETE);