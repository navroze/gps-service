/**
 * Define App Configs
 */

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Use a separate database for runnning integration tests in mocha.
// User development url for running the application.
function getMongooseUrl(): string {
    const url: Record<string, string> = {
        'development': process.env.MONGOOSE_URL_DEV || 'mongodb://localhost:27017/gps',
        'test': process.env.MONGOOSE_URL_TEST || 'mongodb://localhost:27017/gps_test'
    };
    const nodeEnv = process.env.NODE_ENV || 'development';
    return url[nodeEnv];
}

export const config = {
    server: {
        port: process.env.PORT || 4040,
        name: process.env.APP_NAME || 'GPS_gRPC',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '3',
        logDays: process.env.LOG_DAYS || 10,
        protoPath: process.env.PROTO_FILE || './proto/gps.proto'
    },
    expressServer: {
        port: process.env.EXPRESS_SERVER || 8080,
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
