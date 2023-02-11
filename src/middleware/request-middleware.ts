import { Request, Response, NextFunction } from 'express';
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