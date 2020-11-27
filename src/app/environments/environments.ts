// Import module
import dotnev from "dotenv";
dotnev.config();

export const environments = {
    PORT: process.env.PORT,
    DATABASE_URI: process.env.DATABASE_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URI: process.env.GOOGLE_CALLBACK_URI
};
