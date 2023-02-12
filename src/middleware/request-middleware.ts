import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { UserModel } from '../models/user';
import { getErrorMessage } from '../utils/error';
import log from '../setup/Log';


//Route /login /regsiter request body schema
export const userSchema = z.object({
    password: z.string().min(6),
    email: z.string().email(),
});


// Route /gps-record request body schema
export const gpsSchema = z.object({
    latitude: z.string().refine((latitude) => parseFloat(latitude) >= -90 && parseFloat(latitude) <= 90, {
        message: "Invalid latitude.Value should be between -90 and 90"
    }),
    longitude: z.string().refine((longitude) => (parseFloat(longitude) >= -180 && parseFloat(longitude) <= 180), {
        message: "Invalid longitude.Value should be between -180 and 180"
    }),
    email: z.string().email().refine(async (email) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return false;
        }
        return true;
    }, { message: `Email not registered` }),
});


export const requestValidator = (async: boolean, schema: z.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            async === true ? await schema.parseAsync(req.body) : schema.parse(req.body);
            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return res.status(422).json(error.errors);
            }
            log.error(getErrorMessage(error));
        }
    }
}
