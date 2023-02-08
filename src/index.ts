import { Server } from './server';
import { Database } from './setup/Database';
import log from './setup/Log';

async function main() {
    try {
        const server = new Server();
        server.addHandlers();
        await server.createServer();
        await Database.init();
    } catch (error) {
        log.error(`Error while booting service ${error}`);
    }
}

main();