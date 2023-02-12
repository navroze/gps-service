import { UserModel } from './../../models/user';
import { Database } from 'setup/Database';
import { randLongitude, randLatitude } from '@ngneat/falso';

import { expect } from 'chai';
import request from 'supertest';
import app from '../../setup/ExpressServer';
import { Gps } from '../../models/gps';

let gpsRequest: any;
let token: string;

before(async () => {
    await Database.init();
    await UserModel.deleteMany({});
    const userData = {
        email: 'test@email.com',
        password: 'password'
    };
    await request(app)
        .post('/api/register')
        .send(userData);
    const data = await request(app)
        .post('/api/login')
        .send(userData);
    token = data.body.token;
});

after(() => {
    process.exit(1);
});

beforeEach(async () => {
    gpsRequest = {
        latitude: randLatitude().toString(),
        longitude: randLongitude().toString(),
        email: 'test@email.com'
    };
    await Gps.deleteMany({});
});

describe('GPS API test', () => {
    it('Test Healthcheck', (done) => {
        request(app).get('/api/healthcheck').expect(200, done);
    });

    it('Invalid route', (done) => {
        request(app).get('/api/healthcheck1').expect(404, done);
    });

    it('Should give 401 unauthorized', (done) => {
        request(app)
            .post('/api/gps-record')
            .set('Authorization', `Bearer blah`)
            .send(gpsRequest)
            .expect(401, done);
    });

    it('Should create a record in the database', (done) => {
        request(app)
            .post('/api/gps-record')
            .set('Authorization', `Bearer ${token}`)
            .send(gpsRequest)
            .expect(201, done);
    });

    it('Should create two record in the database', async () => {
        try {
            await request(app)
                .post('/api/gps-record')
                .send(gpsRequest)
                .set('Authorization', `Bearer ${token}`)
                .expect(201);
            await request(app)
                .post('/api/gps-record')
                .send(gpsRequest)
                .set('Authorization', `Bearer ${token}`)
                .expect(201);
            const records = await Gps.find();
            expect(records.length).to.equal(2);
        } catch (error) {
            console.log('error', error);
        }

    });

    it('Should give 422 for invalid null latitude', (done) => {
        gpsRequest.latitude = null;
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('invalid_type');
                done();
            });
    });

    it('Should give 422 for invalid null longitude', (done) => {
        gpsRequest.longitude = null;
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('invalid_type');
                done();
            });
    });

    it('Should give 422 for invalid null email', (done) => {
        gpsRequest.email = null;
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('invalid_type');
                done();
            });
    });

    it('Should give 422 for invalid latitude', (done) => {
        gpsRequest.latitude = '91';
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('custom');
                done();
            });
    });

    it('Should give 422 for invalid null longitude', (done) => {
        gpsRequest.longitude = '181';
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('custom');
                done();
            });
    });

    it('Should give 422 for invalid email', (done) => {
        gpsRequest.email = 'yolo';
        request(app)
            .post('/api/gps-record')
            .send(gpsRequest)
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .end((err, result) => {
                expect(result.body[0].code).to.equal('invalid_string');
                done();
            });
    });
});
