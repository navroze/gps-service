/**
 * All npm modules
 */
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

/**
 * Source code modules
 */
import log from './setup/Log';
import { config } from './config/config';
import { ProtoGrpcType } from './proto/generated/gps';
import { createGpsRecord } from './handlers/createGpsRecord';
import { GpsServiceHandlers } from './proto/generated/gps/GpsService';

/**
* Load and get the proto package in typescript
*/
const packageDef = protoLoader.loadSync(path.resolve(__dirname, config.server.protoPath));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const gpsPackage = grpcObj.gps;


export class Server {
    private server: grpc.Server;
    private port: string;
    constructor() {
        this.server = new grpc.Server();
        this.port = config.server.port.toString();
    }

    addHandlers() {
        this.server.addService(gpsPackage.GpsService.service, {
            CreateGpsRecord: createGpsRecord
        } as GpsServiceHandlers);
    }

    startServer(): Promise<void> {
        return new Promise((resolve) => {
            this.server.bindAsync(`0.0.0.0:${this.port}`,
                grpc.ServerCredentials.createInsecure(),
                (err: Error | null, port: number) => {
                    if (err) {
                        log.error(`Error in starting server ${err}`);
                        process.exit(1);
                    }
                    this.server.start();
                    log.info(`gRPC server has started on port ${port}`);
                    return resolve();
                });
        })
    }

    shutDownServer(): void {
        this.server.forceShutdown();
    }
}
