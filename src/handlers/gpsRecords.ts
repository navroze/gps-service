import { Request, Response } from 'express';

import log from '../setup/Log';
import { getErrorMessage } from '../utils/error';
import { Client } from '../client';
import { IGps } from '../models/gps';
import { GpsResponse } from '../proto/generated/gps/GpsResponse';

export const createGpsRecordHandler = async (req: Request, res: Response) => {
    try {
        const gpsRecord: IGps = req.body;
        const client = new Client();
        const response = await client.sendRequest(gpsRecord) as GpsResponse;
        res.status(201).json(response);
    } catch (error) {
        log.error(getErrorMessage(error));
        res.status(500).json({ error: true, message: 'Something went wrong' });
    }
};
