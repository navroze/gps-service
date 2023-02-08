import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

import { ProtoGrpcType } from './proto/generated/gps';
import log from './setup/Log';
import { GpsServiceClient } from 'proto/generated/gps/GpsService';

const PORT = 4040;
const PROTO_FILE = './proto/gps.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const gpsPackage = grpcObj.gps;


export class Client {
    client;
    constructor() {
        this.client = new gpsPackage.GpsService(
            `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
        )
    }

    async startClient(): Promise<void> {
        const deadline = new Date()
        deadline.setSeconds(deadline.getSeconds() + 5)
        return new Promise((resolve, reject) => {
            this.client.waitForReady(deadline, async (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    }
    async sendRequest(): Promise<object | undefined> {
        return new Promise((resolve, reject) => {
            const request = {
                latitude: "-25.35307",
                logituge: "133.84987",
                email: "abc@gmail.com"
            };
            const metadata = new grpc.Metadata();
            metadata.add('authorization', 'yolo')
            this.client.CreateGpsRecord(request, metadata, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log("success");
                return resolve(result);
            })
        });
    }
}



