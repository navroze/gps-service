import { Gps, IGps } from '../models/gps';
import { UserModel } from '../models/user';
import log from '../setup/Log';

const gpsService = {
    createRecord: async (record: IGps) => {
        try {
            const user = await UserModel.findOne({ email: record.email });
            if (!user) {
                throw new Error(`User with email-id ${record.email} is not registered`);
            }

            const gps = new Gps({
                latitude: record.latitude,
                longitude: record.longitude,
                email: record.email
            });
            const savedRecord = await gps.save();
            log.info(`Record for ${record.email} saved successfully`);

            return savedRecord["_id"];
        } catch (error) {
            throw error;
        }
    }
};

export default gpsService;