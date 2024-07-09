import dotenv from "dotenv"
import path from "node:path";
dotenv.config({path: path.join(process.cwd(), "src", ".env")})
export const serverConfiguration = {
    PORT: process.env.PORT || 3000,
    host: process.env.HOST
}
