import { DocumentDefinition } from 'mongoose';
import { UserModel, I_UserDocument } from '../models/user';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const SECRET_KEY = config.expressServer.jwtSecret;
export async function registerOne(user: DocumentDefinition<I_UserDocument>): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function loginOne(user: DocumentDefinition<I_UserDocument>) {
    try {
        const foundUser = await UserModel.findOne({ email: user.email });

        if (!foundUser) {
            throw new Error('Email not registered');
        }

        const isMatch = bcrypt.compareSync(user.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.email }, SECRET_KEY, {
                expiresIn: '2 days',
            });

            return { email: user.email, token: token };
        } else {
            throw new Error('Invalid Password');
        }
    } catch (error) {
        throw error;
    }
}
