import mongoose from 'mongoose';

export interface IGps {
    latitude: string;
    longitude: string;
    email: string;
}

export interface IGpsModel extends IGps, mongoose.Document { }

export const GpsSchema = new mongoose.Schema<IGpsModel>({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true
});

export const Gps = mongoose.model<IGpsModel>('Gps', GpsSchema);
