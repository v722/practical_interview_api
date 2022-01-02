import * as express from "express";
import { changePassword, getUser, updateProfile, updateUser } from "../controller/user";
import { authorizeAll } from "../middlewares/authorization";
import { image } from "../middlewares/upload";

export const userRoute = express.Router();

userRoute.patch("/", authorizeAll(), updateUser);

userRoute.post("/profile/image", authorizeAll(), image.single("image"), updateProfile);

userRoute.get("/", authorizeAll(), getUser);

userRoute.post("/change/password", authorizeAll(), changePassword);