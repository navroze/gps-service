import mongoose from 'mongoose';

export interface IGps {
    latitude: string;
    longitude: string;
    email: string
}

// Create the model schema & register your custom methods here
export interface IGpsModel extends IGps, mongoose.Document { }

// Define the User Schema
export const GpsSchema = new mongoose.Schema<IGpsModel>({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true
});


export const Gps = mongoose.model<IGpsModel>('Gps', GpsSchema);

