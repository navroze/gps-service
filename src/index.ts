import { Server } from './server';
import { Database } from './setup/Database';
import { startExpressServer } from './setup/ExpressServer';
import log from './setup/Log';

async function main() {
    try {
        const server = new Server();
        server.addHandlers();
        await server.startServer();
        await Database.init();
        await startExpressServer();
    } catch (error) {
        log.error(`Error while booting gRPC service ${error}`);
    }
}

main();