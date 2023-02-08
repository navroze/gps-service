/**
 * Define App Configs
 *
 * @author Navroze Bomanji
 */

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });
const mongooseTestUrl = 'mongodb://127.0.0.1:27017/gps_test';

export const config = {
    server: {
        url: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
        port: process.env.PORT || 4040,
        appSecret: process.env.APP_SECRET || 'This is your responsibility!',
        name: process.env.APP_NAME || 'GPS_gRPC',
        year: new Date().getFullYear(),
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || 3,
        logDays: process.env.LOG_DAYS || 10,
        protoPath: process.env.PROTO_FILE || './proto/gps.proto',
        serverUrl: process.env.APP_URL || '0.0.0.0:4040'
    },
    dataBase: {
        mongo: {
            url:
                process.env.NODE_ENV === 'test'
                    ? mongooseTestUrl
                    : process.env.MONGOOSE_URL || 'mongodb://mongo:27017/gps_test'
        }
    },
    logger: {
        folder: '../logs'
    }
};
