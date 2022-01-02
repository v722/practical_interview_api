import * as express from "express";
import { authRoute } from "./auth";
import { userRoute } from "./user";

export const router = express.Router();

router.use("/auth", authRoute);

router.use("/user", userRoute);