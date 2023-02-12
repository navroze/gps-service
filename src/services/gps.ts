import { Gps, IGps } from '../models/gps';
import log from '../setup/Log';

const gpsService = {
    createRecord: async (record: IGps): Promise<string> => {
        const { latitude, longitude, email } = record;
        const gps = new Gps({
            latitude,
            longitude,
            email
        });
        const savedRecord = await gps.save();
        log.info(`Record for ${record.email} saved successfully`);
        return savedRecord['_id'];
    }
};

export default gpsService;
