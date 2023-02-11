import { Request, Response } from 'express';
import log from '../setup/Log';
import { Client } from '../client';
import { GpsResponse } from '../proto/generated/gps/GpsResponse';
import { z, ZodError } from 'zod'

const gpsSchema = z.object({
    latitude: z.string(),
    longitude: z.string(),
    email: z.string().email(),
}).refine(data => {
    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);
    if (!(latitude >= -90 && latitude <= 90) || !(longitude >= -180 && longitude <= 180))
        return false;
    return true;
}, { message: "Invalid co-ordinates" });

export const createGpsRecordHandler = async (req: Request, res: Response) => {
    try {
        const gpsRecord = req.body;
        gpsSchema.parse(gpsRecord);
        const client = new Client();
        const response = await client.sendRequest(gpsRecord) as GpsResponse;
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(422).json(error.errors);
        }
        log.error(error);
        res.status(500).json({ error: true, message: "Something went wrong" });
    }
};
