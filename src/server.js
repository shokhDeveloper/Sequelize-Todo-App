import express from "express";
import cors from "cors";
import { serverConfiguration } from "#config";
import { authRouter } from "./router/authRouter.js";
import { model } from "#middlewares/model.js";
import { todoRouter } from "./router/todoRouter.js";
import { checkToken } from "#middlewares/checkToken.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(model)
const {PORT, host} = serverConfiguration;

app.use("/auth", authRouter);

// Check token
app.use(checkToken)

app.use("/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`Beckend server is running http://${host}:${PORT}`)
});