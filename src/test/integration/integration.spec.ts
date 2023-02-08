import { Server } from '../../server';
import { Client } from '../../client';
import { expect } from "chai";
import { GpsResponse } from "../../proto/generated/gps/GpsResponse"

let server: Server;
describe('gRPC Server Checks', () => {
    before(async () => {
        server = new Server();
        server.addHandlers();
        await server.createServer();
    });

    after(done => {
        server.shutDownServer();
        done();
    });

    it('Client establishes a connection and calls server', async () => {
        try {
            const client = new Client();
            const response = await client.sendRequest() as GpsResponse;
            expect(response.status).to.equal(true);
        } catch (error) {
            console.log("error in booting client", error);
        }
    });
});
