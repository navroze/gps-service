import { Database } from 'setup/Database';
import { randEmail, randPassword } from '@ngneat/falso';

import { expect } from 'chai';
import request from 'supertest';
import app from '../../setup/ExpressServer';
import { UserModel } from '../../models/user';

let userRequest: any;

before(async () => {
    await Database.init();
});

after(() => {
    process.exit(1);
});

describe('User API test', () => {
    beforeEach(async () => {
        userRequest = {
            password: randPassword(),
            email: randEmail()
        };
        await UserModel.deleteMany({});
    });

    describe('Register API', () => {
        it('Should create a user in the database', (done) => {
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(201, done);
        });

        it('Should give 422 for invalid null email', (done) => {
            userRequest.email = null;
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('invalid_type');
                    done();
                });
        });

        it('Should give 422 for invalid null password', (done) => {
            userRequest.password = null;
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('invalid_type');
                    done();
                });
        });

        it('Should give 422 for invalid short password', (done) => {
            userRequest.password = '1234';
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('too_small');
                    done();
                });
        });

        it('Should give 422 for invalid email', (done) => {
            userRequest.email = '1234';
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('invalid_string');
                    done();
                });
        });

        it('Should give 500 for duplicate email entries', (done) => {
            request(app)
                .post('/api/register')
                .send(userRequest)
                .expect(201)
                .end(() => {
                    request(app)
                        .post('/api/register')
                        .send(userRequest)
                        .expect(500, done);
                });

        });
    });

    describe('Login API', () => {

        let userData: any;
        beforeEach(async () => {
            await UserModel.deleteMany({});
            userData = {
                email: 'test@email.com',
                password: 'password'
            };
            await request(app)
                .post('/api/register')
                .send(userData)
                .expect(201);
        });

        it('Should login a user', (done) => {
            request(app)
                .post('/api/login')
                .send(userData)
                .expect(200, done);
        });

        it('Should give 404 for invalid email', (done) => {
            userData.email = 'balh@gmail.com';
            request(app)
                .post('/api/login')
                .send(userData)
                .expect(404, done);
        });

        it('Should give 403 for invalid password', (done) => {
            userData.password = 'balh123';
            request(app)
                .post('/api/login')
                .send(userData)
                .expect(403, done);
        });

        it('Should give 422 for invalid short password', (done) => {
            userData.password = '1234';
            request(app)
                .post('/api/login')
                .send(userData)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('too_small');
                    done();
                });
        });

        it('Should give 422 for invalid email', (done) => {
            userData.email = '1234';
            request(app)
                .post('/api/login')
                .send(userData)
                .expect(422)
                .end((err, result) => {
                    expect(result.body[0].code).to.equal('invalid_string');
                    done();
                });
        });
    });
});
