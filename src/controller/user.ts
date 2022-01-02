import { Request, Response } from "express";
import { body } from "express-validator";
import { getConnection } from "typeorm";
import { AppError, ErrorCode } from "../constants/appCode";
import { User } from "../entities/userEntity";
import { checkValidationResult } from "../middlewares/validationChecker";
import { formatErrorMessage, formatSuccessMessage } from "../common/handleResponse";

export interface IUser extends Request {
    user: {
        id: string;
    }
}

/**
 * Update User Info 
 */ 
export const updateUser = [
    body("first_name").optional().isString(),
    body("last_name").optional().isString(),
    body("email").optional().isEmail(),
    checkValidationResult,
    async (req: IUser, res: Response) => {
        const { id } = req.user;
        const { first_name, last_name, email } = req.body;
        try {
            console.log("updateUser: started");
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ id });
            if (!user) {
                throw {
                    msg: AppError.UserNotFound,
                    status: ErrorCode.NotFound
                };
            }
            await userRepository.update({ id }, {
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                email: email || user.email
            });
            console.log("updateUser: success");
            return res.status(200).json(formatSuccessMessage());
        } catch (error) {
            console.log("updateUser: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

/**
 * Update User Profile 
 */ 
export const updateProfile = [
    async (req: IUser, res: Response) => {
        try {
            console.log("updateProfile: started");
            if (!req.file) {
                throw { 
                    msg: AppError.MissingFileInput,
                    status: ErrorCode.BadRequest   
                };
            }
            const { id } = req.user;
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ id });
            if (!user) {
                throw {
                    msg: AppError.UserNotFound,
                    status: ErrorCode.NotFound
                };
            }
            await userRepository.update({ id }, { profile_image: req.file.filename });
            console.log("updateProfile: success");
            return res.status(200).json(formatSuccessMessage());
        } catch (error) {
            console.log("updateProfile: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

/**
 * Get User 
 */ 
export const getUser = [
    async (req: IUser, res: Response) => {
        const { id } = req.user;
        try {
            console.log("getUser: started");
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ id });
            if (!user) {
                throw {
                    msg: AppError.UserNotFound,
                    status: ErrorCode.NotFound
                };
            }
            console.log("getUser: success");
            return res.status(200).json(formatSuccessMessage(user));
        } catch (error) {
            console.log("getUser: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

/**
 * Change Password
 */ 
 export const changePassword = [
    body("new_password").exists().isString().isLength({ min: 7 }),
    body("old_password").exists().isString().isLength({ min: 7 }),
    checkValidationResult,
    async (req: IUser, res: Response) => {
        const { id } = req.user;
        const { old_password, new_password } = req.body;
        try {
            console.log("changePassword: started");
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ id });
            if (!user) {
                throw {
                    msg: AppError.UserNotFound,
                    status: ErrorCode.NotFound
                };
            }
            const isPasswordMatch = await user.comparePassword(old_password);
            if (!isPasswordMatch) {
                throw {
                    msg: AppError.OldPasswordNotMatched,
                    status: ErrorCode.Unauthorized
                };
            }
            const password = await User.hashPassword(new_password);
            await userRepository.update({ id }, { password });
            console.log("changePassword: success");
            return res.status(200).json(formatSuccessMessage(user));
        } catch (error) {
            console.log("changePassword: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];