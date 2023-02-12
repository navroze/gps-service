import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { z, ZodError } from 'zod';

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userSchema = z.object({
            password: z.string().min(6),
            email: z.string().email(),
        });
        userSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(422).json(error.errors);
        }
    }
};

export const gpsValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gpsSchema = z.object({
            latitude: z.string().refine((latitude) => parseFloat(latitude) >= -90 && parseFloat(latitude) <= 90, {
                message: "Invalid latitude.Value should be between -90 and 90"
            }),
            longitude: z.string().refine((longitude) => (parseFloat(longitude) >= -180 && parseFloat(longitude) <= 180), {
                message: "Invalid longitude.Value should be between -180 and 180"
            }),
            email: z.string().email().refine(async (val) => {
                const user = await UserModel.findOne({ email: val });
                if (!user) {
                    return false;
                }
                return true;
            }, { message: `User not registered with service` }),
        });
        await gpsSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(422).json(error.errors);
        }
    }
}
