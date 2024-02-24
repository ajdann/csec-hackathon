import cors from "cors";

const allowedOrigins = ['http://localhost:3001'];

export const options: cors.CorsOptions = {
    origin: allowedOrigins
};