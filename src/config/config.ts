/**
 * Define App Configs
 */

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

function getMongooseUrl(): string {
    const url: Record<string, string> = {
        "development": process.env.MONGOOSE_URL_DEV || 'mongodb://mongo:27017/gps',
        "test": process.env.MONGOOSE_URL_TEST || 'mongodb://mongo:27017/gps_test'
    };
    const nodeEnv = process.env.NODE_ENV || 'development';
    return url[nodeEnv];
}

function getExpressPort(): string {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const url: Record<string, string> = {
        "development": process.env.EXPRESS_SERVER_DEV || "8080",
        "test": process.env.EXPRESS_SERVER_TEST || "8081"
    };
    return url[nodeEnv];
}

function getGrpcPort(): string {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const url: Record<string, string> = {
        "development": process.env.GRPC_PORT_DEV || "4040",
        "test": process.env.GRPC_PORT_TEST || "4041"
    };
    return url[nodeEnv];
}

export const config = {
    server: {
        port: getGrpcPort() || 4040,
        name: process.env.APP_NAME || 'GPS_gRPC',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || 3,
        logDays: process.env.LOG_DAYS || 10,
        protoPath: process.env.PROTO_FILE || './proto/gps.proto',
    },
    expressServer: {
        port: getExpressPort() || "8080",
        jwtSecret: process.env.JWT_SECRET || 'This is sparta'
    },
    dataBase: {
        mongo: {
            url: getMongooseUrl()
        }
    },
    logger: {
        folder: '../logs'
    }
};

console.log("exress config", config.expressServer);
console.log("grpc config", config.server);
console.log("dataBase config", config.dataBase);
