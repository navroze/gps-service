import { expect } from 'chai';
import { Gps, IGps } from '../../models/gps';
import gpsService from '../../services/gps';
import sinon from 'sinon';

describe('gRPC service unit tests mock', () => {
    it('should save a new GPS record', async () => {
        const record: IGps = {
            latitude: '12.9279',
            longitude: '77.6271',
            email: 'test@example.com'
        };

        const saveStub = sinon.stub(Gps.prototype, 'save').resolves({ _id: '1234' });
        const id = await gpsService.createRecord(record);
        expect(id).to.equal('1234');
        saveStub.restore();
    });

    it('should throw an error if saving the record fails', async () => {
        const record: IGps = {
            latitude: '12.9279',
            longitude: '77.6271',
            email: 'test@example.com'
        };
        const saveStub = sinon.stub(Gps.prototype, 'save').throws(new Error('Error saving record'));
        try {
            await gpsService.createRecord(record);
        } catch (error: any) {
            expect(error.message).to.equal('Error saving record');
        }
        saveStub.restore();
    });

    it('should return a string id', async () => {
        const record: IGps = {
            latitude: '12.9279',
            longitude: '77.6271',
            email: 'test@example.com'
        };

        const saveStub = sinon.stub(Gps.prototype, 'save').resolves({ _id: '1234' });

        const id = await gpsService.createRecord(record);
        expect(id).to.be.a('string');

        saveStub.restore();
    });

    it('should return a different id for each record', async () => {
        const record1: IGps = {
            latitude: '12.9279',
            longitude: '77.6271',
            email: 'test1@example.com'
        };

        const record2: IGps = {
            latitude: '12.9279',
            longitude: '77.6271',
            email: 'test2@example.com'
        };

        const saveStub = sinon.stub(Gps.prototype, 'save').onCall(0).resolves({ _id: '1234' }).onCall(1).resolves({ _id: '5678' });

        const id1 = await gpsService.createRecord(record1);
        const id2 = await gpsService.createRecord(record2);
        expect(id1).to.not.equal(id2);

        saveStub.restore();
    });


});
