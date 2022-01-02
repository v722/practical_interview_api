import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../entities/userEntity";

class AuthService {
    public async generateAuthToken(payload: Partial<User>) {
        try {
            const token = jwt.sign(payload, config.JWT_SECRET_KEY, { 
                expiresIn: "30 minutes"
            });
            return { token };
        } catch (error) {
            throw error;
        }
    }
}

export const authService = new AuthService();