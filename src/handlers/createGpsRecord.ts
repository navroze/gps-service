import log from '../setup/Log';
import gpsService from '../services/gps';

export const createGpsRecord = async (req: any, res: any) => {
    try {
        const recordId = await gpsService.createRecord(req.request);
        log.info(`Gps record stored successfully ${recordId}`);
        res(null, { status: true, recordId: recordId })
    } catch (error) {
        res(error);
    }
}