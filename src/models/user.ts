import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 8

export interface I_UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

export const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);