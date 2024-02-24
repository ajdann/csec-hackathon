import express, { Request, Response } from 'express';

import cors from 'cors';
import * as bodyParser from "body-parser";
import { resolve } from 'path';
import dotenv from 'dotenv';
import { options } from './assets/cors';

//Controllers
import userRoutes from "./controllers/user"
import readingRoutes from "./controllers/reading";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(bodyParser.json());

//Ovo radi, resolve sa pathom je potreban u TS-u
dotenv.config({ path: resolve(__dirname, ".env") });

app.use(cors(options));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/reading", readingRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});