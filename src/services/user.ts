import { DocumentDefinition } from 'mongoose';
import { UserModel, I_UserDocument } from '../models/user';
import { userResponse } from '../types/types';
import log from '../setup/Log';
import { config } from '../config/config';
import { loggerErrorMessage } from '../utils/error';
import jwt from 'jsonwebtoken';
import { Ok, Err, Result } from "ts-results";
import bcrypt from 'bcrypt';


const SECRET_KEY = config.expressServer.jwtSecret;
export async function registerOne(user: DocumentDefinition<I_UserDocument>): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        // if (error instanceof MongoErro`r) {
        //     log.error(error);
        // }
        throw error;
    }
}

export async function loginOne(user: DocumentDefinition<I_UserDocument>):
    Promise<Result<userResponse, Error>> {
    try {
        const foundUser = await UserModel.findOne({ email: user.email });

        if (!foundUser) {
            const errorMessage = 'EMAIL_NOT_FOUND';
            log.error(loggerErrorMessage(errorMessage));
            return new Err(new Error(errorMessage));
        }

        const isMatch = bcrypt.compareSync(user.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.email }, SECRET_KEY, {
                expiresIn: '2 days',
            });

            return new Ok({ email: user.email, token: token });
        } else {
            const errorMessage = 'INVALID_PASSWORD';
            log.error(loggerErrorMessage(errorMessage));
            return new Err(new Error(errorMessage));
        }
    } catch (error) {
        throw error;
    }
}