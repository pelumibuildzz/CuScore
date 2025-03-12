const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = ['PORT', 'MONGO_URL', 'SECRET_KEY'];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Error: Missing required environment variable ${key}`);
        process.exit(1);
    }
});

const config = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
};

module.exports = { config };