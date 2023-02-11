import express from 'express';
import bodyParser from 'body-parser';

import { config } from '../config/config';
import log from '../setup/Log';
import { createGpsRecordHandler } from '../handlers/gpsRecords';
import { login, register } from '../handlers/user';
import { auth } from '../middleware/auth';
import { userValidator } from '../middleware/request-middleware';

const app = express();
const port = config.expressServer.port;
app.use(bodyParser.json());

// Health check route
app.get('/api/healthcheck', (req, res) => {
    res.send({ message: 'Server is up and running' });
});

//User routes
app.post('/api/login', userValidator, login);
app.post('/api/register', userValidator, register);

// GPS Routes
app.post('/api/gps-record', auth, createGpsRecordHandler);

app.all('*', function (req, res) {
    res.status(404).json({
        message: `Error invalid API endpoint.`
    });
});

// Start the server
export const startExpressServer = (): Promise<void> => {
    return new Promise((resolve) => {
        app.listen(config.expressServer.port, () => {
            log.info(`Express server listening on port ${port}`);
            return resolve();
        }).on('error', error => {
            log.error(`Error starting express server ${error}`);
        });
    });
}


export default app;
