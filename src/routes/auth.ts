import * as express from "express";
import { login, register } from "../controller/auth";

export const authRoute = express.Router();

authRoute.post("/register", register);

authRoute.post("/login", login);