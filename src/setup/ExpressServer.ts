import express from 'express';
import bodyParser from 'body-parser';

import { config } from '../config/config';
import log from '../setup/Log';
import ApiRouter from '../routes/Api';

const app = express();
const port = config.expressServer.port;
app.use(bodyParser.json());

app.use('/api', ApiRouter);

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
};

export default app;
