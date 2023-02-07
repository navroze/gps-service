/**
 * Define Database connection
 *
 * @author Navroze Bomanji
 */

import mongoose from 'mongoose';

import { config } from '../config/config';
import log from './Log';

export class Database {
    // Initialize your database pool
    public static init() {
        const dsn = config.dataBase.mongo.url;
        mongoose.set('strictQuery', true);
        mongoose.connect(dsn, (error) => {
            // handle the error case
            if (error) {
                log.error('Failed to connect to the Mongo server!!');
                throw error;
            } else {
                log.info('Connected to mongo server at: ' + dsn);
            }
        });
    }
}

export default mongoose;
