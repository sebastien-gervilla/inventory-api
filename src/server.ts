// Config
import './config/aliases';

// Default imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getEnv } from './config/environment';
import { initializeDatabaseConnection } from './config/database';
import { Server } from './types/server.types';

// Router imports
import { EquipmentRouter } from './routes';

export const initializeServer = async () => {
    console.log("===================================================");
    const { nodeEnv, port } = getEnv();

    // Database Connection
    await initializeDatabaseConnection();

    // Server setup
    const app = express();

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
    let server: Server | null = null;
    if (nodeEnv !== 'test')
        server = app.listen(port, () => {
            console.log(`\x1b[33m⚡️ Server is running at http://localhost:${port}\x1b[0m`);
        });

    return {
        app,
        server
    }
}

initializeServer()