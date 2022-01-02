export const config = {
    NODE_ENV: process.env.NODE_ENV || 3000,
    DB: {
        HOST: process.env.DB_HOST || "localhost",
        PORT: Number(process.env.DB_PORT) || 5432,
        USERNAME: process.env.DB_USERNAME || "postgres",
        PASSWORD: process.env.DB_PASSWORD || "root",
        DATABASE_NAME: process.env.DATABASE_NAME || "postgres"
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};