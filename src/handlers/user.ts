import { Request, Response } from 'express';
import { Result } from 'ts-results';

import { getErrorMessage, getErrorDetails } from '../utils/error';
import { registerOne, loginOne } from '../services/user';
import { userResponse } from '../types/types';

export const login = async (req: Request, res: Response) => {
    try {
        // Result will either be userResponse or Error. Here Error indicates all user defined errors
        const result: Result<userResponse, Error> = await loginOne(req.body);

        if (result.err) {
            const errorDetails = getErrorDetails(result.val.message);
            return res.status(errorDetails.statusCode).json({
                'message': errorDetails.message,
                'errorCode': errorDetails.errorCode
            });
        }
        res.status(200).json(result.val);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        await registerOne(req.body);
        res.status(201).json({ status: true, message: 'User created' });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};
