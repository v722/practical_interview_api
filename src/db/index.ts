
import { createConnection } from "typeorm";
import { config } from "../config";

export const connectDb = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: config.DB.HOST,
            port: config.DB.PORT,
            username: config.DB.USERNAME,
            password: config.DB.PASSWORD,
            database: config.DB.DATABASE_NAME,
            entities: [
                "src/entities/**/*.ts"
            ],
            synchronize: true,
            logging: false
        });
        return connection;
    } catch (error) {
        throw error;
    }
};
