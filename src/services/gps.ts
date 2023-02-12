import { Gps, IGps } from '../models/gps';
import log from '../setup/Log';

const gpsService = {
    createRecord: async (record: IGps): Promise<string> => {
        try {
            const gps = new Gps({
                latitude: record.latitude,
                longitude: record.longitude,
                email: record.email
            });
            console.log("Saving in ", Gps.db.name);
            const savedRecord = await gps.save();
            log.info(`Record for ${record.email} saved successfully`);
            return savedRecord["_id"];
        } catch (error) {
            throw error;
        }
    }
};

export default gpsService;