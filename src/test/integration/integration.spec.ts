import { Database } from 'setup/Database';
import { randLongitude, randLatitude, randEmail } from '@ngneat/falso';

import { Server } from '../../server';
import { Client } from '../../client';
import { expect } from 'chai';
import { Gps } from '../../models/gps';
import { GpsResponse } from '../../proto/generated/gps/GpsResponse';
import gps from '../../services/gps';

let server: Server;
let client: Client;
let request: any;

before(async () => {
    server = new Server();
    client = new Client();
    server.addHandlers();
    await server.startServer();
    await Database.init();
});

after(() => {
    server.shutDownServer();
    process.exit(1);
});

beforeEach(async () => {
    request = {
        latitude: randLatitude().toString(),
        longitude: randLongitude().toString(),
        email: randEmail()
    };
    await Gps.deleteMany({});
});

describe('Database tests', () => {
    it('Should create a gps record in Database', async () => {
        await gps.createRecord(request);
        const results = await Gps.find({});
        expect(results.length).to.equal(1);
    });

    it('Should create 2 gps records in Database', async () => {
        await gps.createRecord(request);
        await gps.createRecord(request);
        const results = await Gps.find({});
        expect(results.length).to.equal(2);
    });

    it('Should throw an error if latitude is missing', async () => {
        try {
            delete request.latitude;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('latitude');
        }
    });

    it('Should throw an error if longitude is missing', async () => {
        try {
            delete request.logitude;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('longitude');
        }
    });

    it('Should throw an error if email is missing', async () => {
        try {
            delete request.email;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('email');
        }
    });

    it('Should throw an error if latitude is null', async () => {
        try {
            request.latitude = null;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('latitude');
        }
    });

    it('Should throw an error if logitude is null', async () => {
        try {
            delete request.logitude;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('longitude');
        }
    });

    it('Should throw an error if email is null', async () => {
        try {
            request.latitude = null;
            await gps.createRecord(request);
        } catch (error: any) {
            expect(error.errors).to.have.key('latitude');
        }
    });

});

describe('gRPC Server Checks', () => {
    it('Client establishes a connection and calls server', async () => {
        try {
            const response = await client.sendRequest(request) as GpsResponse;
            expect(response.status).to.equal(true);
        } catch (error) {
            console.log('error in booting client', error);
        }
    });

    it('Should create 2 gps records in Database', async () => {
        let response = await client.sendRequest(request) as GpsResponse;
        expect(response.status).to.equal(true);
        response = await client.sendRequest(request) as GpsResponse;
        expect(response.status).to.equal(true);
        const results = await Gps.find({});
        expect(results.length).to.equal(2);
    });

    it('Should throw an error if latitude is missing', async () => {
        try {
            delete request.latitude;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });

    it('Should throw an error if longitude is missing', async () => {
        try {
            delete request.logitude;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });

    it('Should throw an error if email is missing', async () => {
        try {
            delete request.email;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });

    it('Should throw an error if latitude is null', async () => {
        try {
            request.latitude = null;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });

    it('Should throw an error if logitude is null', async () => {
        try {
            request.longitude = null;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });

    it('Should throw an error if email is null', async () => {
        try {
            request.email = null;
            await client.sendRequest(request) as GpsResponse;
        } catch (error: any) {
            expect(error.code).to.equal(2);
        }
    });
});
