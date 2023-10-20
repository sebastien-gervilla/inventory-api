// Default imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { nodeEnv } from './config/environment';
import { initializeDatabaseConnection } from './config/database';

// Router imports
import { EquipmentRouter } from './routes';

// Application setup
dotenv.config();
const app = express();
const port = process.env.PORT;

// Database Connection
initializeDatabaseConnection();

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://vps-cdfcffd0.vps.ovh.net"
    ],
    credentials: true
}));

// Routes
app.use('/equipment', EquipmentRouter);

// Running server
if (nodeEnv !== 'test')
    app.listen(port, () => {
        console.log("========================================================");
        console.log(`\x1b[33m⚡️ Server is running at http://localhost:${port}\x1b[0m`);
    });

export { app };