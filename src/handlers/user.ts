import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import { registerOne, loginOne } from '../services/user';

export const login = async (req: Request, res: Response) => {
    try {
        const foundUser = await loginOne(req.body);
        res.status(200).json(foundUser);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        await registerOne(req.body);
        res.status(201).json({ status: true, message: "User created" });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};