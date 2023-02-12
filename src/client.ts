import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from './proto/generated/gps';
import log from './setup/Log';

const PORT = 4040;
const PROTO_FILE = './proto/gps.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const gpsPackage = grpcObj.gps;

export type gpsRequest = {
    latitude: string | undefined,
    longitude: string
    email: string
}

export class Client {
    client;
    constructor() {
        this.client = new gpsPackage.GpsService(
            `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
        )
    }

    async sendRequest(request: gpsRequest): Promise<object | undefined> {
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
