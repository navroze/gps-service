/**
 * Define Database connection
 */
import mongoose from 'mongoose';

import { config } from '../config/config';
import { getErrorMessage } from '../utils/error';
import log from './Log';

export class Database {
    // Initialize your database
    public static init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dsn = config.dataBase.mongo.url;
            mongoose.set('strictQuery', true);
            mongoose.connect(dsn, (error) => {
                if (error) {
                    log.error(getErrorMessage(error));
                    return reject(error);
                } else {
                    log.info('Connected to mongo server');
                    resolve();
                }
            });
        });
    }
}

export default mongoose;
