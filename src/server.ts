import * as dotenv from "dotenv";
dotenv.config();

import { config } from "./config";
import * as express from "express";
import { router } from "./routes";
import { connectDb } from "./db";
import * as path from "path";

const app = express();

connectDb().then(() => {
    app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

    app.use("/v1/images", express.static(path.join(__dirname, "..", ".", "assets")));

    app.use("/v1", router);
    
    app.listen(config.NODE_ENV, () => {
        console.log("App listening at: ", config.NODE_ENV);
    });
}).catch(err => {
    console.log("Unable to connect to database: ", JSON.stringify(err, null, 2));
});

