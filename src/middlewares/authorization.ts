import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../config";

passport.use(
    new Strategy({ secretOrKey: config.JWT_SECRET_KEY, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }, (jwtPayload, done) => {
        const expirationDate = new Date(jwtPayload.exp * 1000);
        if (expirationDate < new Date()) {
            return done(null, false);
        }
        const user = jwtPayload;
        done(null, user);
    })
);

const checkToken = passport.authenticate("jwt", { session: false });

/**
 * Authorize middleware 
 */ 
export const authorizeAll = () => checkToken;