# NODE VERSION

- 14.17.1

## INSTALLATION

- npm install -g ts-node
- npm install

## Check Lintings

- npm run lint

## Env configuration

- NODE_PORT= < Node Port >
- JWT_SECRET_KEY= < Jwt secret key >
- DB_HOST= < Database host >
- DB_PORT= < Database port >
- DB_USERNAME= < Database username >
- DB_PASSWORD= < Database password >
- DATABASE_NAME= < Database name >

## STEPS TO FOLLOW

- Update .env file with your database configuration
- npm run start (Start the server) OR npm run dev (Start server with nodemon)

## DATABASE DUMP

- Restore database dump from the db_dump file store in ./dumps/postgresSQL folder.

## POSTMAN DUMP

- Import postman dump from the postman_collection.json file from ./dumps/postman folder.
