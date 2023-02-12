import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 8;

export interface I_UserDocument {
    email: string;
    password: string;
}

export interface I_UserModel extends I_UserDocument, mongoose.Document { }

export const UserSchema = new mongoose.Schema<I_UserModel>({
    email: { type: String, unique: true },
    password: { type: String }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

export const UserModel = mongoose.model<I_UserModel>('User', UserSchema);
