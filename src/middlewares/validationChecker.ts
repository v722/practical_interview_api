import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Check Validation function 
 */ 
export function checkValidationResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
}