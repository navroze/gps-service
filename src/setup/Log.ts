/** Module to application logging
 * @module ApplicationLogger
 */
import { createLogger, transports, format } from 'winston';
import moment from 'moment';

var options = {
    file: {
        timestamp: function () {
            return moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        },
        colorize: true,
        name: 'server-file',
        filename: `./logs/server.log`,
        handleExceptions: false,
        humanReadableUnhandledException: true,
        maxFiles: 2,
        maxsize: 90 * 1024,
        tailable: true
    },
    console: {
        name: 'console.info',
        level: 'info',
        handleExceptions: true,
        colorize: true,
        silent: process.env.NODE_ENV === 'development' ? false : true
    }
};

const loggerObj = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ]
});

export default loggerObj;
