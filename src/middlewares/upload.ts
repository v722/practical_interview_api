import * as multer from "multer";
import { IUser } from "../controller/user";
import * as path from "path";
import * as fs from "fs";

/**
 * Middleware for Image upload 
 */ 
export const image = multer({
    storage: multer.diskStorage({ 
        destination: function (req, file, cb) {
            const destination = path.join(__dirname, "..", "..", ".", "assets");
            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination);
            }
            cb(null, destination);
        },
        filename: function(req: IUser, file, cb) {
            const fileExtension = file.originalname.replace(/^.*\./, "");
            const fileName = `user-${req.user?.id}-${Date.now()}.${fileExtension}`;
            cb(null, fileName);
        }
    })
});