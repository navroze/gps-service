import { GpsServiceClient } from './proto/generated/gps/GpsService';
import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from './proto/generated/gps';
import { config } from './config/config';
import { GpsCoordinates } from './proto/generated/gps/GpsCoordinates';
import { GpsResponse } from './proto/generated/gps/GpsResponse';
import log from './setup/Log';

const PORT = config.server.port;
const PROTO_FILE = config.server.protoPath;

export class Client {
    client: GpsServiceClient;
    constructor() {
        //Load the gps Proto package
        const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
        const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
        const gpsPackage = grpcObj.gps;

        //If package is not present throw error
        if (!gpsPackage)
            throw new Error('Could not load proto gpsPackage');

        this.client = new gpsPackage.GpsService(
            `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
        )
    }

    async sendRequest(request: GpsCoordinates): Promise<GpsResponse | undefined> {
        return new Promise((resolve, reject) => {
            this.client.CreateGpsRecord(request, (err, result) => {
                if (err) {
                    log.error(`Error while creating record ${err}`);
                    return reject(err);
                }
                return resolve(result);
            })
        });
    }
}
