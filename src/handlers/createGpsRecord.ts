import log from '../setup/Log';

export const createGpsRecord = (req: any, res: any) => {
    const metaData = req.metadata.get("authorization");
    log.info(`Metdata ${metaData}`);
    log.info(`Request ${JSON.stringify(req.request)}`);
    res(null, { status: true, message: "Pong", sparta: "yolo" })
}