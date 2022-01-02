import { Request, Response } from "express";
import { body } from "express-validator";
import { getConnection } from "typeorm";
import { formatSuccessMessage, formatErrorMessage } from '../common/handleResponse';
import { AppError, ErrorCode } from "../constants/appCode";
import { User } from "../entities/userEntity";
import { checkValidationResult } from "../middlewares/validationChecker";
import { authService } from "../services/AuthService";

/**
 * User Register 
 */ 
export const register = [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("email").exists().isEmail(),
    body("password").exists().isString().isLength({ min: 7 }),
    checkValidationResult,
    async (req: Request, res: Response) => {
        const { first_name, last_name, email, password } = req.body;
        try {
            console.log("register: started");
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ email });
            if (user) {
                throw {
                    msg: AppError.UserAlreadyExist,
                    status: ErrorCode.BadRequest
                };
            }
            const userRecord = userRepository.create({
                first_name,
                last_name,
                email,
                password
            });
            const result = await userRepository.save(userRecord);
            console.log("register: success");
            return res.json(formatSuccessMessage(result));
        } catch (error) {
            console.log("register: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json({ error });
        }
    }
];

/**
 * User Login 
 */ 
export const login = [
    body("email").exists().isEmail(),
    body("password").exists().isString(),
    checkValidationResult,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            console.log("login: started");
            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne({ email });
            if (!user) {
                throw {
                    msg: AppError.UserNotFound,
                    status: ErrorCode.NotFound
                };
            }
            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                throw {
                    msg: AppError.Unauthorized,
                    status: ErrorCode.Unauthorized
                };
            }

            const login = await authService.generateAuthToken({ id: user.id, email, password });
            console.log("login: success");
            return res.json(formatSuccessMessage(login));
        } catch (error) {
            console.log("login: failed", JSON.stringify(error));
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];